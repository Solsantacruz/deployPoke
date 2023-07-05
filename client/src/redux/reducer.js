import { GET_POKEMON, FILTER_BY_ATTACK, FILTER_BY_TYPES, SORT_BY_CREATED, SORT_ORDER, SEARCH_NAME, CREATE_POKEMON, GET_TYPES, GET_DETAIL, CLEAR_DETAIL, DELETE_POKE } from "./actions";



const initialState = {
  allPokemons : [],
  copyPokemons : [],
  loading: false,
  detail: [],
  types: [],
  filterTipos : [],
}


const rootReducer = (state = initialState , action) => {
  switch(action.type){
    case GET_POKEMON: 
    return{
        ...state, 
        allPokemons: action.payload,
        copyPokemons: action.payload,
        filterTipos : action.payload,
        loading: true,

    
    }

    case DELETE_POKE:
      const toDelete = state.allPokemons;
      const pokeUpdates = toDelete.filter((poke) => poke.id !== action.payload);
      return {
        ...state,
        allPokemons: pokeUpdates,
        copyPokemons: pokeUpdates,
      };



    case GET_TYPES:
        return{
            ...state,
        types: action.payload
        };

    case GET_DETAIL:
        return{
            ...state,
            detail: action.payload
        }

    case SEARCH_NAME:
        return{
            ...state,
            allPokemons: action.payload,
        }

    case CREATE_POKEMON:
        return{
            ...state
        }

    case FILTER_BY_ATTACK:
        let attackFilter = [...state.allPokemons];
        attackFilter = attackFilter.sort((a, b) => {
          if (a.attack < b.attack) {
            return action.payload === "Mayor fuerza" ? 1 : -1;
          }
          if (a.attack > b.attack) {
            return action.payload === "Mayor fuerza" ? -1 : 1;
          }
          return 0;
        });
        return {
          ...state,
          allPokemons:
            action.payload === "Fuerza" ? state.copyPokemons : attackFilter,
        }
        case FILTER_BY_TYPES:
        const allType = [...state.filterTipos];
        const typesFilter = action.payload === 'tipo' ? allType : allType.filter(te => te.types?.includes(action.payload))
        return{
            ...state, 
            allPokemons: typesFilter,
            // copyPokemons: typesFilter,
        }

    case SORT_BY_CREATED:
        const pokes = [...state.copyPokemons]
        const createdFilter = action.payload === "Creados"
        ? pokes.filter((e) => typeof e.id === "string") // Filtrar por ID de tipo string (UUID)
        : pokes.filter((e) => typeof e.id === "number"); // Filtrar por ID de tipo number 
      return {
        ...state,
        allPokemons: action.payload === "Todos" ? state.copyPokemons : createdFilter,
        filterTipos: action.payload === "Todos" ? state.copyPokemons : createdFilter,
        
      } 

    case SORT_ORDER:
        let orderedCharacters = [...state.allPokemons];
        orderedCharacters = orderedCharacters.sort((a, b) => {
          if (a.name < b.name) {
            return action.payload === "asc" ? -1 : 1;
          }
          if (a.name > b.name) {
            return action.payload === "asc" ? 1 : -1;
          }
          return 0; 
        });
  
        return {
          ...state,
          allPokemons:
            action.payload === "filtro" ? state.copyPokemons : orderedCharacters
        };
        
    case CLEAR_DETAIL:
            return {
                ...state,
                detail: []
            }
 
  default:
    return state;
}}

export default rootReducer;