var container_width = document.getElementById("container").offsetWidth;
var container_height = document.getElementById("container").offsetHeight;

const G = 1;
const M = 1;    			///Multiplicator
const THICKNES = 0.2;		/// Thicknes of trail
const HISTORY = 100;		/// How long is trail
const N_TIME = 2;		/// What is normal time
const NUM_MOVE = -1;		/// Zero planet for moving
const VELOCITY_CHANGE = 100;	/// how much velocity will change with mouse
const PREDICTION = 1000;			/// prediction of moving
const fr = 30;					/// framerate

var fastUp = 2;					/// how fast up you want, 2 is normal
var ZOOM = 0.1;			
var locked = false;
var screen_x = 0;
var screen_y = 0;
var pause = false;			/// Pause the game
var numMove = NUM_MOVE;			/// Number of planets you want to move
var changeVelocity = false;		/// Change velocity of planets with mouse
var saveX;
var saveY;						/// save position of planets before changing velocity
var optim = 1;				/// for optimize trail



//Planet(diameter, mass);
//Planet.move(x, y, x.Velocity, y.Velocity);

sunce = new Planet(200,90000);		
sunce.move(0,0,0,0);
zemlja = new Planet(80,1500);
zemlja.move(1000,0,0,-10);
merkur = new Planet(50,10);
merkur.move(500,0,0,12);
mesec = new Planet(30,0.1);
mesec.move(3400,0,-0.5,7.8);
jupiter = new Planet(100,4000);
jupiter.move(3000,0,0,5);


var allPlanets;

var centerPlanet;				/// what is center planet
var glowingPlanets = [];		/// glowing planets

allPlanets = [sunce,zemlja,merkur,mesec,jupiter];
glowingPlanets = [sunce];

var cvs;
var backImage;
var earth;

var imgW;
var imgH;		/// background width and height

function preload(){
	backImage = loadImage('http://127.0.0.1:8887/skyBack.png');
	earth = loadImage('http://127.0.0.1:8887/earth.png');

	imgW = (backImage.width - container_width);
	imgH = (backImage.height - container_height);
}
// console.log(backImage);

function setup(){
	cvs = createCanvas(container_width,container_height, WEBGL);
	cvs.parent('container');
	background(0, 0, 0);
	frameRate(fr);
	
}


function draw(){

	// console.log(frameRate()); 

	image(backImage,imgW,imgH);
	
	// background(0, 1, 43);
	
	ambientLight(40,40,40);

	for(let i=0; i<glowingPlanets.length; i++){
		pointLight(255,255,255,glowingPlanets[i].x*ZOOM,glowingPlanets[i].y*ZOOM, 0);

	}
	
	zooming(width, height);	

	updateAll(fastUp);

	
	sunce.colour(255, 247, 75, 0.5);
	// sunce.trail();							// First put trail and then show
	sunce.show();
	sunce.showPrediction();
	

	
	mesec.colour( 167, 180, 189, 0.5 );
	// mesec.trail();
	mesec.show();
	mesec.showPrediction();
	

	
	zemlja.colour( 36, 205, 255, 0.5 );
	// zemlja.trail();
	zemlja.show();
	zemlja.showPrediction();
	

	
	merkur.colour(218, 150, 104, 0.5);
	merkur.trail();
	merkur.show();
	merkur.showPrediction();
	

	
	jupiter.colour(214, 198, 94, 0.5 );
	// jupiter.trail();
	jupiter.show();
	jupiter.showPrediction();

}





function keyPressed(event) {	
	if(event.key == 'Control'){					/// Changing velocity of planets with mouse
		changeVelocity = true;
		// console.log(121);
	}	


	if(event.key == 's' || event.key == 'S'){			///slow down time
		if(fastUp >=1){
			fastUp--;
		}// console.log(time);
	}
	else if(event.key == 'f' || event.key == 'F'){
		fastUp++;
	}


	if(event.key == 'n' || event.key == 'N'){			/// reset time
		fastUp = N_TIME;
	}


	if(pause){
		if(event.key == 'p' || event.key == 'P'){			/// pausing the game
			pause = false;							/// stop
		}
	}
	else{
		if(event.key == 'p' || event.key == 'P'){
			pause = true;							/// start
			for(let i=0; i<allPlanets.length; i++){
				allPlanets[i].predArray = [];
			}
		}
	}
	
}

function keyReleased(){
	if(event.key == 'Control'){					/// Changing velocity of plantes with mouse
		changeVelocity = false;		
	}
}



function mouseDragged(event){
	screen_x = event.movementX;
	screen_y = event.movementY;
	if(changeVelocity){
		if(numMove != NUM_MOVE){									/// Changing velocity of planets
			allPlanets[numMove].X += event.movementX/(ZOOM*VELOCITY_CHANGE);
			allPlanets[numMove].Y += event.movementY/(ZOOM*VELOCITY_CHANGE);
			allPlanets[numMove].calculPrediction(centerPlanet);
		}
	}
	else{
		if(locked && numMove == NUM_MOVE){
			for(let i=0; i<allPlanets.length; i++){
				allPlanets[i].x += screen_x/ZOOM;
				allPlanets[i].y += screen_y/ZOOM;
				for(let j=0; j<allPlanets[i].array.length; j++){
					allPlanets[i].array[j].x += screen_x/ZOOM;
					allPlanets[i].array[j].y += screen_y/ZOOM;
				}

				for(let j=0; j<allPlanets[i].predArray.length; j++){
					allPlanets[i].predArray[j].x += screen_x/ZOOM;
					allPlanets[i].predArray[j].y += screen_y/ZOOM;
				}
				
				imgW += screen_x/(ZOOM*5000);
				imgH += screen_y/(ZOOM*5000);
			}
		}

		if(numMove != NUM_MOVE){
			allPlanets[numMove].x += event.movementX/ZOOM;
			allPlanets[numMove].y += event.movementY/ZOOM;
			// console.log(ZOOM);
		}
	}
	
}


function mousePressed(){
	if(event.button == 0){
		locked = true;						/// For moving screen


		if(!pause){							/// For moving planets around
			for(let i=0; i<allPlanets.length; i++){
				let absolutePositionX = allPlanets[i].x*ZOOM - (event.x - width/2);
				let absolutePositionY = allPlanets[i].y*ZOOM - (event.y - height/2);
				if(abs(absolutePositionX) < allPlanets[i].radius/2*ZOOM && abs(absolutePositionY) < allPlanets[i].radius/2*ZOOM){
					numMove = i;
					saveX = allPlanets[i].x;
					saveY = allPlanets[i].y;
					// console.log(numMove);
					if(changeVelocity){
						allPlanets[i].X = 0;
						allPlanets[i].Y = 0;
					}
				}
			}

		}
	}
	
}

function doubleClicked(){
	for(let i=0; i<allPlanets.length; i++){			
		let absolutePositionX = allPlanets[i].x*ZOOM - (event.x - width/2);
		let absolutePositionY = allPlanets[i].y*ZOOM - (event.y - height/2);
		if(abs(absolutePositionX) < allPlanets[i].radius/2*ZOOM && abs(absolutePositionY) < allPlanets[i].radius/2*ZOOM){
			centerPlanet = allPlanets[i];
			for(let j=0; j<allPlanets.length; j++){
				allPlanets[j].array = [];
			}

			return;
		}
	
	}
}

function mouseReleased() {
  locked = false;
  
  numMove = NUM_MOVE;
}


function mouseWheel(event){
	if(event.delta > 0){
		ZOOM *= 1.1;
	}
	else{
		ZOOM *= 0.9;
	}
}