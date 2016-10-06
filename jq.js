$(Document).ready(function() {
    $(function() {

        chrome.storage.local.get("heart", function(object) {
            heart = object.heart;
            doHeartbeat();
            if (heart == true) {
                $('.heart').addClass('is-beating');
            } else {
                $('.heart').removeClass('is-beating');
            }
        })

        chrome.storage.local.get("bpm", function(object) {
            if (!flowMode.bpm) flowMode.bpm = 13;
            flowMode.bpm = object.bpm;
            $("#bpm").html("BREATH PER MIN: " + flowMode.bpm);
            $("#s2").val(flowMode.bpm);
            getDelay(flowMode.bpm)
        })

        chrome.storage.local.get("dob", function(object) {
            if (!flowMode.dob) flowMode.dob = 7;
            flowMode.dob = object.dob;
            $("#dob").html("VISIBILITY");
            $("#s1").val(flowMode.dob);
            makeOpacitySequence(flowMode.dob);
        })

        $('#s1').on('input', function() {
            var dob = Number(this.value);
            $("#dob").html("VISIBILITY");

        })

        $('#s1').on('change', function() {
            var dob = Number(this.value);
            chrome.storage.local.set({ 'dob': dob }, function() {
                makeOpacitySequence(dob);
            })
        });

        $('#s2').on('input', function() {
            var bpm = Number(this.value);
            $("#bpm").html("BREATH PER MIN: " + (this.value));
            chrome.storage.local.set({ 'bpm': bpm }, function() {
                delay = Math.floor((60000 / bpm) / breathingSequence.length);
            })
        })

        $('.heart').on('click', function() {
            if (heart == true) {
                chrome.storage.local.set({ 'heart': false }, function() {
                    $('.heart').removeClass('is-beating');
                    heart = false;
                })
            } else {
                chrome.storage.local.set({ 'heart': true }, function() {
                    $('.heart').addClass('is-beating');
                    heart = true;
                })
            }

        })
    })
});