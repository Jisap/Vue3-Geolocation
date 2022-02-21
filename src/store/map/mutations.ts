
import { Feature } from '@/interfaces/places';
import mapboxgl from 'mapbox-gl';
import { MutationTree } from 'vuex';
import { MapState } from './state';


const mutation: MutationTree<MapState> = {
    
    setMap( state, map: mapboxgl.Map) {        // El estado del mapa será el que venga por arg
        state.map = map;
    },

    setDistanceDuration( state, { distance, duration}: {distance: number, duration: number}){
        let kms= distance / 1000;        //3742/1000=3,742
        kms = Math.round( kms * 100);    //round(3.742*100)=round(374,2)=374
        kms /= 100; //(kms/100)          // 374/100=3,74
        
        state.distance = kms; 
        state.duration = Math.floor(duration/60)
    },

    setPlaceMarkers( state, places: Feature[]){

        state.markers.forEach( marker => marker.remove()) // Borramos los marcadores anteriores existentes.
        state.markers = [];                               // Dejamos el estate de los marcadores vacio
        
        if( !state.map ) return;

        for ( const place of places){
            const [ lng, lat ] = place.center;            // Obtenemos la coords de cada place 
            
            const popup = new mapboxgl.Popup()            // Construimos el popup
                .setLngLat([ lng, lat ])
                .setHTML(`
                <h4>${ place.text }</h4>
                <p>${ place.place_name}</p>
                `)

            const marker = new mapboxgl.Marker()           // Construimos el marcador
                .setLngLat([ lng, lat])
                .setPopup( popup )
                .addTo( state.map )

            state.markers.push( marker )                    // Modificamos el state
        }

        //Clear de polyline
        if( state.map.getLayer('RouteString')){             // Si existe una capa de polyline anterior   
            state.map.removeLayer('RouteString');           // la borramos cuando se llame a esta      
            state.map.removeSource('RouteString');          // mutación que pone nuevos marcadores
            state.distance = undefined;
            state.duration = undefined;
        }            
    },

    setRoutePolyline(state, coords: number[][]){    // La respuesta de la api nos devuelve un [[]]

        const start = coords[0];                    // Obtenemos la coord de inicio de la ruta
        const end = coords[ coords.length-1 ];      // y la de finalización

        const bounds = new mapboxgl.LngLatBounds(   // Definimos los bounds que es un objeto representa un cuadro 
            [start[0], start[1]],                   // delimitador geográfico, definido por sus puntos suroeste y 
            [end[0], end[1]],                       // noreste en longitud y latitud.  
        );

        for( const coord of coords){                
            const newCoord: [ number, number ] = [coord[0], coord[1]];    // Agregamos cada punto al bounds
            bounds.extend(newCoord)
        }

        state.map?.fitBounds( bounds, {    // Ajustamos el map a cuadro delimitador (bounds)
            padding: 300
        } )

        const sourceData: mapboxgl.AnySourceData = {    // Definimos la polyline (instancia)
            type: 'geojson',
            data:{
                type: 'FeatureCollection',
                features:[
                    {
                        type: 'Feature',
                        properties: {},
                        geometry:{
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        };

        if(state.map?.getLayer('RouteString')){    // Borramos rutas anteriormente trazadas
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString')
        }

        state.map?.addSource('RouteString',sourceData)    // Añadimos al mapa la instancia de la polyline

        state.map?.addLayer({                             // Pintamos la polyline en el mapa
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout:{
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint:{
                'line-color': 'black',
                'line-width': 3
            }
        })
    }
}


export default mutation;