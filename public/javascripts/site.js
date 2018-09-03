// Write your Javascript code.

/*function setAndUpdateCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}*/
// COOKİE AYARI YAP, HANGİ DURUMLARDA 1 GELECEK HANGİ DURUMLARDA 0 GELECEK
/*function checkStatusCookie() {
    var Status=getCookie("EnkiStatus");
    if (Status == "1" ) {
        console.log("kullanıcı aktifmiş daha önceden"+getCookie('EnkiStatus'));
    }
    else if(Status == "0" ) {
        console.log("Daha önce atanmış bir cookie mevcut. Değeri 0 olduğu için 1 ile güncellendi. şuanda mevcut kullanıcı online olarak ayarlanacak.");
        setAndUpdateCookie("EnkiStatus", "1", 30);
        console.log(getCookie('EnkiStatus'));
    }
    else if (Status == "" || Status == null || Status==undefined || Status=="undefined") {
        console.log("daha önce enkistatus adında bir cookie set edilmemiş. bu yüzden bir cookie oluşturuldu ve değeri 1 olarak set edildi.");
        setAndUpdateCookie("EnkiStatus", "1", 30);
        console.log(getCookie('EnkiStatus'));
    }
    else{
        console.log("Mevcut Cookie Değeri : "+getCookie('EnkiStatus'));
        setAndUpdateCookie("EnkiStatus", "1", 30);
        console.log("Mevcut Cookie Değeri(Updated) : "+getCookie('EnkiStatus'));
    }

}*/

$(document).ready(function () {

    function PanelOpenOrClose() {
        var div = $("#FiltrPanel");
        if (div.css("height") == '400px') {
            div.animate({ height: '0px' }, "fast");
            div.animate({ width: '0%' }, "fast");
            div.animate({ border: '0px' }, "fast");
            //$("FiltrPanel").children().addClass("gizle");
            div.children().addClass("gizle");
            $(".blockDiv").addClass("gizle");
        }
        else  {
            div.css({
                "position": "absolute",
                "border": "1px solid black",
                "border-radius": "2px",
                "margin-top": "-5%",
                "z-index": "10"
            });
            div.animate({ width: '100%' }, "fast");
            div.animate({ height: '400px' }, "fast");
            div.children().removeClass("gizle");
            $(".blockDiv").removeClass("gizle");
        }
    }

    $("#OptionsCark").click(function () {
        PanelOpenOrClose(); 
    });

    $(".blockDiv").click(function () {
        PanelOpenOrClose();
    });

    $("input").focus(function () {
        $('input').animate({ boxShadow: '0px 0px 25px black' }, "slow"); 
        $('input').animate({ borderBottom: '1px solid gray' }, "slow"); 
    });




    //Mesaj Gönder

    /*$(".SendBtn").click(function () {
        var str = $("#MsjTextVal").val();
        if (str != "") document.getElementById("ChatBackground").innerHTML += "<div class='MsjBackDiv'><div class='pull-right Clear Time'>22:30</div><div class='GidenMsj MaxWidth'>" + str + "</div></div>";
        $("#MsjTextVal").val("");
        updateScroll();
        SaatiGetir();
        // Giden(); // Sound
 });  */

 window.MsgSendJS = function MsgSendJS(){
        var str = $("#MsjTextVal").val();
        if (str != "")$("#ChatBackground").append("<div class='MsjBackDiv'><small class='pull-right Clear Time'></small><div class='GidenMsj MaxWidth'>" + str + "</div></div>");
        SaatiGetir();                
        $("#MsjTextVal").val("");
        updateScroll();
        // Giden(); // Sound
 };
  
var path = "chat";
    //Scroll sürekli altta kalsın
    window.updateScroll = function updateScroll() {
    if (path == location.pathname.substring(location.pathname.lastIndexOf("/") + 1)) {
            var element = document.getElementById("ChatBackground");
            element.scrollTop = element.scrollHeight;
       }
    };

    function DownBtnCreator(){
        if(!document.getElementById("downBtn")){
            var btn = document.createElement('span');
            btn.id="downBtn";
            btn.className="glyphicon glyphicon-chevron-down SendBtn";
            btn.addEventListener( 'click', function(){updateScroll()} );
            btn.style.backgroundColor="#B22222"; 
            btn.style.color="#ffffff";
            btn.style.zIndex="10001";
            document.getElementById("MsjBoxContainer").appendChild(btn);   
        }
    }

    function RemoveDownBtn(){
        if(document.getElementById("downBtn")){
            var item = document.getElementById("downBtn");
            item.parentNode.removeChild(item);
            console.log("downbtn ifine girdi ve kaldırdı");
        }
    }

    var userHasScrolled = false;
    window.schrll = function (e) // scroll yapılıp yapılmadığını kontrol ediyor. Eğer yapıldıysa ama en alta indirildiyse yapılmamış varsayıyor. 
    {
        if (path == location.pathname.substring(location.pathname.lastIndexOf("/") + 1)) {
            var element = document.getElementById("ChatBackground");
            if((element.scrollTop+element.clientHeight)==element.scrollHeight || 
                element.scrollHeight-(element.scrollTop+element.clientHeight)<=15)
            {
                userHasScrolled = false;
                RemoveDownBtn();
                //console.log("userHasScrolled : "+userHasScrolled);
                //console.log("Scroll Barın tabana uzaklığı : "+(element.scrollHeight-(element.scrollTop+element.clientHeight)));
            }
            else{
                userHasScrolled = true;
                DownBtnCreator();
                //console.log("userHasScrolled : "+userHasScrolled);
                //console.log("Scroll Barın tabana uzaklığı : "+(element.scrollHeight-(element.scrollTop+element.clientHeight)));
            }
        } // neden nan geldiğini aaraştır. Konsoldan dene
        
    }

    window.updateScrollGelenMsg = function updateScrollGelenMsg() {
        if (path == location.pathname.substring(location.pathname.lastIndexOf("/") + 1)) {
            var element = document.getElementById("ChatBackground");
            if(userHasScrolled==false){
                element.scrollTop = element.scrollHeight;
            }
        }
    };

    //Saat
    window.SaatiGetir = function SaatiGetir() {
        var d = new Date();
        var n = d.getHours() + ":" + d.getMinutes();
        document.getElementsByTagName("small")[document.getElementsByTagName("small").length - 1].innerHTML = n;
    };
   


    // Jest :)
    function GelenMesaj() {
            for(var i=0;i<25;i++){
                var a = "Test";
                document.getElementById("ChatBackground").innerHTML += "<div class='MsjBackDiv'><div class='pull-left Clear Time2'>22:30</div><div class='GelenMsj MaxWidth'>" + a + "</div></div>";
                updateScrollGelenMsg();
                //SaatiGetir();
            }
        
        // Gelen(); // Sound
    };
    window.onload=GelenMesaj();
    //GelenMesaj();
    //setInterval(GelenMesaj, 1000);

    var gelen = document.getElementById("Gelen");

    function Gelen() {
        if (path == location.pathname.substring(location.pathname.lastIndexOf("/") + 1)) { gelen.play(); }
    };

    var giden = document.getElementById("Giden");

    function Giden() {
        if (path == location.pathname.substring(location.pathname.lastIndexOf("/") + 1)) { giden.play(); }
    };

    /*$(document).on('keydown', function (e) {
        if (e.keyCode == 13) {
            var str = $("#MsjTextVal").val();
            if (str != "") document.getElementById("ChatBackground").innerHTML += "<div class='MsjBackDiv'><div class='pull-right Clear Time'>22:30</div><div class='GidenMsj MaxWidth'>" + str + "</div></div>";
            $("#MsjTextVal").val("");
            updateScroll();
            SaatiGetir();
            Giden();
        }
    });*/


    function UserBilgiOpen() {
        var div = $("#bilgiler");
        if (div.css("height") == '400px') {
            div.animate({ height: '0px' }, "slow");
            div.animate({ width: '0%' }, "slow");
            div.animate({ border: '0px' }, "fast");
            div.animate({ display: 'none' }, "fast");
            div.children().addClass("gizle");
        }
        else {
            div.css({
                "position": "absolute",
                "border": "1px solid black",
                "border-radius": "2px",
                "margin-top": "7%",
                "z-index": "10",
                "display": "block",
                "right": "0px",
                "background-color": "#fff"
            });
            div.removeClass("gizle");
            div.children().removeClass("gizle");
            if (screen.width < 1024 && screen.width > 425){
                div.animate({ width: $(".container").width() / 1.5 }, "slow");
            }
            else if (screen.width < 425){
                div.animate({ width: $(".container").width()  }, "slow");
            }
            else {
                div.animate({ width: "350px" }, "slow");
            }
            div.animate({ height: '400px' }, "slow");

        }
    }

    $(".User-About").click(function () {
        UserBilgiOpen();
    });

    function CustomCursor() {
        if (path.toLowerCase().indexOf("lobi.php") > 0) {
            $("html").addClass("lobi");
            $("a").addClass("lobi");
        }
    }
    //CustomCursor();
    updateScroll();

    //function ChatBoxSizer() {
    //    if (screen.width<1024)
    //    $('.ChatBackground').height(screen.height - 150);
    //};

    //function ChatBoxSizer() {
    //    var sBoy = $('body').height();
    //    var cBoy = $('.ChatBackground').height();
    //    for (cBoy; cBoy < sBoy; cBoy - 10) {
    //        $('.ChatBackground').height(cBoy);
    //    }
    //};

    

    //ChatBoxSizer();
    SaatiGetir(); // sonradan kaldırılacak unutma

    //checkStatusCookie(); // Cookie kontrolü
});



var inFormOrLink;
$('a').on('click', function() { inFormOrLink = true; });
$('form').on('submit', function() { inFormOrLink = true; });

$(window).on("beforeunload", function() {
       // setAndUpdateCookie("EnkiStatus", "0", 30);
});

