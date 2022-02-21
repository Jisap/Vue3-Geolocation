<template>
  <div>
    <MapView />
    <SearchBar />
    <MyLocationBtn />
    <TripDetails />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePlacesStore } from '../composables/usePlacesStore'
import MapView from '../components/mapview/MapView.vue';
import MyLocationBtn from '../components/my-location-btn/my-location-btn.vue';
import SearchBar from '../components/searchbar/SearchBar.vue'
import TripDetails from '../components/trip-details/trip-detail.vue'

export default defineComponent({
  name: 'Home',
  components: { MapView, MyLocationBtn, SearchBar,TripDetails },
  setup(){
    
    usePlacesStore()
  }
});
</script>
