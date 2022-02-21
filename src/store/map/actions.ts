import { ActionTree } from 'vuex';
import { MapState } from './state';
import { StateInterface } from '../index';
import { directionsApi } from '@/apis';
import { DirectionsResponse } from '../../interfaces/directions';

export type LngLat = [ number, number ]; // Definimos un tipo cuando no es un objeto.


const actions: ActionTree<MapState, StateInterface> = {
    
    async getRoutesBetweenPoints( { commit }, { start, end }: { start: LngLat, end: LngLat }  ) {        // Recibimos las coordenadas
        
        const resp = await directionsApi.get<DirectionsResponse>(`${start.join(',')}; ${end.join(',')}`) // Hacemos la petición
        console.log(resp.data.routes[0].geometry.coordinates)                                            // Obtenemos la respuesta

        commit('setDistanceDuration',{
            distance: resp.data.routes[0].distance,                                                      // Establecemos la distance
            duration: resp.data.routes[0].duration                                                       // y la duration. 
        })

        commit('setRoutePolyline', resp.data.routes[0].geometry.coordinates)                             // Hacemos al mutation para 
    }                                                                                                    // establecer la polyline en el mapa
}



export default actions;