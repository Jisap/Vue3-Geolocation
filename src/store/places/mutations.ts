
import { Feature } from '@/interfaces/places';
import { MutationTree } from 'vuex';
import { PlacesState } from './state';


const mutation: MutationTree<PlacesState> = {    // Esta mutation recibe el state y las coords{} obtenidas con la action
                                   //coords      // y aplica el valor de las coords a userLocation del state
    setLngLat( state: PlacesState, {lng, lat}:{ lng:number, lat: number } ) {  
        state.userLocation = [ lng, lat]               
        console.log(lng, lat)
    },

    setIsLoadingPlaces( state ){                // Cuando se llame a esta mutation pondremos 
        state.isLoadingPlaces = true            // el isLoadingPlaces en true
    },

    setPlaces( state, places: Feature[] ){
        state.places = places                    // Recibiremos un places y cambiará el valor
        state.isLoadingPlaces = false            // del state tanto de places como de isLoadindPlaces
    }
}


export default mutation;