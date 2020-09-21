var container_width = document.getElementById("container").offsetWidth;
var container_height = document.getElementById("container").offsetHeight;

const G = 1;
const M = 1;    			///Multiplayer
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
jupiter = new Planet(50,80);
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
	sunce.show( 255, 247, 75 );

	mesec.update(allPlanets);
	mesec.show( 167, 180, 189 );

	zemlja.update(allPlanets);
	zemlja.show( 36, 205, 255 );

	merkur.update(allPlanets);
	merkur.show(218, 150, 104);

	jupiter.update(allPlanets);
	jupiter.show( 214, 198, 94 );

	
}

function mouseDragged(event){
	screen_x = event.movementX;
	screen_y = event.movementY;
	if(locked){
		for(let i=0; i<allPlanets.length; i++){
			allPlanets[i].x += screen_x/ZOOM;
			allPlanets[i].y += screen_y/ZOOM;
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

