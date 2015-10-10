$(document).ready(
    function(){
		$("#load").click(function (event) {
			var map_output = "";
			var mapcode = $("#mapcode").val();
		    var mapcode_split = mapcode.split(", ");
		    for (var i = mapcode_split.length - 1; i >= 0; i--) {
		 	console.log("split nr " + i + " ->" + mapcode_split[i]);
		    	var map_tile_class = decode(mapcode_split[i]);
		    	console.log(map_tile_class + " <- type, nummer ->" + mapcode_split[i]);
		    	map_output = "<div class=\"" + map_tile_class + "\" type=\"" + mapcode_split[i] + "\"></div>" + map_output;
		    	if (i%15 == 0) {
		    		map_output += "\n";
		    	};
		    };
		    $("#map_maker").html(map_output);
		});
});

function decode (nummer) {
	return $( "#tiles_decode > div[type='" + nummer + "']" ).attr('class');
}