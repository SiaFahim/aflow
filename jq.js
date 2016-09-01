$(Document).ready(function() {
    $(function() {

        $('#s1').on('input', function() {
            var dob = Number(this.value);
            $("#dob").html("VISIBILITY");

        })

        $('#s1').on('change', function() {
            var dob = Number(this.value);
            chrome.storage.sync.set({ 'dob': dob }, function() {
                makeOpacitySequence(dob);
            })
        });

        $('#s2').on('input', function() {
            var bpm = Number(this.value);
            $("#bpm").html("BREATH PER MIN: " + (this.value));
            chrome.storage.sync.set({ 'bpm': bpm }, function() {
                delay = Math.floor((60000 / bpm) / breathingSequence.length);
            })
        })

        $('#heart').on('click', function() {
            if (heart == true) {
                chrome.storage.sync.set({ 'heart': false }, function() {
                    $('#heart').src("/assets/epmtyHeart.png");
                    heart = false;
                })
            } else {
                chrome.storage.sync.set({ 'heart': true }, function() {
                    $('#heart').src("/assets/beatingHeart.png");
                    heart = true;
                })
            }

        })

        $('.heart').on('click', function() {
            if (heart == true) {
                chrome.storage.sync.set({ 'heart': false }, function() {
                    $('.heart').removeClass('is-beating');
                    heart = false;
                })
            } else {
                chrome.storage.sync.set({ 'heart': true }, function() {
                    $('.heart').addClass('is-beating');
                    heart = true;
                })
            }

        })

    })
});