var container_width = document.getElementById("container").offsetWidth;
var container_height = document.getElementById("container").offsetHeight;

const G = 1;
const M = 1;    			///Multiplayer
const THICKNES = 0.2;		/// Thicknes of trail
const HISTORY = 10;		/// How long is trail


var ZOOM = 0.1;			
var locked = false;
var screen_x = 0;
var screen_y = 0;
var pause = true;			/// Pause the game


//Planet(diameter, mass);
//Planet.move(x, y, x.Velocity, y.Velocity);

sunce = new Planet(200,90000);		
sunce.move(0,0,0,0);
zemlja = new Planet(80,800);
zemlja.move(2000,0,0,7.5);
merkur = new Planet(50,10);
merkur.move(0,-1000,8.2,0);
mesec = new Planet(30,0.1);
mesec.move(2200,0,0,9);
jupiter = new Planet(100,2000);
jupiter.move(-5000,0,0,-4);


var allPlanets;


allPlanets = [sunce,zemlja,merkur,mesec,jupiter];

var cvs;

function setup(){
	cvs = createCanvas(container_width,container_height);
	cvs.parent('container');
	background(0, 2, 65);
	
}


function draw(){


	
	background(0, 2, 65);
	
	sunce.center(allPlanets);

	zooming(width, height);	

	

	sunce.update(allPlanets);
	sunce.colour(255, 247, 75);
	sunce.trail();							// First put trail and then show
	sunce.show();
	

	mesec.update(allPlanets);
	mesec.colour( 167, 180, 189 );
	mesec.trail();
	mesec.show();
	

	zemlja.update(allPlanets);
	zemlja.colour( 36, 205, 255 );
	zemlja.trail();
	zemlja.show();
	

	merkur.update(allPlanets);
	merkur.colour(218, 150, 104);
	merkur.trail();
	merkur.show();
	

	jupiter.update(allPlanets);
	jupiter.colour(214, 198, 94 );
	jupiter.trail();
	jupiter.show();
	
	
}

function keyPressed(event) {							/// pausing the game
	if(pause){
		if(event.key == 'p' || event.key == 'P'){
			pause = false;
		}
	}
	else{
		if(event.key == 'p' || event.key == 'P'){
			pause = true;
		}
	}
	
}



function mouseDragged(event){
	screen_x = event.movementX;
	screen_y = event.movementY;
	if(locked){
		for(let i=0; i<allPlanets.length; i++){
			allPlanets[i].x += screen_x/ZOOM;
			allPlanets[i].y += screen_y/ZOOM;
			for(let j=0; j<allPlanets[i].array.length; j++){
				allPlanets[i].array[j].x += screen_x/ZOOM;
				allPlanets[i].array[j].y += screen_y/ZOOM;
			}
			
		}
	}
}


function mousePressed(){
	locked = true;
}

function mouseReleased() {
  locked = false;
}


function mouseWheel(event){
	if(event.delta > 0){
		ZOOM *= 1.1;
	}
	else{
		ZOOM *= 0.9;
	}
}