const getType = require('../controllers/tiposCotrollers')
const { Router } = require("express");


const router = Router();

router.get("/", async (req, res) => {
  try {
    const typos = await getType();
    res.status(200).json(typos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;