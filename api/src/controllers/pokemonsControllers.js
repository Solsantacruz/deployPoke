const axios = require('axios');
const {Pokemon, Type} = require('../db');

// Creo un metodo se encarga de mapear y traer las propiedades de la api, 
//de esta forma queda mas limpio y se puede reutilizar.
const clearArray = (arr) => 
  arr.map((result) => {
     return {
    id: result.id,
    name: result.name,
    image: result.sprites.other.dream_world.front_default,
    life: result.stats.find((stat) => stat.stat.name === "hp").base_stat,
    attack: result.stats.find((stat) => stat.stat.name === "attack").base_stat,
    defense: result.stats.find((stat) => stat.stat.name === "defense").base_stat,
    speed: result.stats.find((stat) => stat.stat.name === "speed").base_stat,
    height: result.height,
    weight: result.weight,
    types: result.types.map((t) => t.type.name),
  }
  });

  const pokeDbFinal = (arr) =>
     arr.map((result)=> {
      return {
        id: result.id,
        name: result.name,
        image: result.image,
        life: result.life,
        attack: result.attack,
        defense: result.defense,
        speed: result.speed,
        height: result.height,
        weight: result.weight,
        types: result.types.map((p)=> p.name)
      }
     })

//Busqueda de todos los personajes de la api y la BDD 
const getAllPokemon = async () => {
    //Datos de las base de datos
    //incluye el modelo tipos de la bdd
  const pokemonsDb = await Pokemon.findAll({
    include:{
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })

  const dbFinal = pokeDbFinal(pokemonsDb)
  
  // datos de la api
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=120&offset=0");
  const pokemons = response.data.results;

  const pokemonDetails = await Promise.all(
    pokemons.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url);
      return detailResponse.data;
    })
  );

  const arrayPoke = clearArray(pokemonDetails); // implemento la funcion que cree arriba y la utilizo como metodo a la cual 
  // console.log(arrayPoke);
  // le paso el resultado de las promesas resueltas con los datos de los pokemones de la api
  
  return [...dbFinal, ...arrayPoke]; // unifica y devuelve los datos que vienen de la api y de las db (reemplaza al concat)

  }


  // Busueda por nombre a la api y al BDD 
  const searchPokemon = async (name) => {
    //Datos de las base de datos
  const pokemonsDb = await Pokemon.findAll({where:
     {name:name},
      include:{
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        }
  }
})

const dbFinal = pokeDbFinal(pokemonsDb)

  // datos de la api ?limit=90
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=120&offset=0");
  const pokemons = response.data.results;

  const pokemonDetails = await Promise.all(
    pokemons.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url);
      return detailResponse.data;
    })
  );
  const arrayPoke = clearArray(pokemonDetails);
  
  
 //filtra los personajes que incluya el name y los convierte en minusculas
  const filterApi = arrayPoke.filter((poke) => poke.name.toLowerCase().includes(name.toLowerCase())); 
 

  return [...dbFinal, ...filterApi]; // unifica y devuelve los datos que vienen de la api y de las db (reemplaza al concat)

  }

// NUEVOS POKEMONES 
  const createPokemon = async (name, image, life, attack, defense, speed, height, weight, type , creadoEnDB) => {

    const newPokemon = await Pokemon.create({name, image, life, attack, defense, speed, height, weight, creadoEnDB});

    let typeDb = await Type.findAll({
      where: {name: type}
    })

    newPokemon.addType(typeDb);

}
    

module.exports = {getAllPokemon, searchPokemon, createPokemon} ;
