

import { useMapStore, usePlacesStore } from '@/composables';
import { Feature } from '@/interfaces/places';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'SearchResults',
    setup(){

        const { isLoadingPlaces, places, userLocation } = usePlacesStore()
        const { map, setPlaceMarkers, getRoutesBetweenPoints } = useMapStore()
        const activePlace = ref('')

        watch( places,(newPlaces) => {    // Si los places cambian obtendremos con el watch los newPlaces
            activePlace.value = '';
            setPlaceMarkers( newPlaces ); // llamaremos a la mutation que borra los marcadores y crea otros nuevos.  
        } )

        return {
            isLoadingPlaces,
            places,
            activePlace,
            onPlaceClicked: ( place: Feature ) => {    // Cuando hacemos click en la caja de alguno de los rdos
                 
                activePlace.value = place.id           // le damos valor a activePlace = place.id
                
                const [ lng, lat ] = place.center;     // Obtenemos las coordenadas del lugar clickado

                map.value?.flyTo({                     // Volamos a esa localización
                    center: [ lng, lat ],
                    zoom:14
                })
            },

            getRouteDirections: (place:Feature) => {    // Cuando hacemos click en el boton de direcciones

                if (!userLocation.value) return

                const [lng, lat] = place.center;     // Obtenemos las coordenadas del lugar clickado

                const [startLng, startLat] = userLocation.value;       // Construimos la coordenadas para las rutas polyline
                const start: [number, number] = [startLng, startLat]   // Las de inicio serán las de usuario 
                const end: [number, number] = [lng, lat]               // Las del final la de donde se haga click en los rdos de busqueda 

                getRoutesBetweenPoints(start, end)    // LLamamos a la action y obtenemos la polyline de rutas
            }
        }
    }
})