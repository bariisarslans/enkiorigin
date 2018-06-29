var mac = require("getmac");
var location = require("./location"); 
var db = require("./db");
var GetThisProblemRecordedBeforeID = require("./GetThisProblemRecordedBeforeID");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "",
    database : "enkirun"
});

var IP,MAC;

// Bilgisayarın MAC adresini yakalıyor.
mac.getMac(function(err, macAddress){
    if (err)  {throw err;console.log("MAC adresi yakalanamadı.");}
    MAC = macAddress;
    console.log(macAddress);
});
  
location(function(location){ // buradaki parametre olan location aslında location.js modülündeki callback(body) fonksiyonundan dönen veriyi temsil ediyor.

  if(!location){
    console.log("Loc bilgisi alınamadı");
    return;
  }else{
    IP = location.ip;
    console.log(location.ip);
  }

});

module.exports = function (problem, username, gender, age, email, facebook, twitter, instagram, callback) {

    age == 0 ? age=null: age;

    var ProblemID = null;
    var ProblemCategoryID = null;

    GetThisProblemRecordedBeforeID("problems", problem, function(Data){ // 1. Adım - Gelen cümlenin aynısı daha önce varsa id'sini dönecek bir module yazılacak.
        if(!Data) {  
          console.log(problem+" Cümlesi problems tablosunda yok. Dönen sonuç : "+Data+". Cümle kelimelere ayrılıp aranmaya devam ediyor.");
          var Words = problem.split(/[.,\/ -?]/); // Kelimelere ayırıyor.


            db.problemCategorie.findAll({
                where:{
                }
            }).then(function(result){
                result.forEach(row => {
            
                    
                    Words.forEach(function(word) {
                        if(word.toLowerCase() == row.ProblemCategory.substr(0,word.length).toLowerCase() ||
                        row.ProblemCategory.toLowerCase() == word.substr(0,row.ProblemCategory.length).toLowerCase())
                        {
                            console.log(word+" kelimesinin kategorisi : "+row.ProblemCategory);
                            ProblemCategoryID = row.id;
                            // girilen cümlenin kelimenin kategorisi bulunuyor ve global değişkene id si yazdırılıyor.
                        }
                      });
        
                }); 
                if(ProblemCategoryID == null)
                {
                    ProblemCategoryID=0; // eğer null gelmişse kategori bulunmamış demektir. Bu yüzden ortak kategori olan 0  yapılıyor.
                }

                    db.problems.create({
                        ProblemValue: problem,
                        ProblemCategoryID: ProblemCategoryID                                   
                    }).then(function(Pdata){
                        console.log("tebrikler. yeni bir problem create edildi. ProblemCategoryID: "+ProblemCategoryID+" Data detayı : "+Pdata.id+" , "+Pdata.ProblemValue+" ,"+Pdata.ProblemCategoryID);
                        
                        db.users.create({
                            IP: IP,
                            MacAddress: MAC,
                            UserStatus: "1",
                            ProblemID: Pdata.id,
                            UserName: username,
                            GenderID:gender,
                            Age:age,
                            Email:email,
                            FacebookURL:facebook,
                            TwitterURL:twitter,
                            InstagramURL:instagram
                        }).then(function(Udata){
                            console.log("analysisEngine'de yepyeni bir kayıt başarılı şekilde oluşturuldu. Dönen callback.UserName "+Udata.UserName);
                          callback(null,Udata);
                    }, function(e){
                        console.log("analysisEngine'de yeni kayıt sırasında hata oluştu. Hata sonucu : "+e);
                        res.status(500).send(e);
                    })
                }, function(e){
                    console.log("Problem kaydı oluşturulamadı. Hata sonucu : "+e);
                    res.status(500).send(e);
                })
                
            }, function(){
                console.log("hata aldik."); 
                
            }); 
            
        }
        else {
            ProblemID = Data.id;
            console.log("Yakalanan ID : "+ProblemID);
            db.users.create({
                IP: IP,
                MacAddress: MAC,
                UserStatus: "1",
                ProblemID: ProblemID,
                UserName: username,
                GenderID:gender,
                Age:age,
                Email:email,
                FacebookURL:facebook,
                TwitterURL:twitter,
                InstagramURL:instagram
            }).then(function(data){
                console.log("analysisEngine'de kayıt başarılı şekilde oluşturuldu. Dönen callback.UserName "+data.UserName);
                // Burada kaydedilen userı app.js e dönüyorum.
                // User kayıt bittikten sonra pool'a kaydetmek için kullanılacak sorgu
                // Bu sorgu user'ın problemine göre problemcategory tablosundaki top değeri dönüyor.
                /////////////////////////////
                //
                //  SELECT id,ProblemCategory FROM problemcategories WHERE id = (SELECT pc.TopCategoryID FROM users u 
                //  JOIN problems p ON u.ProblemID=p.id JOIN problemcategories pc ON p.ProblemCategoryID=pc.id WHERE u.id=154)
                //
                ////////////////////////////
              callback(null,data);
        }, function(e){
            console.log("analysisEngine'de kayıt oluşturulamadı. Hata sonucu : "+e);
            res.status(500).send(e);
        })
            
        }
      });    
}




