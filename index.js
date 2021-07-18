const express = require("express");
const bodyParser = require("body-parser");
const logger = require('./App/Middlewares/logger')
const app = express();
const connectDb = require('./App/Config/db.config')
const createRoutes = require('./App/Routes')
const path = require('path');
const PORT = process.env.PORT || 3001;
const errorhandler = require("./App/Middlewares/error")

app.use(express.json());
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger)


// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
createRoutes(app);
//error Handler
app.use(errorhandler);

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});


connectDb()
app.listen(PORT);