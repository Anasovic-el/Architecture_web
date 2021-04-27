const express = require("express");
const router = express.Router();
const clientsControllerAPI = require("../controllers/clientControllerAPI");

/************* API ****************/

/***** Clients *****/

router.get("/", (req, res) => {// = /api/clients -->"/"
  clientsControllerAPI.getClients(req, res);
});

router.get("/:Nom-:id", (req, res) => {
  clientsControllerAPI.getClient(req, res);
});

router.post("/", (req, res) => {
  clientsControllerAPI.addClient(req, res);
});

router.put("/:Nom-:id", (req, res) => {// modifer le 
  clientsControllerAPI.updateClient(req, res);
});

/***** Reparations *****/

// get Reparations

router.get("/all_reparations", (req, res) => {
  clientsControllerAPI.getReparations(req, res);
});

// get reparation based on id and Nom
router.get("/:Nom-:id/reparations", (req, res) => {
  clientsControllerAPI.getReparation(req, res);
});

/***** ReparCat *****/

// get repar_categories
router.get("/repar_categories", (req, res) => {
  clientsControllerAPI.getReparCats(req, res);
});

//get repar_categories based on id and Nom
router.get("/:Nom-:id/repar-categorie", (req, res) => {
  clientsControllerAPI.getReparCat(req, res);
});

module.exports = router;
