<template>
  <button 
    v-if="isBtnReady"
    class="btn btn-primary"
    @click="onMyLocationClicked"
  >
      Ir a mi ubicación 
  </button>
</template>

<script lang="ts">

    import Vue, { computed, defineComponent } from 'vue'
    import { usePlacesStore } from '../../composables/usePlacesStore'
    import { useMapStore } from '../../composables/useMapStore';

    export default defineComponent({
        name: 'MyLocationBtn',
        setup(){

            const { userLocation, isUserlocationReady } = usePlacesStore();
            const { map, isMapReady } = useMapStore();

            return{

                isBtnReady: computed<boolean>(()=> isUserlocationReady.value && isMapReady.value),  // Si tenemos coordenadas y mapa cargado
                                                                                                    // isBtnReady dara true -> rederiza el btn
                onMyLocationClicked: () => {

                    map.value?.flyTo({
                        center: userLocation.value,
                        zoom: 14
                    })

                }
            }
        }
    })
</script>

<style scoped>
    button{
        position: fixed;
        top: 30px;
        right: 40px;
    }
</style>