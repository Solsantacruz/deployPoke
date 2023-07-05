import axios from "axios";
export const GET_POKEMON = "GET_POKEMON";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const SORT_BY_CREATED = "SORT_BY_CREATED";
export const SORT_ORDER = "SORT_ORDER";
export const GET_TYPES = "GET_TYPES";
export const GET_DETAIL = "GET_DETAIL";
export const SEARCH_NAME = "SEARCH_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKE = "DELETE_POKE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";


export const deletePokemons = (id) =>{
    const endpoint = `http://localhost:3001/pokemons/delete/`;
   return async (dispatch) => {
    // try {
    //   const response = (await axios.delete(endpoint)).data;
    //      return dispatch({
    //         type: DELETE_POKE,
    //         payload: response,
    //   });
    // } catch (error) {
    //   alert('Error al eliminar el pokemon, vuelva a intentarlo')
    // }
    try {
        return fetch(`${endpoint}${id}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((json) => {
            dispatch({
              type: DELETE_POKE,
              payload: json.id,
            });
          })
          .catch((error) => console.log(error));
      } catch (error) {
        alert('Ocurrio algo inesperado. Vuelva a intentarlo')
      }
      
      };
   };


export function getAllPokemon() {
        return async function(dispatch){
            try {
            const response = await axios.get("http://localhost:3001/pokemons")
            return dispatch({
                type: GET_POKEMON,
                payload: response.data
            })
    } catch (error) {
        alert('Hubo un error, recargue la pagina')
    }
}}

export function filterByAttack(payload){
    return {
      type: FILTER_BY_ATTACK,
      payload
    }
}

export function filterByTypes(payload) {
    // console.log(payload)
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

export function sortByCreated(payload) {
    return {
        type: SORT_BY_CREATED,
        payload
    }
}

export function sortByOrderName (payload) {
    return {
        type: SORT_ORDER,
        payload,
    }
}

export function getSearchName (name) {
    return async function (dispatch){
        try{
        let response = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        const pokemon = response.data;
        return dispatch({
            type: SEARCH_NAME,
            payload: pokemon
        })
        } catch (error) {
            // console.log(error);
        alert(`Pokemon name not found`)
        }
}}

export function getById (id){
    // console.log(id)
    return async function (dispatch) {
        try{
        let response = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: response.data
        })

        }catch (error) {
          alert('Ocurrio algo inesperado')
        }
    }
}

export function createPokemon (payload) {
    return async function (dispatch) {
            let response = await axios.post("http://localhost:3001/pokemons", payload)
            return dispatch({
                type: CREATE_POKEMON,
                payload: response
            })
}}

export function getTypes () {
    return async function (dispatch) {
        try {
        let response = await axios.get("http://localhost:3001/types", {

        })
        return dispatch({
            type: GET_TYPES,
            payload: response.data
        })
        } catch (error) {
            alert('Ocurrio algo inesperado')
        }
}}

export function clearDetail(){
            return {
                type: CLEAR_DETAIL,
            }    
}