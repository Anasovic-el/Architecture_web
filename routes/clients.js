let express = require("express");
let router = express.Router();
let clients = require("../models/clientModal");
let clientsController = require("../controllers/clientController");

// 
router.get("/nouveau-client", (req, res) => {
  res.render("clients/nouveau-client");
});

// 
router.post("/nouveau-client", (req, res) => {
  let clientData = req.body;
  clientsController.addClient(clientData);
  res.redirect("/clients");
});

//
router.get("/client_validation", (req, res) => {
  res.render("clients/client-validation");
});

//
router.post("/client_validation", (req, res) => {
  const checkingData = req.body;
  clientsController.findClient(checkingData, res);
});

//
router.get("/:Nom-:id", (req, res, next) => {
  const { id, Nom } = req.params;
  clientsController.getClient(id, Nom, res);
});

//
router.get("/:Nom-:id/mes_reparations", (req, res) => {
  const { id, Nom } = req.params;
  clientsController.getClientReparations(id, Nom, res);
});

//
router.get("/:Nom-:id/formule", (req, res) => {
  const { id, Nom } = req.params;
  clientsController.getClientFormule(id, Nom, res);
});

//
router.post("/:Nom-:id/formule", (req, res) => {
  const { id, Nom } = req.params;
  const clientData = req.body;
  clientsController.updateClient(id, Nom, clientData);
  res.redirect(`/clients/${Nom}-${id}/mes_reparations`);//Guillemet pour les variables
});

//
router.get("/", (req, res) => {
  res.render("clients/client");
});

module.exports = router;
