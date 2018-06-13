var db = require("./db");

module.exports = function(TableName, SearchKey, callback){ // Burada yazan callback alttaki fonksiyonları temsil ediyor

if(TableName == "problems"){
    db.problems.findOne({
        where:{
            ProblemValue : SearchKey
        }
    }).then(function(result){
        console.log("Problems dogru calisti : "+result);
        callback(result);
    }, function(){
        console.log("hata aldik."); 
        callback();
    });
}
else if(TableName == "problemcategories"){
    db.problemcategories.findOne({
        where:{
            ProblemCategory : SearchKey
        }
    }).then(function(result){
        console.log("ProblemCategories dogru calisti : "+result);
        callback(result);
    }, function(){
        console.log("hata aldik."); 
        callback();
    });
}
else {
    console.log("GetThisProblemRecordedBeforeID modülünde yanlış giden bişeyler var :(");
    console.log("Tablo Adı :"+TableName+" Gönderilen cümle :"+SearchKey);
}

}