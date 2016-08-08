;(function ($, obj, myTutor) {
	$(document).ready(function () {
	    $('.date').datepicker({
	        format: "yyyy-mm-dd",
	        language: myTutor.language.cultureKey,
	        pickerPosition: "bottom-left",
	        autoclose: true
	    });
	    $('.datetime').datetimepicker({
	        format: "yyyy-mm-dd hh:ii:ss",
	        language: myTutor.language.cultureKey,
	        pickerPosition: "bottom-left",
	        autoclose: true
	    });
	});
})(jQuery, window, window.myTutor);