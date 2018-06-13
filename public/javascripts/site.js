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
    $(".SendBtn").click(function () {
        var str = $("#MsjTextVal").val();
        if (str != "") document.getElementById("ChatBackground").innerHTML += "<div class='MsjBackDiv'><div class='pull-right Clear Time'>22:30</div><div class='GidenMsj MaxWidth'>" + str + "</div></div>";
        $("#MsjTextVal").val("");
        updateScroll();
        SaatiGetir();
        Giden();
    });
var path = window.location.href;
    //Scroll sürekli altta kalsın
function updateScroll() {
    if (path == "http://localhost/enki/chat.php") {
            var element = document.getElementById("ChatBackground");
            element.scrollTop = element.scrollHeight;
       }
    };

    //Saat
    function SaatiGetir() {
        var d = new Date();
        var n = d.getHours() + ":" + d.getMinutes();
        $('.Time').text(n);
        $('.Time2').text(n);
    };
   


    // Jest :)
    function GelenMesaj() {
        var a = "Test";
        document.getElementById("ChatBackground").innerHTML += "<div class='MsjBackDiv'><div class='pull-left Clear Time2'>22:30</div><div class='GelenMsj MaxWidth'>" + a + "</div></div>";
        updateScroll();
        SaatiGetir();
        //Gelen();
    };
    //GelenMesaj();
    //setInterval(GelenMesaj, 1000);

    var gelen = document.getElementById("Gelen");

    function Gelen() {
        if (path == "http://localhost/enki/chat.php") { gelen.play(); }
    };

    var giden = document.getElementById("Giden");

    function Giden() {
        if (path == "http://localhost/enki/chat.php") { giden.play(); }
    };

    $(document).on('keydown', function (e) {
        if (e.keyCode == 13) {
            var str = $("#MsjTextVal").val();
            if (str != "") document.getElementById("ChatBackground").innerHTML += "<div class='MsjBackDiv'><div class='pull-right Clear Time'>22:30</div><div class='GidenMsj MaxWidth'>" + str + "</div></div>";
            $("#MsjTextVal").val("");
            updateScroll();
            SaatiGetir();
            Giden();
        }
    });


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

