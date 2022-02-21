
import { GetterTree } from 'vuex';
import { MapState } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<MapState, StateInterface> = {
    isMapReady( state ) {
        return !!state.map; // Si el map tiene un valor devolvemos true
    }
}



export default getters;