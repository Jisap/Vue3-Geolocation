import { Feature } from "@/interfaces/places";
import { LngLat } from "@/store/map/actions";
import { computed } from "vue";
import { useStore } from "vuex"
import { StateInterface } from '../store/index';


export const useMapStore = () => {

    const store = useStore<StateInterface>()


    return { 
    
        map: computed(() => store.state.map.map ),
        distance: computed(()=> store.state.map.distance),
        duration: computed(()=> store.state.map.duration),

        //Getters
        isMapReady: computed<boolean>(() => store.getters['map/isMapReady']),

        // Mutations 
        setMap: ( map: mapboxgl.Map ) => store.commit('map/setMap', map),
        setPlaceMarkers: ( places: Feature[]) => store.commit('map/setPlaceMarkers', places),

        // Actions
        getRoutesBetweenPoints: ( start: LngLat, end: LngLat ) => store.dispatch('map/getRoutesBetweenPoints', { start, end })
    }



}