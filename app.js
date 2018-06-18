var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var _ = require('underscore');
var location = require("./location"); // Buralar ayrı modüllere geçince kaldırılacak.
var mac = require("getmac"); // Buralar ayrı modüllere geçince kaldırılacak.
var analysisEngine = require("./analysisEngine");
var PORT = process.env.PORT || 3000;
var IP,MAC; // Buralar ayrı modüllere geçince kaldırılacak.

var app = express();
var db = require("./db"); // Buralar ayrı modüllere geçince kaldırılacak.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.post("/lobi", function(req, res){
    var {
      problem,
      username,
      gender,
      age,
      email,
      facebook,
      twitter,
      instagram
    } = req.body;
    console.log(username + " Kullanıcısı için analiz işlemi başlatılıyor...." );
    analysisEngine(problem, username, gender, age, email, facebook, twitter, instagram, function(error, Data){
      if(error || !Data) { 
        console.log(username + " Kullanıcıssı için analiz işlemi başarısız oldu. data :"+typeof Data );
        res.status(500).send(error);
        return; 
      }
      else if(Data){
        res.render("lobi",{ 
          usrn:Data.UserName, // Db'ye kaydedilen veriyi döndüğü için kolon ismine göre çekmek gerekiyor
          usrID:Data.id,
          usrEmail:Data.Email,
          usrProblemID:Data.ProblemID
              });
        console.log(Data.UserName + " Kullanıcısının ID :"+ Data.id );
        console.log(username + " Kullanıcısı için analiz işlemi başarılı şekilde sonlandı.." );
      }
    });
  });

  app.get('/index', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.get('/', function(req, res) {
    console.log("v1");
    res.render('index', { title: 'Express' });
  });
  
  app.get('/lobi', function(req, res) {
    console.log("lobi/get çalıştı");
    db.users.findAll({
        where:{
           // completed : false
        }
    }).then(function(todos){
        res.json(todos);
    });
    //res.render("lobi");
  });

  app.get('/lobi', function(req, res) {
    res.render("lobi");
  });
  
  app.get('/chat', function(req, res) {
    res.render("chat");
  });

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

*/
app.listen(PORT, function(){
  console.log("Express listening on "+ PORT);
});

 // Burası veritabanı sıfırdan oluşması için default hali ayarlanabilir.
db.sequelize.sync({ force : false}).then(function(){
  console.log("DB baglantısı ve kurulumu başarılı");
 
  
}, function(err){
  console.log(err);
  console.log("DB baglantısı veya kurulumu başarısız.");
})

module.exports = app;
