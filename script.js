//USE GOOGLE CHROME TO TEST THIS PROGRAM
//Also for the testcase i didnt change the location of prize, goal, and hazard
//just for you to check to see if it works just do as i follow since my chart does not works
//down, right, down, down and refresh the page and down down down down right down for the another test case.
//if you cant get it to work then i will show it to you on thursday. Thank You!!

$(document).ready(function(){
// Player object
// The CurrentLoc is a starting location with the name S
var player = {
	name : "S" ,
	hitPoint: 20,
	Goal: false,	
	CurrentLoc : {x: 0, y: 0},
	price: []
}

//creates the array for the rows
var mapArray = [];

for(var row = 0; row < 8; row++){
	mapArray[row] = [];
	for(var column = 0; column < 8; column++){
		mapArray[row][column] = {};
	}
}

var table = document.createElement("table");
for(var i = 0; i < 8; i++){
	var row = document.createElement("tr");
	for(var j = 0; j < 8; j++){
		var element = document.createElement("td");
		element.className = "apple";
		element.innerHTML = mapArray[i][j];
		row.appendChild(element);
	}
	table.appendChild(row);
}
document.body.appendChild(table);

// Creating location of Hazard at this location
mapArray[1][4] = {
	nameHazard: "PoisonGas",
	runHazard: function() {
	player.hitPoint -= 10;
	}
}
mapArray[1][5] = {
	nameHazard: "Spike",
	runHazard: function() {
	player.hitPoint -= 10;
	}
}

// Wall at this location
mapArray[1][0] = {
	nameWall: "Wall"
}

// Price at this location
mapArray[1][1] = {
	namePrice: "PriceOne",
	price : function(){
	player.price.push("P");
	}
}
mapArray[1][2] = {
	namePrice: "PriceTwo",
	price : function(){
	player.price.push("P");
	}
}

// Goal With this location
mapArray[1][3] = { 
	nameGoal : "G",
	runToGoal : function(){
	player.Goal = true;
	}
}


document.getElementById("yes").disabled = true;
document.getElementById("no").disabled = true;

// this will disable all the buttons
function disable(){
	document.getElementById("up").disabled = true;
	document.getElementById("down").disabled = true;
	document.getElementById("left").disabled = true;
	document.getElementById("right").disabled = true;
	document.getElementById("yes").disabled = true;
	document.getElementById("no").disabled = true;
};
	
//this will get the string and move to the switch statements
// Choosing the direction of the player and using the while loop to go through
// inside the while loop, it will stop when the goal and length is equal and return true but it will return false
// because of the ! so return false which it will make the while loop to stop
function move(direction){
	if(player.hitPoint > 0 && !(player.Goal && player.price.length == 2)){ 

	player.Goal = false;
	var oldx = player.CurrentLoc.x;
	var oldy = player.CurrentLoc.y;
	document.getElementById("print").innerHTML = " ";
	
		switch(direction){
			case "up":
				player.CurrentLoc.y -= 1;
				break;
			case "down":
				player.CurrentLoc.y += 1;
				break;
			case "left":
				player.CurrentLoc.x -= 1;
				break;
			case "right":
				player.CurrentLoc.x += 1; 
				break;
			case "yes":
				mapArray[player.CurrentLoc.x][player.CurrentLoc.y].runHazard();
				break;
			case "no":
				player.CurrentLoc.x = oldx;
				player.CurrentLoc.y = oldy;
		}
		
	//Handles the Goal
	if(mapArray[player.CurrentLoc.x][player.CurrentLoc.y].nameGoal){
		document.getElementById("print").innerHTML = "You have found the Goal!!!";
		mapArray[player.CurrentLoc.x][player.CurrentLoc.y].runToGoal();
		
	}
	
	//Handles the prices
	if(mapArray[player.CurrentLoc.x][player.CurrentLoc.y].namePrice){
		document.getElementById("print").innerHTML = "You have found a Prize!!!";
		mapArray[player.CurrentLoc.x][player.CurrentLoc.y].price();
		
	}
	
	//Handles the Hazard
	if(mapArray[player.CurrentLoc.x][player.CurrentLoc.y].runHazard){ //checking the existing of it 
	document.getElementById("print").innerHTML = "Would you like to face the Hazard?(Challenge?) Click YES or NO Button";
	document.getElementById("yes").disabled = false;
	document.getElementById("no").disabled = false;
	}
	
	//Handles the wall
	if(mapArray[player.CurrentLoc.x][player.CurrentLoc.y].nameWall){
		document.getElementById("print").innerHTML = "There is a wall";
			player.CurrentLoc.x = oldx;
			player.CurrentLoc.y = oldy;
	}
	
	//Print it to the page if all life is lost
	if(player.hitPoint <= 0){
		document.getElementById("hitpoint").innerHTML = "You lost all the life. Game Over!!";
		disable();
		
	}
	
	//Print it to the page if the player gain two price and one goal
	if((player.Goal && player.price.length == 2)){
		document.getElementById("win").innerHTML = "Congratulation You have won the game!!";
		disable();
	}
	
	document.getElementById("info1").innerHTML = "Player Current Location X: " + player.CurrentLoc.x
	document.getElementById("info2").innerHTML = "Player Current Location Y: " + player.CurrentLoc.y
	document.getElementById("info3").innerHTML = "Player Hitpoint: " + player.hitPoint
	document.getElementById("info4").innerHTML = "Player price: " + player.price.length
	document.getElementById("info5").innerHTML = "player Goal: " + player.Goal
	
	}
}
	$("#up").click(function(){
		move("up");
	});
		
	$("#down").click(function(){
		move("down");
	});
	
	$("#left").click(function(){
		move("left");
	});
	
	$("#right").click(function(){
		move("right");
	});
	
	$("#yes").click(function(){
		move("yes");
	});
	
	$("#no").click(function(){
		move("no");
	});
	

});
