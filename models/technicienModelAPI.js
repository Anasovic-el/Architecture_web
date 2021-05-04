const con = require("../server/db");
module.exports = {
  getTechniciens: (req, res) => {
    const data = req.body;
    con.query(`SELECT * FROM Technicien `, (err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        res.status(200).json(result);
      }
    });
  },

  findTech: (req, res) => {
    const { id } = req.params;
    con.query(
      `SELECT * FROM Technicien WHERE id_tech = '${id}'`,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          res.status(200).json(result);
        }
      }
    );
  },

  getReparCats: (req, res) => {
    con.query(`SELECT * FROM ReparCat`, (err, result) => {
      console.log(result);
      if (err) {
        res.status(400).json({ message: err });
      } else {
        res.status(200).json(result);
      }
    });
  },

  getReparCat: (req, res) => {
    const { id } = req.params;
    con.query(
      `SELECT * FROM ReparCat WHERE tech_id = '${id}'`,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          res.status(200).json(result);
        }
      }
    );
  },
  updateReparCat: (req, res) => {
    const { id } = req.params;
    const data = req.body;
    con.query(
      `SELECT * FROM Technicien WHERE id_tech = '${id}'`,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          for (key in data) {
            con.query(
              `UPDATE ReparCat SET 
                  Etat = '${data[key]}',
                  tech_id = '${id}' 
                  WHERE id_repar_cat=${key}
                `,
              (err, result) => {
                if (err) console.log("err", err);
              }
            );
          }
          res.status(200).json({ message: "reparCat updated successfuly" });
        }
      }
    );
  },

  ReparCatStatus: (req, res) => {
    const { id } = req.params;
    con.query(
      `SELECT * FROM ReparCat WHERE (Etat = 'Fini' OR Etat = 'En cours')  AND tech_id = '${id}'`,
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          res.status(200).json(result);
        }
      }
    );
  },
};
