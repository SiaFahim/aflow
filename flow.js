var breathingSequence = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var heartBeatSequence = [0, 1, -2, -1, -1, 2, 1, 1, 1, 1, 1, 1, 1, 2, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1];
var flowMode = {
    h: 25,
    s: 70,
    l: 45,
    a: 0.05,
    dob: 3,
    dop: 1.3,
    bpm: 13
};

var ppm = (flowMode.bpm * 5);
var timePerBreath = (60000 / flowMode.bpm);
var timePerPulse = (60000 / ppm);
var delay = Math.floor(timePerBreath / breathingSequence.length);
var delayPerPulse1 = timePerPulse / 15;
var delayPerPulse2 = timePerPulse / 60;
var delayPerPulse3 = timePerPulse / 15;

var saturation = flowMode.s;
var opacity = flowMode.a;

var opacitySequence = [];
var saturationSequence = [];

function makeOpacitySequence(depth) {
    if (!depth) depth = flowMode.dob;
    for (var i = 0; i < breathingSequence.length; i++) {
        opacity = opacity + (breathingSequence[i] / 1000) * (depth);
        opacitySequence[i] = opacity;
    }
}

function breathe(curdex) {
    if (!curdex) curdex = 0;
    if (curdex >= breathingSequence.length) { curdex = 0; }
    var opac = opacitySequence[curdex];
    flowMode.a = opac;
    var hslaString = 'hsla(' +
        flowMode.h + ', ' +
        flowMode.s + '%,' +
        flowMode.l + '%,' +
        flowMode.a + ')';
    $('#mainBreather').css('background-color', hslaString);
    curdex++;
    setTimeout(function() {
        breathe(curdex);
    }, delay);
}

//below is the code for heartBeat

function makesaturationSequence(depth) {
    if (!depth) depth = flowMode.dop;
    var i;
    for (i = 0; i < 30; i++) {
        saturation = saturation + heartBeatSequence[i] * depth;
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
    for (var i = 0; i < heartBeatSequence.length; i++) {
        length += getHeartbeatDelay(i);
    }
    return length;
}

function doHeartbeat(curdex) {
    if (!curdex) curdex = 0;
    var sat = saturationSequence[curdex];
    var delay = getHeartbeatDelay(curdex);
    if (sat) {
        flowMode.s = sat;
        var hslaString = 'hsla(' +
            flowMode.h + ', ' +
            flowMode.s + '%,' +
            flowMode.l + '%,' +
            flowMode.a + ')';
        $('#mainBreather').css('background-color', hslaString);
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


var $$ = function(e) { //my little custom element-fetching function
        if (e.charAt(0) == "#") {
            return document.getElementById(e.substr(1));
        } else {
            var ee = document.querySelectorAll(e);
            if (ee.length === 0) {
                return null;
            } else {
                return ee[0];
            }
        }
    },
    html = document.documentElement;

//-----Create shader element-----

var breather = $$("breather") || document.createElement('breather');
html.insertBefore(breather, html.firstChild);
breather.innerHTML = '<!--This is an element that contains all the html for the screen shader extension to work-->' +
    '<div id="mainBreather" style="\
                -webkit-transition:opacity 0.01s;\
                transition:opacity 0.01s;\
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
                height: 120%;"></div>';