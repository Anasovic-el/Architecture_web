const technicienModalAPI = require("../models/technicienModelAPI");

module.exports = {
  getTechniciens: (req, res) => {
    technicienModalAPI.getTechniciens(req, res);
  },
  getTechnicien: (req, res) => {
    technicienModalAPI.findTech(req, res);
  },
  getAllReparations: (req, res) => {
    technicienModalAPI.getReparCats(req, res);
  },
  getTechReparations: (req, res) => {
    technicienModalAPI.getReparCat(req, res);
  },
  updateReparation: (req, res) => {
    technicienModalAPI.updateReparCat(req, res);
  },
  reparationStatus: (req, res) => {
    technicienModalAPI.ReparCatStatus(req, res);
  },
};
