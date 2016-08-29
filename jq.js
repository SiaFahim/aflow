$(Document).ready(function() {
    $(function() {

        $('#s5').on('input', function() {
            var dob = Number(this.value);
            $("#dob").html("depth of breath: " + (this.value));
            // flowMode.dob = dob;
            // chrome.storage.sync.set({ 'dob': dob }, function() {
            //     makeOpacitySequence(dob);
            // })
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
            chrome.storage.sync.set({ 'breathRate': bpm }, function() {
                delay = Math.floor((60000 / bpm) / breathingSequence.length);
            })
        })


    })
});