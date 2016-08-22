var breathingSequence = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var heartBeatSequence = [0, 1, -2, -1, -1, 2, 1, 1, 1, 1, 1, 1, 1, 2, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1];

var beatsPerMinute = 72; // heartrate
var breathsPerMinute = 13; //Math.floor(beatsPerMinute / 5); // breathing rate per minute
var timePerBreath = (60000 / breathsPerMinute);
var timePerPulse = (60000 / beatsPerMinute);
var delay = Math.floor (timePerBreath / breathingSequence.length);
var delayPerPulse1 = timePerPulse / 15;
var delayPerPulse2 = timePerPulse / 60;
var delayPerPulse3 = timePerPulse / 15;

var currentColor = {
    h: 30,
    s: 80,
    l: 40,
    a: 0.4
};
var saturation = currentColor.s;
var lightness = currentColor.l;
var opacity = currentColor.a;

var opacitySequence =[];
var saturationSequence = [];



var breathScale = 2;
var pulseScale = 1



function makeOpacitySequence() {
    for (var i=0; i< breathingSequence.length; i++){
        opacity = opacity + breathingSequence[i]/100 * breathScale;
        opacitySequence[i] = opacity;
    }
    return opacitySequence; 
  }
  
function breathe(curdex) {
    if (!curdex) curdex = 0;
    if (curdex >= breathingSequence.length) {curdex =0;}
    var opac = opacitySequence[curdex];
        currentColor.a = opac;
        var hslaString = 'hsla(' + 
           currentColor.h + ', ' + 
           currentColor.s + '%,' + 
           currentColor.l + '%,' + 
           currentColor.a + ')';
        $('#mainbreather').css('background-color', hslaString);
        curdex++; 
      setTimeout(function() {
          breathe(curdex);
      }, delay);
}

//below is the code for heartBeat

function makesaturationSequence() {
  var i;
  for (i=0; i<30; i++){
    saturation = saturation - heartBeatSequence[i] * pulseScale;
    saturationSequence[i] = saturation;
  }
  return saturationSequence;
}

function getHeartbeatDelay(idx) {
    if (idx <= 5) {
        return delayPerPulse1;
    } else if (idx <= 25) {
        return delayPerPulse2;
    } else {
        return delayPerPulse3;
    }
}

function getHeartbeatLength() {
    var length = 0;
    for(var i=0; i<heartBeatSequence.length; i++) {
        length += getHeartbeatDelay(i);
    }
    return length;
}

function doHeartbeat(curdex) {
    if (!curdex) curdex = 0;
    var sat = saturationSequence[curdex];
    var delay = getHeartbeatDelay(curdex);
    if (sat) {
        currentColor.s = sat;
        var hslaString = 'hsla(' + 
           currentColor.h + ', ' + 
           currentColor.s + '%,' + 
           currentColor.l + '%,' + 
           currentColor.a + ')';
        $('#mainbreather').css('background-color', hslaString);
        curdex++;   
      setTimeout(function() {
          doHeartbeat(curdex);
      }, delay);
    } 
}

makesaturationSequence();
setInterval(doHeartbeat, getHeartbeatLength());
doHeartbeat();

makeOpacitySequence();
breathe();


//----------------------------------------------
//-----overlay div for the chrome extention-----
//----------------------------------------------


var $$ = function(e){//my little custom element-fetching function
    if(e.charAt(0) == "#"){
      return document.getElementById(e.substr(1));
    }else{
      var ee=document.querySelectorAll(e);
      if(ee.length===0){
        return null;
      }else{
        return ee[0];
      }
    }
  },
  html = document.documentElement;

//-----Create shader element-----

var breather=$$("breather")||document.createElement('breather');
html.insertBefore(breather, html.firstChild);
breather.innerHTML ='<!--This is an element that contains all the html for the screen shader extension to work-->'+
            '<div id="mainbreather" style="\
                -webkit-transition:opacity 0.1s;\
                transition:opacity 0.1s;\
                z-index:2147483647;\
                background-image: none;\
                margin: 0px;\
                border-radius:0px;\
                padding:0px;\
                pointer-events:none;\
                position:fixed;\
                top:-10%;\
                right:-10%;\
                width:120%;\
                height: 120%;\
                opacity:0.3;">';
                
                