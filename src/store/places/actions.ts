import { ActionTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';
import { Feature, PlacesResponse } from '@/interfaces/places';

//import { searchApi } from '../../apis/index';


const actions: ActionTree<PlacesState, StateInterface> = {

    getInitialLocation( { commit }) {
                                                        // navigator nos permite obtener las coordenadas
        navigator.geolocation.getCurrentPosition(       // Esas coords se envían a la mutation 'setLngLat'        
            ({ coords }) => commit('setLngLat', { lng: coords.longitude, lat: coords.latitude }),   
            ( err ) => { 
                console.log(err)
                throw new Error('No geolocation :(')
            }
        )
    },

    async searchPlacesByTerm({ commit, state }, query: string): Promise<Feature[]>{

        if( query.length === 0){
            commit('setPlaces', []);
            return [];
        }

        if( !state.userLocation ){
            throw new Error('No hay ubicación del usuario');
        }

        commit('setIsLoadingPlaces')

        const resp = await searchApi.get<PlacesResponse>(`/${ query }.json`, { 
            params: {
                proximity: state.userLocation?.join(',') // Las coords están en el state como un []. Con join 
            }                                            // convertimos a un string separadas por una coma
        })
    
        commit('setPlaces', resp.data.features );       // Obtenidas las ubicaciones coincidentes con el term se modifica el state

        return resp.data.features;
    }
}



export default actions;