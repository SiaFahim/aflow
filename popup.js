var flowDepth;

$(function(){
	$('#s1').on('input',function () {
        $("#dof").html(this.value);
        var myval = this.value;
        flowDepth = myval;   
  });
});