const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      //console.log("details: ", responseFromAPI.data);
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/:id/edit", async (req, res) => {
  try {
    const currentCharacter = await axios.get(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`
    );
    res.render("characters/edit-character", {
      character: currentCharacter.data,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/characters/:id/edit", async (req, res) => {
  console.log(req.params.id);
  try {
    await axios.patch(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      {
        name: req.body.name,
        occupation: req.body.occupation,
        weapon: req.body.weapon,
        debt: req.body.debt,
      }
    );
    res.redirect(`/characters/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});

router.post("/characters/:id/delete", async (req, res) => {
  try {
    await axios.delete(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`
    );
    res.redirect("/characters");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
