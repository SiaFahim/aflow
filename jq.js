$(Document).ready(function() {

    $(function() {
        $('#s1').on('input', function() {
            var hue = Number(this.value);
            $("#hue").html("color hue: " + (this.value));
            flowMode.h = hue;
        });
    });

    //    $(function() {
    //         $('#s1').on('change', function() {
    //             var setHue = Number(this.value);
    //             chrome.storage.sync.set ({'hue': setHue});
    //         });
    //     }); 

    $(function() {
        $('#s2').on('input', function() {
            var sat = Number(this.value);
            $("#sat").html("color saturation: " + (this.value));
            flowMode.s = sat;
        });
    });

    $(function() {
        $('#s3').on('input', function() {
            var light = Number(this.value);
            $("#light").html("lightness: " + (this.value));
            flowMode.l = light;
        });
    });

    $(function() {
        $('#s4').on('input', function() {
            var opa = Number(this.value);
            $("#opa").html("min opacity: " + (this.value));
            flowMode.a = opa;
        });
    });

    $(function() {
        $('#s5').on('input', function() {
            var dob = Number(this.value);
            $("#dob").html("depth of breath: " + (this.value));
            flowMode.dob = dob;
            makeOpacitySequence(dob);
        });
    });

    $(function() {
        $('#s6').on('input', function() {
            var dop = Number(this.value);
            $("#dop").html("deopth of pulse: " + (this.value));
            makesaturationSequence(dop);
        });
    });

    $(function() {
        $('#s7').on('input', function() {
            var bpm = Number(this.value);
            $("#bpm").html("breath per minute: " + (this.value));
            flowMode.bpm = bpm;
        });
    });

    $(function() {
        $('#s8').on('input', function() {
            var ppm = Number(this.value);
            $("#ppm").html("pulse per minute: " + (this.value));
            flowMode.ppm = ppm;
        });
    });
});