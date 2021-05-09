const express = require("express");
const router = express.Router();
const clientsControllerAPI = require("../controllers/clientControllerAPI");

//API


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


// 

router.get("/all_reparations", (req, res) => {
  clientsControllerAPI.getReparations(req, res);
});

// 
router.get("/:Nom-:id/reparations", (req, res) => {
  clientsControllerAPI.getReparation(req, res);
});

/***** ReparCat *****/

// 
router.get("/repar_categories", (req, res) => {
  clientsControllerAPI.getReparCats(req, res);
});


router.get("/:Nom-:id/repar-categorie", (req, res) => {
  clientsControllerAPI.getReparCat(req, res);
});

router.delete("/:Nom-:id-:cat/delete", (req, res) => {
  clientsControllerAPI.deleteOneReparCat(req, res);
});

module.exports = router;
