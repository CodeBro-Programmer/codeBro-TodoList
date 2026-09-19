let express = require("express");
let app = express();

app.use(express.json());

let cors = require("cors");
app.use(cors({
    origin: "http://localhost:5500"
}));

module.exports = app;