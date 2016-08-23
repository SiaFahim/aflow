var breathingSequence = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var heartBeatSequence = [0, 1, -2, -1, -1, 2, 1, 1, 1, 1, 1, 1, 1, 2, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1];
var beatsPerMinute = 72; // heartrate
var breathsPerMinute = 13; //Math.floor(beatsPerMinute / 5); // breathing rate per minute
var timePerBreath = (60000 / breathsPerMinute);
var timePerPulse = (60000 / beatsPerMinute);
var delay = Math.floor(timePerBreath / breathingSequence.length);
var delayPerPulse1 = timePerPulse / 15;
var delayPerPulse2 = timePerPulse / 60;
var delayPerPulse3 = timePerPulse / 15;
var currentColor = {
    h: 23,
    s: 70,
    l: 40,
    a: 0 //min opacity that the mainBreather could have
};
var saturation = currentColor.s;
var lightness = currentColor.l;
var opacity = currentColor.a;
var opacitySequence = [];
var saturationSequence = [];
<<<<<<< HEAD
var dof;
if (!dof) dof = 3;
var breathScale = dof; //changes between 0 to 10
=======
//var breathScale = dof; //changes between 0 to 10
>>>>>>> 77c0f4ec6fbefe56ff29124fcc27cd1cbf58746d
var pulseScale = 0.5;

function makeOpacitySequence(dof) {
    if (!dof) dof = 1;
    for (var i = 0; i < breathingSequence.length; i++) {
        opacity = opacity + (breathingSequence[i] / 100) * (dof / 10);
        opacitySequence[i] = opacity;
    }
}

$(function() {
    $('.slider').on('input', function() {
        $("#dof").html(this.value);
    });
});

$(function() {
    $('.slider').on('change', function() {
<<<<<<< HEAD
        dof = this.value;
        makeOpacitySequence()
        $.getScript("./flow.js");
        console.log(dof);
=======
        var dof = Number(this.value);
        makeOpacitySequence(dof);
        //$.getScript("./flow.js");
        //breathe();
>>>>>>> 77c0f4ec6fbefe56ff29124fcc27cd1cbf58746d
    });
});

function breathe(curdex) {
    if (!curdex) curdex = 0;
    if (curdex >= breathingSequence.length) { curdex = 0; }
    var opac = opacitySequence[curdex];
    currentColor.a = opac;
    var hslaString = 'hsla(' +
        currentColor.h + ', ' +
        currentColor.s + '%,' +
        currentColor.l + '%,' +
        currentColor.a + ')';
    $('#mainBreather').css('background-color', hslaString);
    curdex++;
    setTimeout(function() {
        breathe(curdex);
    }, delay);
}

//below is the code for heartBeat

function makesaturationSequence() {
    var i;
    for (i = 0; i < 30; i++) {
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
        currentColor.s = sat;
        var hslaString = 'hsla(' +
            currentColor.h + ', ' +
            currentColor.s + '%,' +
            currentColor.l + '%,' +
            currentColor.a + ')';
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