$(Document).ready(function() {

    $(function() {
        // $('#s1').on('input', function() {
        //     var hue = Number(this.value);
        //     $("#hue").html("color hue: " + (this.value));
        //     flowMode.h = hue;
        // });
        // $('#s2').on('input', function() {
        //     var sat = Number(this.value);
        //     $("#sat").html("saturation: " + (this.value));
        //     flowMode.s = sat;
        // });
        // $('#s3').on('input', function() {
        //     var light = Number(this.value);
        //     $("#light").html("lightness: " + (this.value));
        //     flowMode.l = light;
        // });
        // $('#s4').on('input', function() {
        //     var opa = Number(this.value);
        //     $("#opa").html("min opacity: " + (this.value));
        //     flowMode.a = opa;
        // });
        $('#s5').on('input', function() {
            var dob = Number(this.value);
            $("#dob").html("depth of breath: " + (this.value));
            flowMode.dob = dob;
            makeOpacitySequence(dob);
        });
        // $('#s6').on('input', function() {
        //     var dop = Number(this.value);
        //     $("#dop").html("deopth of pulse: " + (this.value));
        //     makesaturationSequence(dop);
        // });
        $('#s7').on('input', function() {
            var bpm = Number(this.value);
            $("#bpm").html("breath per minute: " + (this.value));
            delay = Math.floor((60000 / bpm) / breathingSequence.length);
        });
        // $('#s8').on('input', function() {
        //     var ppm = Number(this.value);
        //     $("#ppm").html("pulse per minute: " + (this.value));
        //     flowMode.ppm = ppm;
        //});
    });
});