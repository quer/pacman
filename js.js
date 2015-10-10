game_start = false;
$(document).ready(function() {   
   	load_map();
});

function game() {
	game_start = true;
	$("#menu").html("");
	var score_tiles = $("#score_tiles").val();
	score_tiles = parseInt(score_tiles);
	if (score_tiles == 0) {
		var score_tiles_length = $("#the_map > div.tiles-point").length;
		$("#score_tiles").val(score_tiles_length);
	};
	$(".up").click(function (event) {
		move(0, 1, "op", "hero_up");
	});
	$(".down").click(function (event) {
		move(0, 0, "ned", "hero_down");
	});
	$(".right").click(function (event) {
	    move(1, 0, "højre", "hero_right");
	});
	$(".left").click(function (event) {
	    move(1, 1, "venstra", "hero_left");
	});
	//ghosts!
	function ghost () {
		ghost_move(random_int(), random_int(), "ghost4", 0);
		ghost_move(random_int(), random_int(), "ghost2", 0);
		ghost_move(random_int(), random_int(), "ghost3", 0);
		ghost_move(random_int(), random_int(), "ghost1", 0);
		
	}
	function random_int()
	{
	    return Math.floor(Math.random() * 2);
	}
	function ghost_move (type, way, ghost, loop) {
		//console.log("type:" + type + " way:" + way + " ghost:" + ghost + "loop: " + loop);
		++loop;
	    if (loop >= 10) {
	    	return
	    };
		var id = $("." + ghost).attr('id');
	    var id_split = id.split("_");
	    var moves = [-1,1];
	    for (var i = 2 - 1; i >= 0; i--) {
	    	for (var ii = moves.length - 1; ii >= 0; ii--) {
	    		if (i == 0) {
	    			move_id = parseInt(id_split[1]) + moves[ii];
	    			if (($("#" + id_split[0] + "_" + move_id).hasClass("tiles hero"))) {
		    			
		    			if ($("." + ghost).attr('class') == "tiles " +  ghost +" point") {
				    		$("." + ghost).removeClass("tiles " +  ghost + " point").addClass("tiles tiles-point");
					    	$("#" + id_split[0] + "_" + move_id).removeClass("tiles hero").addClass("tiles " + ghost);
					    	
				    	}else{
					    	$("." + ghost).removeClass("tiles " + ghost).addClass("tiles tiles-floor");
					    	$("#" + id_split[0] + "_" + move_id).removeClass("tiles hero").addClass("tiles " + ghost);	
				    	};
				    	$("." + ghost).attr('poss', id);
		    			lost();
		   				console.log("hero nerby form: #" + id + " to : #" + id_split[0] + "_" + move_id);
		    			return
		    		};
	    		} else {
	    			move_id = parseInt(id_split[0]) + moves[ii];
	    			if (($("#" + move_id + "_" + id_split[1]).hasClass("tiles hero"))) {
		    			
		    			if ($("." + ghost).attr('class') == "tiles " +  ghost +" point") {
				    		$("." + ghost).removeClass("tiles " +  ghost + " point").addClass("tiles tiles-point");
					    	$("#" + move_id + "_" + id_split[1]).removeClass("tiles hero").addClass("tiles " + ghost);
					    	
				    	}else{
					    	$("." + ghost).removeClass("tiles " + ghost).addClass("tiles tiles-floor");
					    	$("#" + move_id + "_" + id_split[1]).removeClass("tiles hero").addClass("tiles " + ghost);
				    	};
				    	$("." + ghost).attr('poss', id);
		    			lost();
		   				console.log("hero nerby form: #" + id + " to : #" + move_id + "_" + id_split[1]);
		    			return
		    		};
	    		};
	    	};
	    };
	    var type_text;
	    var new_move_nr;
	    if (type == 1) {
	    	if (way == 1) {
		    	new_move_nr = parseInt(id_split[1]) - 1;
		    }else{
		    	new_move_nr = parseInt(id_split[1]) + 1;
		    }
		    type_text = "#" + id_split[0] + "_" + new_move_nr;
	    }else{
	    	if (way == 1) {
		    	new_move_nr = parseInt(id_split[0]) - 1;
		    }else{
		    	new_move_nr = parseInt(id_split[0]) + 1;
		    }
		    type_text = "#" + new_move_nr + "_" + id_split[1];
	    }
	    if ($("." + ghost).hasClass(type_text)) {
	    	return ghost_move (random_int(), random_int(), ghost, loop);
	    }else if ("#" + $("." + ghost).attr('poss') == type_text) {
	    	if (loop >= 9) {

	    	}else{
	    		return ghost_move (random_int(), random_int(), ghost, loop);
	    	}
	    };
	    $("." + ghost).removeAttr("poss");
	    var new_move_block = $(type_text).attr('class');
	    if (new_move_block == "tiles tiles-floor") {
	    	if ($("." + ghost).attr('class') == "tiles " +  ghost +" point") {
	    		$("." + ghost).removeClass("tiles " +  ghost + " point").addClass("tiles tiles-point");
		    	$(type_text).removeClass("tiles tiles-floor").addClass("tiles " + ghost);
		    	
	    	}else{
		    	$("." + ghost).removeClass("tiles " + ghost).addClass("tiles tiles-floor");
		    	$(type_text).removeClass("tiles tiles-floor").addClass("tiles " + ghost);	
	    	};
	    	$("." + ghost).attr('poss', id);
	    	
	    }
	    else if (new_move_block == "tiles tiles-point") {
	    	if ($("." + ghost).attr('class') == "tiles " +  ghost +" point") {
	    		$("." + ghost).removeClass("tiles " +  ghost + " point").addClass("tiles tiles-point");
		    	$(type_text).removeClass("tiles tiles-point").addClass("tiles " + ghost + " point");
		    	
	    	}else{
		    	$("." + ghost).removeClass("tiles " + ghost).addClass("tiles tiles-floor");
	    		$(type_text).removeClass("tiles tiles-point").addClass("tiles " +  ghost + " point");	
	    	};
	    	$("." + ghost).attr('poss', id);
	    }
	    else if (new_move_block == "tiles hero") {
	    	$("." + ghost).removeClass("tiles " + ghost).addClass("tiles tiles-floor");
	    	$(type_text).attr("class", "tiles " +  ghost);
	    	lost();
	    }
	    else{
	    	return ghost_move (random_int(), random_int(), ghost, loop);
	    };
	    
	}

	$(document).ready(function() {
	   
	   looping = setInterval(ghost, 600); 
	   ghost();
	});
	console.log("always!");
	return false;
}
/*
function move (type, way, text) {
	if ($(".hero")) {
		var id = $(".hero").attr('id');
	    var id_split = id.split("_");
	    var type_text;
	    var new_move_nr;
	    if (type == 1) {
	    	if (way == 1) {
		    	new_move_nr = parseInt(id_split[1]) - 1;
		    }else{
		    	new_move_nr = parseInt(id_split[1]) + 1;
		    }
		    type_text = "#" + id_split[0] + "_" + new_move_nr;
	    }else{
	    	if (way == 1) {
		    	new_move_nr = parseInt(id_split[0]) - 1;
		    }else{
		    	new_move_nr = parseInt(id_split[0]) + 1;
		    }
		    type_text = "#" + new_move_nr + "_" + id_split[1];
	    }
	    console.log("type_text : " + type_text);
	    var new_move_block = $(type_text).attr('class');
	    console.log("new_move_block : " + new_move_block);
	    var new_move_block_ghost = $(type_text).attr('poss');
	    if (new_move_block == "tiles tiles-floor") {
	    	$(".hero").removeClass("tiles hero").addClass("tiles tiles-floor");
	    	$(type_text).removeClass("tiles tiles-floor").addClass("tiles hero");
	    	$("#error").html("du flyttede en " + text);
	    }else if (new_move_block == "tiles tiles-point") {
	    	$(".hero").removeClass("tiles hero").addClass("tiles tiles-floor");
	    	$(type_text).removeClass("tiles tiles-point").addClass("tiles hero");
	    	$("#error").html("du flyttede en " + text + " og fik 1 point");
	    	var score_input = $("#score_input").val();
			score_input = parseInt(score_input) + 1;
			$("#score").html("score: " + score_input);
			$("#score_input").val(score_input);
	    }else if (typeof new_move_block_ghost !== typeof undefined && new_move_block_ghost !== false) {
	    	$(".hero").removeClass("tiles hero").addClass("tiles tiles-floor");
			$("#error").html("du flyttede ind i et spøgelse og døde!");
			lost();
	    }
	    else{
	    	$("#error").html("du kan ikke flytte " + text);
	    };
	    score_now = $("#score_input").val();
	    score_now = parseInt(score_now);
	    score_old = $("#score_input_old").val();
	    score_old = parseInt(score_old);
	    $("#score").html("score: " + score_now);
	    score_tiles = $("#score_tiles").val();
		score_tiles = parseInt(score_tiles);
	    if (score_now == (score_tiles + score_old)) {
	    	stop_game();
	    };
    };
}
*/
//----------- new ---------
function move (type, way, text, class_way) {
	if ($(".hero")) {
		var id = $(".hero").attr('id');
	    var id_split = id.split("_");
	    var type_text;
	    var new_move_nr;
	    if (type == 1) {
	    	if (way == 1) {
		    	new_move_nr = parseInt(id_split[1]) - 1;
		    }else{
		    	new_move_nr = parseInt(id_split[1]) + 1;
		    }
		    type_text = "#" + id_split[0] + "_" + new_move_nr;
	    }else{
	    	if (way == 1) {
		    	new_move_nr = parseInt(id_split[0]) - 1;
		    }else{
		    	new_move_nr = parseInt(id_split[0]) + 1;
		    }
		    type_text = "#" + new_move_nr + "_" + id_split[1];
	    }
	    console.log("type_text : " + type_text);
	    var new_move_block = $(type_text).attr('type');
	    console.log("new_move_block : " + new_move_block);
	    var new_move_block_ghost = $(type_text).attr('poss');
	    if (typeof new_move_block_ghost !== typeof undefined && new_move_block_ghost !== false) {
	    	$(".hero").attr("class", "tiles tiles-floor");
			$("#error").html("du flyttede ind i et spøgelse og døde!");
			lost();
	    }else if (new_move_block == "19") {
	    	$(".hero").attr("type", "19");
	    	$(".hero").attr("class", "tiles tiles-floor");
	    	$(type_text).attr("class", "tiles hero " + class_way);
	    	$("#error").html("du flyttede en " + text);
	    }else if (new_move_block == "28") {
	    	$(".hero").attr("type", "19");
	    	$(".hero").attr("class", "tiles tiles-floor");
	    	$(type_text).attr("class", "tiles hero " + class_way);
	    	$("#error").html("du flyttede en " + text + " og fik 1 point");
	    	var score_input = $("#score_input").val();
			score_input = parseInt(score_input) + 1;
			$("#score").html("score: " + score_input);
			$("#score_input").val(score_input);
	    }
	    else{
	    	$("#error").html("du kan ikke flytte " + text);
	    };
	    
	    
	    score_now = $("#score_input").val();
	    score_now = parseInt(score_now);
	    score_old = $("#score_input_old").val();
	    score_old = parseInt(score_old);
	    $("#score").html("score: " + score_now);
	    score_tiles = $("#score_tiles").val();
		score_tiles = parseInt(score_tiles);
	    if (score_now == (score_tiles + score_old)) {
	    	stop_game();
	    };
    };
}
//---------- end new ------
function lost () {
	   	var score_input = $("#score_input").val();
	   	$("#menu").html("<div class=\"borard\">score: " + score_input + "<br>LOST!!<br><a href=\"#\" onclick=\"restart()\">restart</a></div>");
	   	$("#score_list").append("<div>score: " + score_input + " </div>");
	}
function restart () {
	clearInterval(looping);
	$(".ghost1").removeClass("tiles ghost1").addClass("tiles tiles-floor");
	$(".ghost2").removeClass("tiles ghost2").addClass("tiles tiles-floor");
	$(".ghost3").removeClass("tiles ghost3").addClass("tiles tiles-floor");
	$(".ghost4").removeClass("tiles ghost4").addClass("tiles tiles-floor");
	$("#score_input").val("0");
	$("#score_input_old").val("0");
	$("#score_tiles").val("0");
	$("#level").val("0");
	$("#score").html("score: 0");
	$("#error").html("");
	load_map();
}
function stop_game () {
	
	clearInterval(looping);
	$(".ghost1").removeClass("tiles ghost1").addClass("tiles tiles-floor");
	$(".ghost2").removeClass("tiles ghost2").addClass("tiles tiles-floor");
	$(".ghost3").removeClass("tiles ghost3").addClass("tiles tiles-floor");
	$(".ghost4").removeClass("tiles ghost4").addClass("tiles tiles-floor");
	var score_now = $("#score_input").val();
	$("#menu").html("<div class=\"borard\">score: " + score_now + "<br>Won!!!<br><a href=\"#\" onclick=\"load_map()\">next level</a></div>");
	var score_now = $("#score_input").val();
	$("#score_input_old").val(score_now);
	game_start = false;
	return false;
}
function load_map () {
	var map_output = "";
	var file_output = ""; 
	file_output = $.ajax({url:"map.txt", async:false}).responseText;
	var file_output_split = file_output.split("#");
	var the_level = $("#level").val();
	var next_level = parseInt(the_level) + 1;
	$("#level").val(next_level);
	
    var level_split = file_output_split[next_level].split(", ");
    var tile_nr_right = 0;
    var tile_nr_up = 0;
    for (var i = level_split.length - 1; i >= 0; i--) {
 	//console.log("split nr " + i + " ->" + level_split[i]);
    	var map_tile_class = decode(level_split[i]);
    	//console.log(map_tile_class + " <- type, nummer ->" + level_split[i]);
    	map_output = "<div id=\""+tile_nr_right+"_"+tile_nr_up+"\" class=\"" + map_tile_class + "\" type=\"" + level_split[i] + "\"></div>" + map_output;
    	tile_nr_right++;
    	if (i%15 == 0) {
    		map_output += "\n";
    		tile_nr_right = 0;
    		tile_nr_up++;
    	};
    };
    var score_now = $("#score_input").val();
    $("#the_map").html(map_output);
    var score_tiles_length = $("#the_map > div.tiles-point").length;
	$("#score_tiles").val(score_tiles_length);
    $("#menu").html("<div class=\"borard\">Pacman<br>level "+next_level+"<br><a href=\"#\" onclick=\"game()\">start</a><br>score: "+score_now+"</div>");

}
$(document).keydown(function(e) {
	if (game_start) {
	    if ( e.keyCode === 40 || e.keyCode === 83 )
	    {
	        move(1, 1, "ned", "hero_down");
	    }else if ( e.keyCode === 38 || e.keyCode === 87)
	    {
	        move(1, 0, "op", "hero_up");
	    }else if ( e.keyCode === 39 || e.keyCode === 68)
	    {
	        move(0, 1, "højre", "hero_right");
	    }else if ( e.keyCode === 37 || e.keyCode ===  65)
	    {
	        move(0, 0, "venstra", "hero_left");
	    }
    };
});
function decode (nummer) {
	switch(nummer) {
		case "1":
			output = "tiles tiles-type-2-bottom-right";
			break;
		case "2":
			output = "tiles tiles-type-2-center-down";
			break;
		case "3":
			output = "tiles tiles-type-2-bottom-left";
			break;
		case "4":
			output = "tiles tiles-type-1-bottom-right";
			break;
		case "5":
			output = "tiles tiles-type-1-center-down";
			break;
		case "6":
			output = "tiles tiles-type-1-bottom-left";
			break;
		case "7":
			output = "tiles tiles-top";
			break;
		case "8":
			output = "tiles tiles-left";
			break;
		case "9":
			output = "tiles tiles-right-center";
			break;
		case "10":
			output = "tiles tiles-right";
			break;
		case "11":
			output = "tiles tiles-type-2-center-right";
			break;
		case "12":
			output = "tiles tiles-type-2-center-center";
			break;
		case "13":
			output = "tiles tiles-type-2-center-left";
			break;
		case "14":
			output = "tiles tiles-type-1-center-right";
			break;
		case "15":
			output = "tiles tiles-type-1-center-center";
			break;
		case "16":
			output = "tiles tiles-type-1-center-left";
			break;
		case "17":
			output = "tiles tiles-top-center";
			break;
		case "18":
			output = "tiles tiles-center";
			break;
		case "19":
			output = "tiles tiles-floor";
			break;
		case "20":
			output = "tiles ghost1";
			break;
		case "21":
			output = "tiles tiles-type-2-top-right";
			break;
		case "22":
			output = "tiles tiles-type-2-center-up";
			break;
		case "23":
			output = "tiles  tiles-type-2-top-left";
			break;
		case "24":
			output = "tiles tiles-type-1-top-right";
			break;
		case "25":
			output = "tiles tiles-type-1-center-up";
			break;
		case "26":
			output = "tiles  tiles-type-1-top-left";
			break;
		case "27":
			output = "tiles tiles-bottom";
			break;
		case "28":
			output = "tiles tiles-point";
			break;
		case "30":
			output = "tiles ghost2";
			break;
		case "31":
			output = "tiles tiles-type-4-bottom-right";
			break;
		case "32":
			output = "tiles tiles-type-4-center-down";
			break;
		case "33":
			output = "tiles tiles-type-4-bottom-left";
			break;
		case "34":
			output = "tiles tiles-type-3-bottom-right";
			break;
		case "35":
			output = "tiles tiles-type-3-center-down";
			break;
		case "36":
			output = "tiles tiles-type-3-bottom-left";
			break;
		case "40":
			output = "tiles ghost3";
			break;
		case "41":
			output = "tiles tiles-type-4-center-right";
			break;
		case "42":
			output = "tiles tiles-type-4-center-center";
			break;
		case "43":
			output = "tiles tiles-type-4-center-left";
			break;
		case "44":
			output = "tiles tiles-type-3-center-right";
			break;
		case "45":
			output = "tiles tiles-type-3-center-center";
			break;
		case "46":
			output = "tiles tiles-type-3-center-left";
			break;
		case "50":
			output = "tiles ghost4";
			break;
		case "51":
			output = "tiles tiles-type-4-top-right";
			break;
		case "52":
			output = "tiles tiles-type-4-center-up";
			break;
		case "53":
			output = "tiles  tiles-type-4-top-left";
			break;
		case "54":
			output = "tiles tiles-type-3-top-right";
			break;
		case "55":
			output = "tiles tiles-type-3-center-up";
			break;
		case "56":
			output = "tiles  tiles-type-3-top-left";
			break;
		case "60":
			output = "tiles hero";
			break;
		default:
			output = "tiles tiles-floor"
	}
	return output;
}