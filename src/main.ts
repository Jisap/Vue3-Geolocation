import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// npm install--save mapbox - gl
import mapboxgl from 'mapbox-gl'; // npm i --save-dev @types/mapbox-gl

mapboxgl.accessToken = 'pk.eyJ1IjoiamlzYXAiLCJhIjoiY2tpc3c1b21iMHBzZTJzbjQ4dmYxbzdiaCJ9.dPEe7WROBsrgoW6VAe2ZAQ';

if( !navigator.geolocation ){
    alert('Tu navegador no soporta el Geolocation')
    throw new Error(' Tu navegador no sporta el Geolocation')
}

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
