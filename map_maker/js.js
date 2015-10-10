$(document).ready(
    function(){
		$("#menu div").click(function (event) {
		    if ($(this).attr('type')) {
				console.log($(this).attr('class'));
    			var class_val = $(this).attr('class');
                $("#class_val").val(class_val);

				console.log($(this).attr('type'));
				var type_val = $(this).attr('type');
                $("#type_val").val(type_val);
				$("#selected-menu").html("<--  selected <span class=\"" + class_val + "\"></span>")
		    }else{
		    	console.log("nope");
		    };
		});
		$("#map_maker div").click(function (event) {
			var type_val = $("#type_val").val();
			var class_val = $("#class_val").val();
			if (type_val == "60" || type_val == "20" || type_val == "30" || type_val == "40" || type_val == "50") {
				mob(type_val);
			};
		    $(this).attr('class', class_val);
			$(this).attr('type', type_val);
		});
		var	save ="";
		$("#save").click(function (event) {
			$('#map_maker > div').each(function () {
				var type_1 = $(this).attr('type');
				save +=  ", " + type_1;
			});
		console.log(save);
		$("#output").html("output: " + save);
		save ="";
		});
});
function mob (mob_type) {
	$('#map_maker > div').each(function () {
		if ($(this).attr('type') == mob_type) {
			$(this).attr('class', "tiles floor");
			$(this).attr('type', "19");
			return true;
		}
	});
	
}