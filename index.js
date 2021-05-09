let express = require("express");
const path = require("path");
const cors = require("cors");//API call
let clientsRouter = require("./routes/clients");
let techniciensRouter = require("./routes/techniciens");
let clientsApiRouter = require("./routes/clientsAPI");
let techniciensApiRouter = require("./routes/techniciensAPI");
const con = require("./server/db");


let app = express();

// middleware
app.use(express.urlencoded({ extended : true}))
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});//pour les appelle API 

app.use(express.static(path.join(__dirname, "public")));

app.use("/clients", clientsRouter);
app.use("/api/clients", clientsApiRouter);

app.use("/techniciens", techniciensRouter);
app.use("/api/techniciens", techniciensApiRouter);

app.use("/", (req, res) => {
  console.log("home page");
  res.render("welcome");
});

app.listen(5000, () => {
  console.log("server has starting on port 5000");
});