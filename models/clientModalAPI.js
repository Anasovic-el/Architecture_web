const con = require("../server/db");
const url = require("url");
module.exports = {
  getClients: (req, res) => {
    const data = req.body;
    con.query(`SELECT * FROM Client`, (err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      if (result?.length !== 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "clients empty" });
      }
    });
  },

  getClient: (req, res) => {
    const { id, Nom } = req.params;
    con.query(
      `SELECT * FROM Client WHERE id_client = ${id} AND Nom = '${Nom}'`,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        if (result?.length !== 0) {
          res.status(200).json(result);
        } else {
          res.status(200).json({ message: "client not founded" });
        }
      }
    );
  },

  getReparations: (req, res) => {
    con.query(`SELECT * FROM Reparation`, (err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        res.status(200).json(result);
      }
    });
  },

  getReparation: (req, res) => {
    const { id, Nom } = req.params;
    con.query(
      `SELECT * FROM Reparation WHERE N_reparation = '${Nom}&${id}'`,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });// bad request 
        }
        if (result?.length > 0) {
          res.status(200).json(result);// res statut succes 200  succes
        } else {
          res.status(200).json({
            message: "Pas de reparation",
          });
        }
      }
    );
  },

  getReparCats: (req, res) => {
    con.query(
      `SELECT * FROM ReparCat
    `,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        else{
        res.status(200).json(result);
        }
      }
    );
  },

  getReparCat: (req, res) => {
    const { id, Nom } = req.params;
    con.query(
      `SELECT * FROM ReparCat WHERE N_reparation = '${Nom}&${id}'
    `,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.status(200).json(result);
      }
    );
  },

  createReparCat: (data, categorie, res) => {
    con.query(
      `INSERT INTO ReparCat SET
    N_reparation = '${data.Nom}&${data.N_serie}',
    Nom_cat = '${categorie}',
    description = '${data.commentaire}',
    eau = '${data.eau}',
    modele = '${data.modele}',
    Etat = 'En attente'
    `
    );
  },

  deleteReparCat: (req, res) => {
    const { id, Nom } = req.params;
    con.query(`DELETE FROM ReparCat WHERE N_reparation = '${Nom}&${id}'`);
  },
};
