const clientModalAPI = require("../models/clientModalAPI");
const con = require("../server/db");

module.exports = {
  /****** Client ******/

  getClients: (req, res) => {
    clientModalAPI.getClients(req, res);
  },

  getClient: (req, res) => {
    clientModalAPI.getClient(req, res);
  },

  addClient: (req, res) => {
    const data = req.body;
    const { categorie } = data;
    const Num_cat =
      typeof categorie === "object" ? categorie.join("&") : categorie;// on transforme l'objet en chaine de valeur pour pouvoir le stocker dans my sql 
    con.query(
      `INSERT INTO Client SET
            id_client = ${data.N_serie},
            Nom = '${data.Nom}',
            N_reparation = '${data.Nom}&${data.N_serie}',
            modele = '${data.modele}';
        INSERT INTO Reparation SET 
            N_reparation = '${data.Nom}&${data.N_serie}',
            Nom_cat = '${Num_cat}',
            eau = '${data.eau}',
            description = '${data.commentaire}'
            `,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          if (typeof data.categorie === "object") {
            data.categorie.forEach((catItem) => {
              clientModalAPI.createReparCat(data, catItem, res);
            });
          } else {
            clientModalAPI.createReparCat(data, categorie, res);
          }
          res.status(400).json({ message: "Client created successfuly" });
        }
      }
    );
  },

  updateClient: (req, res) => {
    const { id, Nom } = req.params;
    const data = req.body;
    const { categorie } = data;
    const Num_cat =
      typeof categorie === "object" ? categorie.join("&") : categorie;//si on choisis plusieurs catégories ca devient une liste on exrait chaque catégories 
    con.query(
      `UPDATE Client SET 
          N_reparation = '${data.Nom}&${data.N_serie}',
          WHERE id_client = ${id} ;
      UPDATE Reparation SET 
          Nom_cat = '${Num_cat}',
          eau = '${data.eau}',
          description = '${data.commentaire}'
          WHERE N_reparation = '${Nom}&${id}'
      `,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          clientModalAPI.deleteReparCat(req, res);
          if (typeof data.categorie === "object") {// si le client à selectionner plusieur réparation pour chaque éléments on cree une réparation catégorie 
            data.categorie.forEach((catItem) => {
              clientModalAPI.createReparCat(data, catItem, res);
            });
          } else {// sinon un fais simplement une réparation 
            clientModalAPI.createReparCat(data, categorie, res);
          }
          res.status(200).json({ message: "Client updated successfuly" });
        }
      }
    );
  },

  /******* Reprations ******/

  getReparations: (req, res) => {
    clientModalAPI.getReparations(req, res);
  },

  getReparation: (req, res) => {
    clientModalAPI.getReparation(req, res);
  },

  /******* ReparCat ******/

  getReparCats: (req, res) => {
    clientModalAPI.getReparCats(req, res);
  },

  createReparCat: (req, res) => {
    clientModalAPI.createReparCat(req, res);
  },
  getReparCat: (req, res) => {
    clientModalAPI.getReparCat(req, res);
  },

  deleteReparCat: (req, res) => {
    clientModalAPI.deleteReparCat(req, res);
  },
  
  deleteOneReparCat: (req, res) => {
    clientModalAPI.deleteOneReparCat(req, res);
  },
};
