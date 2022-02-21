
import { GetterTree } from 'vuex';
import { PlacesState } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<PlacesState, StateInterface> = {
   
    isUserlocationReady( state ) {
        return !!state.userLocation;    // Ponemos el !! para convertir un undefined en false ( boolean )
    }
}



export default getters;