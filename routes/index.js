var express = require('express');
var router = express.Router();

var sequelize = require('sequelize');
//var User = sequelize.model("User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render("index");
});

router.post("/lobi", function(req, res){
// DB işlemleri burada yapılacak
   
  db.create({})

  //res.render('lobi' , {postVal : req.body});
  //console.log("Lobi sayfası render edildi ve değer gönderildi : "+req.body.id +" "+req.body.value);

  /*
  var body = req.body.id;
  res.render(body);
  */
})

router.get('/lobi', function(req, res, next) {
  res.render("lobi");
});

router.get('/chat', function(req, res, next) {
  res.render("chat");
});

module.exports = router;
