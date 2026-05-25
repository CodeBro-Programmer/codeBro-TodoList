let express = require("express");
let app = express();

app.use(express.json());

let cors = require("cors");
app.use(cors());

module.exports = app;