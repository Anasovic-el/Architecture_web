const technicienModal = require("../models/technicienModel");

module.exports = {
  findTechnicien: (data, res) => {
    technicienModal.findTech(data, res);
  },
  getTechnicien: (id, res) => {
    const formLink = `/techniciens/${id}/modifications`;
    const reparLink = `/techniciens/${id}/mes_reparations`;
    res.render("techniciens/technicien", {
      formLink: formLink,
      reparLink: reparLink,
    });
  },
  getTechReparation: (id, res) => {
    technicienModal.getReparCat(id, res);
  },
  updateTechReparation: (id, data, res) => {
    technicienModal.updateReparCat(id, data, res);
  },
  statusTechReparation: (id, res) => {
    technicienModal.ReparCatStatus(id, res);
  },
};
