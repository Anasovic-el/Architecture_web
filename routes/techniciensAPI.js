const express = require("express");
const router = express.Router();
const techControllerAPI = require("../controllers/technicienControllerAPI");

// faire attention a cette fonction
router.get("/all_reparations", (req, res) => {
  techControllerAPI.getAllReparations(req, res);
});

// faire attention a cette fonction
router.get("/", (req, res) => {
  techControllerAPI.getTechniciens(req, res);
});

router.get("/:id", (req, res) => {
  techControllerAPI.getTechnicien(req, res);
});

router.get("/:id/reparations", (req, res) => {
  techControllerAPI.getTechReparations(req, res);
});

router.put("/:id/reparations", (req, res) => {
  techControllerAPI.updateReparation(req, res);
});

router.get("/:id/reparations_status", (req, res) => {
  techControllerAPI.reparationStatus(req, res);
});

module.exports = router;
