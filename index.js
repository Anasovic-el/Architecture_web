let express = require("express");
const path = require("path"); //module path pour les statics

const cors = require("cors");//API call

let clientsRouter = require("./routes/clients"); // import les fonctions qui sont dans routes/clients et on les  
let techniciensRouter = require("./routes/techniciens");
let clientsApiRouter = require("./routes/clientsAPI");
let techniciensApiRouter = require("./routes/techniciensAPI");
const con = require("./server/db");


let app = express();

// middleware
app.use(express.urlencoded({ extended : true})) // req le corp du message
app.use(express.json()); //pour utiliser les donné qui sont sous format json
app.set("view engine", "ejs");// les views sont des extension ejs 
app.set("views", "views");// les views sont dans le dossier views 

//pour les appelle API
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}); 

app.use(express.static(path.join(__dirname, "public")));// chaque utilisateur à sont direction name expl linux utile pour le partage 

app.use("/clients", clientsRouter);
app.use("/api/clients", clientsApiRouter);

app.use("/techniciens", techniciensRouter);
app.use("/api/techniciens", techniciensApiRouter);

app.use("/", (req, res) => { //chemin initial
  res.render("welcome");
});

app.listen(5000, () => {
  console.log("server has starting on port 5000");
});