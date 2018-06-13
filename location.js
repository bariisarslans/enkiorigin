var request = require("request");
var url = "http://ipinfo.io";

module.exports = function(callback){ // Burada yazan callback alttaki fonksiyonları temsil ediyor
    request({
        url : url,
        json : true
    }, function(error, response, body){
        if(error) {
            callback(); // burada location yoksa boş bir fonksiyon dönüyor.
        }else{
            callback(body); // doluysa gelen body parametresi yani konum bilgisi dönüyor.
        }
    });
}