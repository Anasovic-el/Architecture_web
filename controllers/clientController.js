let clientModal = require("../models/clientModal");
let con = require("../server/db");
module.exports = {
  addClient: (data) => {
    clientModal.createReparation(data);
    clientModal.createClient(data);
    if (typeof data.categorie === "object") { //coche plusieurs
      data.categorie.forEach((categorie) => {
        clientModal.createRepCat(data, categorie);
      });
    } else {
      clientModal.createRepCat(data, data.categorie); //coche une seul 
    }
  },
  findClient: (data, res) => {
    if (data.N_serie) {
      clientModal.getClient(data, res);
    } else {
      res.redirect("/clients/client_validation");
    }
  },
  updateClient: (id, Nom, data) => {
    clientModal.updateClient(id, data);
    clientModal.updateReparation(id, Nom, data);
    clientModal.deleteReparCat(id, Nom);
    if (typeof data.categorie === "object") {
      data.categorie.forEach((categorie) => {
        clientModal.createRepCat(data, categorie);
      });
    } else {
      clientModal.createRepCat(data, data.categorie);
    }
  },
  getClient: (id, Nom, res) => {
    const formLink = `/clients/${Nom}-${id}/formule`;// pour les variable dynamique les guillemet
    const reparLink = `/clients/${Nom}-${id}/mes_reparations`;
    res.render("clients/ancien-client", {
      formLink: formLink,
      reparLink: reparLink,
    });
  },
  getClientFormule: (id, Nom, res) => {
    clientModal.getFormule(id, Nom, res);
  },
  getClientReparations: (id, Nom, res) => {
    clientModal.getReparations(id, Nom, res);
  },
};
