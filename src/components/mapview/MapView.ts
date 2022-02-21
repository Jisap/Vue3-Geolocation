
import Mapboxgl from 'mapbox-gl'
import { useMapStore, usePlacesStore } from '@/composables'
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
    name: 'MapView',
    setup(){

        const mapElement = ref<HTMLDivElement>();
        const { userLocation, isUserlocationReady } = usePlacesStore();
        const { setMap } = useMapStore();

        const initMap = async() => {

            if(!mapElement.value) throw new Error('Div element no exits');
            if(!userLocation.value) throw new Error('User location no exist')

            await Promise.resolve();

            const map = new Mapboxgl.Map({                                    // Instancia del map de Mapbox
                container: mapElement.value,                                  // referenciada al ref() container mapElement
                style: 'mapbox://styles/mapbox/streets-v11', 
                center: [-74.5, 40], 
                zoom: 15 
            });

            const myLocationPopup = new Mapboxgl.Popup({ offset: [0,-25]})    // Instancia de popup de Mapbox
                .setLngLat( userLocation.value )
                .setHTML(`
                    <h4>Aquí estoy</h4>
                    <p>Actualmente en Málaga</p>
                    <p>${ userLocation.value }</p>
                    `)

            const myLocationMarker = new Mapboxgl.Marker()    // Instancia marcador de Mapbox
                .setLngLat( userLocation.value )              // Le damos valor  
                .setPopup( myLocationPopup )
                .addTo( map )                                 // Lo añadimos al mapa

            
            setMap(map);                                     //Establecer el mapa en Vuex. - Mutation porque es un proceso síncrono
        }

        onMounted(() => {                                    // Cuando se monte el componente
           if( isUserlocationReady.value ) return initMap()  // verificaremos que isUserlocationReady tenga un valor => cargamos el mapa  

        })

        watch( isUserlocationReady, ( newVal ) => {    // Si isUserlocationReady cambia de valor (regarga de la página)
            if( isUserlocationReady.value)             // solo cargaremos el mapa si isUserlocation tiene de verdad ese valor   
                return initMap();
        })

        return{
            isUserlocationReady,
            mapElement
        }
    }
})