const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const initRoutes = require("./app/routes/web");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const listEndpoints = require('express-list-endpoints');
const routes = require('./app/routes/index');
var fs = require('fs');
var imgModel = require('./app/models/image.model');
var path = require('path'); 
var multer = require('multer'); 
  
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
      console.log("t1")
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 
const uploadController = require("./app/controllers/upload");
app.use(cors())
routes(app);
// parse requests of content-type - application/json

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
//`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
const uri = dbConfig.uri;
db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to chat-vk application." });
});

// routes
// require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);
// require("./app/routes/web")(app);
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});
app.post("/image", function (req, res) {
  var name = req.body.name;
  var img = req.body.image;
  var realFile = Buffer.from(img, "base64");
  fs.writeFile(name, realFile, function (err) {
    if (err)
      console.log(err);

  });
  uploadController.uploadFiles(req, res);
  res.send("OK");
});

app.get("/getImages", (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('app', { items: items });
    }
  });
});
app.post('/images', upload.single('image'), (req, res, next) => {
console.log(req.body.name)
upload.single(req.body.image)
  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.image.filename)),
      contentType: 'image/png'
    }
  }
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    }
    else {
      // item.save(); 
      res.redirect('/');
    }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
