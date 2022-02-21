import { StateInterface } from "@/store/index"
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

export const usePlacesStore = () => {

    const store = useStore<StateInterface>()

    onMounted(() => {                                         // Al montar la app...
        if (!store.getters['places/isUserlocationReady']){    // sino existe la geolocation del usuario
            store.dispatch('places/getInitialLocation')       // disparamos la acción para obtenerla -> state
        }
    })


    return{ 
        // State
        isLoading: computed( () => store.state.places.isLoading ),
        userLocation: computed( () => store.state.places.userLocation ),
        places: computed(() => store.state.places.places),
        isLoadingPlaces: computed( () => store.state.places.isLoadingPlaces ),
        // Getters
        isUserlocationReady: computed<boolean>( () => store.getters['places/isUserlocationReady']),
        // actions
        searchPlacesByTerm: ( query: string ) => store.dispatch('places/searchPlacesByTerm', query )
        // mutations
    }
}