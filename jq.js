$(Document).ready(function() {
    $(function() {

        $('#s5').on('input', function() {
            var dob = Number(this.value);
            $("#dob").html("depth of breath: " + (this.value));

        })

        $('#s5').on('change', function() {
            var dob = Number(this.value);
            chrome.storage.sync.set({ 'dob': dob }, function() {
                makeOpacitySequence(dob);
            })
        });

        $('#s7').on('input', function() {
            var bpm = Number(this.value);
            $("#bpm").html("breath per minute: " + (this.value));
            chrome.storage.sync.set({ 'bpm': bpm }, function() {
                delay = Math.floor((60000 / bpm) / breathingSequence.length);
            })
        })

        $('#heart').on('click', function() {
            if (heart == true) {
                chrome.storage.sync.set({ 'heart': false }, function() {
                    heart = false;
                })
            } else {
                chrome.storage.sync.set({ 'heart': true }, function() {
                    heart = true;
                })
            }

        })

    })
});