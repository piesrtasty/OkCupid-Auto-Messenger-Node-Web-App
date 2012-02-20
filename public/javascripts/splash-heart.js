var c;

function heartbeat(){
        c.animate({
        "0%": {scale: "0.5 0.5"},
        "10%": {scale: "0.5 0.5"},
        "15%": {scale: "0.6 0.6"},
        "20%": {scale: "0.5 0.5"},
        "35%": {scale: "0.6 0.6"},
        "40%": {scale: "0.5 0.5"},
        "110%": {scale: "0.5 0.5"},
        "115%": {scale: "0.6 0.6"},
        "120%": {scale: "0.5 0.5"},
        "135%": {scale: "0.6 0.6"},
        "140%": {scale: "0.5 0.5"},
        "210%": {scale: "0.5 0.5"},
        "215%": {scale: "0.6 0.6"},
        "220%": {scale: "0.5 0.5"},
        "235%": {scale: "0.6 0.6"},
        "240%": {scale: "0.5 0.5"},
        "300%": {scale: "0.5 0.5"}
        
    }, 2500);
}

window.onload = function () {

      // We're writing in a particular div (for placement)
      // so let's get a reference to that first!
      var myDiv = document.getElementById("heartexample");

      // Creates canvas 
      var paper = Raphael(myDiv, 100, 100);

var solidheart = "M 58,17 C 52,7 42,0 30,0 C 13,0 0,13 0,30 C 0,63 18,68 58,106 C 98,68 116,63 116,30 C 116,13 103,0 86,0 C 74,0 64,7 58,17 z";
c = paper.path(solidheart).attr({fill: "#ff0707", stroke: "none", scale: "0.5 0.5"}).click(heartbeat);

heartbeat();

};