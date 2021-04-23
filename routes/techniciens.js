const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const techController = require("../controllers/technicienController");

router.get("/", (req, res) => {
  res.render("techniciens/technicien-validation");
});

router.post("/", (req, res) => {
  const data = req.body;
  techController.findTechnicien(data, res);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  techController.getTechnicien(id, res);
});

router.get("/:id/modifications", (req, res) => {
  const id = req.params.id;
  techController.getTechReparation(id, res);
});

router.post("/:id/modifications", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  techController.updateTechReparation(id, data, res);
});

router.get("/:id/mes_reparations", (req, res) => {
  const id = req.params.id;
  techController.statusTechReparation(id, res);
});

module.exports = router;
