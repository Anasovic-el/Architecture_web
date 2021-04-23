const con = require("../server/db");
module.exports = {
    findTech: (data,res) => {
        con.query(
            `SELECT * FROM Technicien WHERE id_tech = '${data.id_tech}' AND Nom = '${data.Nom}'`,
            (err,result) =>{
                if (err) console.log("err", err);
                console.log("res",result);
                if (result.lenght !== 0) {
                    console.log("modified page");
                    const id = result [0].id_tech;
                    const Nom = result[0].Nom;
                    res.redirect(`/techniciens/${id}`);
                } else{
                    console.logconsole.log("not modified page");
                    res.render("techniciens/technicien-validation");
                }
            }
        );
    },
    getReparCat: (id, res) => {
        con.query(`SELECT * FROM ReparCat WHERE Etat != 'Fini'`, (err, result) => {
            if(err) console.log("err",err);
            console.log("res",result);
            res.render("techniciens/tech_formule", { data: result, id: id });
        });
    },
    updateReparCat: (id,data,res) => {
        for (key in data){
            con.query(
                `UPDATE ReparCat SET 
                Etat = '${data[key]}',
                tech_id = '${id}' 
                WHERE id_repar_cat=${key}
              `,
              (err, result) => {
                  if (err)console.log("err", err); 
              } 
            );
        }
        console.log("done");
        res.redirect(`/techniciens/${id}/mes_reparations`);
    },

    ReparCatStatus: (id, res) => {
        con.query(
            `SELECT * FROM ReparCat WHERE (Etat = 'Fini' OR Etat = 'En cours' OR Etat= 'Impossible')  AND tech_id = '${id}'`,
            (err,result) => {
                if (err) console.log("err",err);
                console.log("res",result);
                res.render("techniciens/tech_reparation", { data: result, id: id });
            }
        );
    },
};