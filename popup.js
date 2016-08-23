$(function() {
    $('.slider').on('input', function() {
        $("#dof").html(this.value);
    });
});

var myval = $(function() {
    $('.slider').on('change', function() {
        myval = this.value;
    });
});