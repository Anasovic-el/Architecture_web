let express = require("express");
const path = require("path");
clientsRouter = require("./routes/clients");
techniciensRouter = require("./routes/techniciens");
const con = require("./server/db");

const bodyParser = require("body-parser");

let app = express();

// middleware
app.use(express.urlencoded({ extended : true}))
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");


app.use((req, res, next) => {
  req.con = con;
  next();
});

// public folder par défaut 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/clients", clientsRouter);
app.use("/techniciens", techniciensRouter);

app.use("/", (req, res) => {
  console.log("home page");
  res.render("welcome");
});

app.listen(5000, () => {
  console.log("server has starting on port 5000");
});