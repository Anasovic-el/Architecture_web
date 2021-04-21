let con = require("../server/db");
const url = require("url");
module.exports = {
  createClient: (data) => {
    con.query(`INSERT INTO Client SET
          id_client = ${data.N_serie},
          Nom = '${data.Nom}',
          N_reparation = '${data.Nom}&${data.N_serie}',
          modele = '${data.modele}'`);
    console.log("create successfuly");
  },

  createReparation: (data) => {
    const { categorie } = data;
    const Num_cat =
      typeof categorie === "object" ? categorie.join("&") : categorie;
    console.log("Num_cat", Num_cat);
    con.query(`INSERT INTO Reparation SET 
          N_reparation = '${data.Nom}&${data.N_serie}',
          Nom_cat = '${Num_cat}',
          eau = '${data.eau}',
          description = '${data.commentaire}'
          `);
    console.log("create successfuly");
  },

  createRepCat: (data, categorie) => {
    con.query(`INSERT INTO ReparCat SET 
    N_reparation = '${data.Nom}&${data.N_serie}',
    Nom_cat = '${categorie}',
    description = '${data.commentaire}',
    eau = '${data.eau}',
    modele = '${data.modele}',
    Etat = 'En attente'
    `);
  },

  updateClient: (id, data) => {
    const { categorie } = data;
    const Num_cat =
      typeof categorie === "object" ? categorie.join("&") : categorie;
    con.query(`UPDATE Client SET 
      N_reparation = '${categorie}'
      WHERE id_client = ${id}
      `);
  },

  updateReparation: (id, Nom, data) => {
    const { categorie } = data;
    const Num_cat =
      typeof categorie === "object" ? categorie.join("&") : categorie;
    con.query(`UPDATE Reparation SET 
      Nom_cat = '${categorie}',
      eau = '${data.eau}',
      description = '${data.commentaire}'
      WHERE N_reparation = '${Nom}&${id}'
      `);
  },
  deleteReparCat: (id, Nom) => {
    con.query(
      `DELETE FROM ReparCat WHERE N_reparation = '${Nom}&${id}'`,
      (err, result) => {
        if (err) console.log(err);
      }
    );
  },

  getClient: (data, res) => {
    con.query(
      `SELECT * FROM Client WHERE id_client = ${data.N_serie} AND Nom = '${data.Nom}'`,
      (err, result) => {
        if (err) console.log("err", err);
        console.log("res", result);
        if (result?.length !== 0) { //lorque je n'ai pas le result
          console.log("modified Page");
          const id = result[0].id_client;
          const Nom = result[0].Nom;
          res.redirect(`/clients/${Nom}-${id}`);
          console.log("after  redirect");
        } else {
          console.log("not modified page");
          res.render("clients/client-validation");
        }
      }
    );
  },

  getFormule: (id, Nom, res) => {
    con.query(
      `SELECT * FROM Client WHERE id_client = '${id}' AND Nom = '${Nom}'`,
      (err, result) => {
        if (err) console.log("err", err);
        console.log("res", result);
        if (result?.length !== 0) {
          console.log("modified Page");
          const data = result[0];
          const formLink = `/clients/${Nom}-${id}/formule`;
          const reparLink = `/clients/${Nom}-${id}/mes_reparations`;
          res.render("clients/ancien_formule", {
            data: data,
            formLink: formLink,
            reparLink: reparLink,
          });
        } else {
          console.log("not found");
          res.render("client-validation");
        }
      }
    );
  },
  getReparations: (id, Nom, res) => {
    const formLink = `/clients/${Nom}-${id}/formule`;
    const reparLink = `/clients/${Nom}-${id}/mes_reparations`;
    con.query(
      `SELECT * FROM ReparCat WHERE N_reparation = '${Nom}&${id}'`,
      (err, result) => {
        if (err) console.log("err", err);
        console.log("res", result);
        res.render("clients/ancien_reparation", {
          data: result,
          fromLink: formLink,
          reparLink: reparLink,
        });
      }
    );
  },
};
