const axios = require("axios");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/create", (req, res) => {
  res.render("characters/create-character");
});

router.post("/create", async (req, res) => {
  await axios.post("https://ih-crud-api.herokuapp.com/characters", {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
    debt: req.body.debt,
  });
  res.redirect("/characters");
});
module.exports = router;
