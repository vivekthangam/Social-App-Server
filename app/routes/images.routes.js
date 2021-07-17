var imgModel = require('./app/models/image.model');
var path = require('path'); 
module.exports = function(app) {
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
            
            res.redirect('/');
          }
        });
      });
      
  };