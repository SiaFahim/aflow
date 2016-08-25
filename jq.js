$(Document).ready(function() {

    $(function() {
        $('#s1').on('input', function() {
            var hue = Number(this.value);
            $("#hue").html("color hue: " + (this.value));
            flowMode.h = hue;
        });
    });


    $(function() {
        $('#s5').on('input', function() {
            var dob = Number(this.value);
            $("#dob").html("depth of breath: " + (this.value));
            makeOpacitySequence(dob);
        });
    });

















});