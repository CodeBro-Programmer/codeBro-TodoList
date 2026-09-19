let express = require("express");
require("dotenv").config()
let app = express();

app.use(express.json());

let cors = require("cors");
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

module.exports = app;