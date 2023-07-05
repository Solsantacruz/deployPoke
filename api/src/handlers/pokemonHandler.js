const { Router } = require('express');
const {getAllPokemon, searchPokemon, createPokemon} = require('../controllers/pokemonsControllers')
const {Pokemon} = require('../db.js')


const router = Router();


router.get('/', async (req, res) => {
    const { name } = req.query;
    try { // busca el poke por nombre y sino devuelve todos los pokemones (de la api)
        const resultado =  name ? await searchPokemon(name) : await getAllPokemon();
        resultado.length ?
        res.status(200).json(resultado) : res.status(404).json({error: error.message})
      } catch(error) {
        res.status(500).json({ message: error.message });
      }
    });

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const pokeAll = await getAllPokemon();
    if (id) {  //Si me pasan un ID, filtro el que coincida con ese mismo, sino devuelvo texto.
      let pokemonId = pokeAll.filter((el) => el.id == id); 
      pokemonId.length
        ? res.status(200).json(pokemonId)
        : res.status(404).send("No se encontró el pokemon")
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const {name, image, life, attack, defense, speed, height, weight, type , creadoEnDB } = req.body;
  
  try {
    const newPoke = await createPokemon(name, image, life, attack, defense, speed, height, weight, type, creadoEnDB);
    res.status(201).json(newPoke);
  } catch (error) {
    res.status(404).send("Error al cargar al nuevo pokemon")
  }
})


// para eliminar de db
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
   await Pokemon.destroy({ where: { id: id,}, });
   const deletePoke = await Pokemon.findAll();
    res.status(200).json(deletePoke);
  } catch (error) {
    console.log('error');
    res.status(400).send({ error: 'Delete Fail' });
  }
});
module.exports = router;