import { computed, defineComponent, ref } from 'vue';
import SearchResults from '../../components/search-results/SearchResults.vue';
import { usePlacesStore } from '@/composables';


export default defineComponent({
    name: 'SearchBar',
    components: { SearchResults },
    setup(){

        const debounceTimeout = ref();                    // Valor retrasado en el tiempo
        const debouncedValue = ref('');                   // Valor despues de dejar de escribir 
        const { searchPlacesByTerm } = usePlacesStore()

        return{ 
            debouncedValue,
            searchTerm: computed({ // searchTerm es v-model en el html y con el getter...
                
                get(){
                    return debouncedValue.value;    // retorna el valor del input de la caja de busqueda con debouncedValue.value
                },
                set(val:string){                    // Establece el nuevo valor del input de la caja de busqueda
                    
                    if( debounceTimeout.value ) clearTimeout( debounceTimeout.value ); // Si existe un valor retrasado limpia el anterior

                    debounceTimeout.value = setTimeout(() => {    // El valor retrasado en el tiempo = valor del input pasadas 2 secs
                        debouncedValue.value = val;                
                        searchPlacesByTerm(val)                   // Obtenido el valor del input tras 2 secs hacemos la busqueda   
                    },2000)                                       // y obtenemos los places

                } //Solo se establecerá un valor de busqueda si se deja de escribir y pasan 2 secs
            })
        }
    }
})