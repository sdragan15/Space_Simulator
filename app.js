var container_width = document.getElementById("container").offsetWidth;
var container_height = document.getElementById("container").offsetHeight;

const G = 1;
const M = 1;    			///Multiplayer
const THICKNES = 0.2;
const HISTORY = 500;


var ZOOM = 0.1;			
var locked = false;
var screen_x = 0;
var screen_y = 0;



sunce = new Planet(200,90000);
sunce.move(0,0,0,0);
zemlja = new Planet(50,800);
zemlja.move(2000,0,0,7.5);
merkur = new Planet(20,10);
merkur.move(0,-1000,8.2,0);
mesec = new Planet(10,0.1);
mesec.move(2200,0,0,9);
jupiter = new Planet(50,2000);
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
	
	// sunce.center(allPlanets);

	zooming(width, height);	

	

	sunce.update(allPlanets);
	sunce.colour(255, 247, 75);
	sunce.trail();							// First put trail and then show
	sunce.show();
	

	mesec.update(allPlanets);
	mesec.colour( 167, 180, 189 );
	mesec.show();
	mesec.trail();

	zemlja.update(allPlanets);
	zemlja.colour( 36, 205, 255 );
	zemlja.show();
	zemlja.trail();

	merkur.update(allPlanets);
	merkur.colour(218, 150, 104);
	merkur.show();
	merkur.trail();

	jupiter.update(allPlanets);
	jupiter.colour(214, 198, 94 );
	jupiter.show();
	jupiter.trail();

	
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

