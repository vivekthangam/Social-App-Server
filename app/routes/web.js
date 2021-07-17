const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");

let routes = app => {
  console.log(homeController);
  router.get("/home", homeController.getHome);

  router.post("/upload", uploadController.uploadFiles);

  return app.use("/", router);
};

module.exports = routes;