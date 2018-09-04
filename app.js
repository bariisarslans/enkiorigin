try{
  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  var bodyParser = require('body-parser');
  var _ = require('underscore');
  var escape = require('escape-html');
  var location = require("./location"); // Buralar ayrı modüllere geçince kaldırılacak.
  var mac = require("getmac"); // Buralar ayrı modüllere geçince kaldırılacak.
  var analysisEngine = require("./analysisEngine");
  var PORT = process.env.PORT || 3000;
  var IP,MAC; // Buralar ayrı modüllere geçince kaldırılacak.

const redis=require('redis');
	client=redis.createClient(process.env.REDIS_URL);

var app = express();
var server = require('http').Server(app);
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
        
        var Channel = encodeURIComponent('kanal-enkiOrigin'); // Kanal bilgisi buradan değiştirilecek
        res.redirect("chat#"+Channel); // Şuanda redirect ediyor chat sayfasına
        // Burada test edilmesi gereken kullanıcı bilgileri gönderebilmek. En azından username gönderiliyor olmalı.
        // Alttaki render blogu ile if içerisine alınacak. Socket ile dinledikten sonra yönlendirme yapılacak.

        /*res.render("lobi",{ 
        METHOD:"post",
        usrn:Data.UserName, // Db'ye kaydedilen veriyi döndüğü için kolon ismine göre çekmek gerekiyor
        usrID:Data.id,
        usrEmail:Data.Email,
        usrProblemID:Data.ProblemID
        });*/
        console.log(Data.UserName + " Kullanıcısının ID :"+ Data.id );
        console.log(username + " Kullanıcısı için analiz işlemi başarılı şekilde sonlandı.." );
      }
    });
  });

  app.post('/chat', function(req, res) {
    res.render('chat');
  });

  app.get('/index', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.get('/', function(req, res) {
    console.log("v1");
    res.render('index', { title: 'Express' });
  });
  
  /*app.get('/lobi', function(req, res) {
    console.log("lobi/get çalıştı");
    db.users.findAll({
        where:{
           // completed : false
        }
    }).then(function(todos){
        //res.json(todos);
        console.log(JSON.stringify(todos));
        res.render("lobi",{ 
          Data:todos
              });
    }, function(e){
      console.log("todos Hata sonucu : "+e);
      res.status(500).send(e);
  });
    //res.render("lobi");
  });*/

  app.get('/lobi', function(req, res) {
    res.render("lobi",{METHOD:"get"}); // Get veya post olduğunda ekranda çıkacak alanı düzenle
  });
  

  app.get('/chat', function(req, res) {
    res.render("chat");
  });

}
catch(e){
  console.log(e);
}
  // CHAT ENGINE
try{
  const io = require('socket.io')(server);
  var channel;
  io.sockets.on('connection', function(socket) {
      console.log("Socket.io baglantısı başarılı.");
      console.log(socket.rooms);
    socket.on('channelfixer', function(mychannel){
      channel=mychannel;
      socket.join(mychannel);
      
    });

    socket.on("register",function(myuname , myimage){
      client.hmset(socket.id,"myuname",myuname,"myimage",myimage); //
      console.log("register succes");
    });

    console.log('new user connected');

    socket.username = "Anonymous";


    socket.on('new_message', function(msg,socketid){

      console.log("Kanal : "+socket.rooms[channel]); // oda olarak odanın ismi veriliyor buraya
      //console.log("Tüm kanallar : "+socket.rooms);

      client.hgetall(socket.id,function(err, obj){
        if (err)  { console.log(err);throw err;}
        console.log("socket.idd : "+socket.id);
        console.log(obj);
        xmsg= escape(msg);
        io.to(socket.rooms[channel]).emit('new_message', xmsg,socketid, obj.myuname, obj.myimage); // Redis sunucuya kurulduğunda 
      }); // Bu myuname ve myimage parametreleri kaldırılacak.
      
    });
    socket.on('disconnect', function () { });

    server.on('listening',function(){
      console.log('ok, server is running');
      });
      
  });
}
catch(error){
  console.log("uygulama socket scriptinde, try blogunda hata verdi.");
  console.log(error);
}
  // CHAT ENGINE


server.listen(PORT, function(){
  console.log("Express listening on "+ PORT);
});

 // Burası veritabanı sıfırdan oluşması için default hali ayarlanabilir.
/*db.sequelize.sync({ force : false}).then(function(){
  console.log("DB baglantısı ve kurulumu başarılı");
 
  
}, function(err){
  console.log(err);
  console.log("DB baglantısı veya kurulumu başarısız.");
})*/

module.exports = app;
