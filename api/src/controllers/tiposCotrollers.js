const axios = require("axios");
const { Type } = require("../db.js");

 
const getType = async () => {
    // SI ESTAN LOS DATOS EN LA BASE DE DATOS
    const existingTypes = await Type.findAll();

    if (existingTypes.length > 0) {
      return existingTypes;
    }

// SI NO ESTAN LOS TYPOS EN LA BASE DE DATOS HACE LA PETICION A LA API Y LOS GUARDA.
    const response = await axios.get("https://pokeapi.co/api/v2/type"); //Trae todos los tipos
    const typesApi = response.data.results;
 
    for (const type of typesApi) {
        const typeName = type.name;
        // console.log(typeName);
  
        // Crea un nuevo registro en la base de datos
        await Type.findOrCreate(
            {where:{ name: typeName }});
      }

    
}

module.exports = getType;