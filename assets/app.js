var container_width = document.getElementById("container").offsetWidth;
var container_height = document.getElementById("container").offsetHeight;

const G = 1;
const M = 1;    			///Multiplicator
const N_TIME = 2;		/// What is normal time
const NUM_MOVE = -1;		/// Zero planet for moving
const VELOCITY_CHANGE = 100;	/// how much velocity will change with mouse
const PREDICTION = 1000;			/// prediction of moving
const fr = 30;					/// framerate
const OPTIMIZATION = 5;			/// optimization tails
const SHD = 20;					/// FPS for details show (shd = show details)
const THICKNESS = 0.5;			/// thicness of trail
const MAX_MASS = 1000000000000000;
const MAX_DIAMETER = 100000;

var fastUp = 2;					/// how fast up you want, 2 is normal
var ZOOM = 0.1;			
var locked = false;
var screen_x = 0;
var screen_y = 0;
var pause = false;			/// Pause the game
var numMove = NUM_MOVE;			/// Number of planet you want to move
var changeVelocity = false;		/// Change velocity of planets with mouse
var saveX;
var saveY;						/// save position of planets before changing velocity
var optim = 0;				/// for optimization tail
var dragged = false;		/// if mouse is dragged
var updateDetails = false;	
var detailShow = false;				/// to show details in update
var shd = 0;				/// calculate fps for details Show
var pauseGame = true;		/// enable pause game
var thicness;		/// Thicknes of trail
var trailHistory = trailSlider.value;		/// length of trail		
var lastClickedPlanet = -1;			///last clicked planet
var movePlanets = true;			/// is it allowed to move planets
var saveString = []; 			/// saved data to json
var timer = 0;					//// timer
var saveInterval = 10000;		///	save game on every x milisecunds


//Planet(diameter, mass);
//Planet.move(x, y, x.Velocity, y.Velocity);


var allPlanets = [];

var centerPlanet;				/// what is center planet
var glowingPlanets = [];		/// glowing planets



var cvs;
var backImage;
var earth;

var imgW;
var imgH;		/// background width and height

function preload(){

	reloadSave();
	ambientSong = new Audio('http://127.0.0.1:8887/ambient.mp3');
	font = loadFont('http://127.0.0.1:8887/OpenSans-Regular.ttf');
	backImage = loadImage('http://127.0.0.1:8887/skyBack.png');
	earth = loadImage('http://127.0.0.1:8887/earth.png');

	// font = loadFont('fonts/OpenSans-Regular.ttf');
	// backImage = loadImage('images/skyBack.png');			/// for net probe
	// earth = loadImage('images/earth.png');
	// ambientSong = new Audio('music/ambient.mp3');

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

	// console.log(trailSlider.value); 

	image(backImage,imgW,imgH);
	
	// background(0, 1, 43);
	
	ambientLight(40,40,40);

	for(let i=0; i<glowingPlanets.length; i++){
		pointLight(255,255,255,glowingPlanets[i].x*ZOOM,glowingPlanets[i].y*ZOOM, 0);

	}
	
	zooming(width, height);	

	updateAll(fastUp);

	if(last != -1){
		allPlanets[last].x = ((mouseX - width/2)/ZOOM);
		allPlanets[last].y = ((mouseY - height/2)/ZOOM);
	}

	for(let i=0; i<allPlanets.length; i++){
		if(allPlanets[i] != centerPlanet){
			allPlanets[i].trail();
		}
		allPlanets[i].show();
		allPlanets[i].showPrediction();
		// console.log(optim);
	}
	

	mousePossition();


	updateSlider();	   /// change value of slider

	// console.log(detailShow);

	if(millis() >= saveInterval + timer){
		timer = millis();
		autoSave();
		console.log('saved');
	}

}





function keyPressed(event) {
	if(event.key == 'Control'){					/// Changing velocity of planets with mouse
		changeVelocity = true;
		// console.log(121);
	}	


	if(event.key == 's' || event.key == 'S'){			///slow down time
		if(fastUp >= 1){
			fastUp /= 2;
		}// console.log(time);
	}
	else if(event.key == 'f' || event.key == 'F'){
		fastUp *= 2;
	}


	if(event.key == 'n' || event.key == 'N'){			/// reset time
		fastUp = N_TIME;
	}


	if(pause){
		if((event.key == 'p' || event.key == 'P') && pauseGame){			/// pausing the game
			pause = false;							/// stop
		}
	}
	else{
		if((event.key == 'p' || event.key == 'P') && pauseGame){
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
	if(movePlanets){
		dragged = true;

		screen_x = event.movementX;
		screen_y = event.movementY;
		if(changeVelocity){
			if(numMove != NUM_MOVE){									/// Changing velocity of planets
				allPlanets[numMove].X += event.movementX/(ZOOM*VELOCITY_CHANGE);
				allPlanets[numMove].Y += event.movementY/(ZOOM*VELOCITY_CHANGE);
				allPlanets[numMove].calculPrediction(centerPlanet);
				showDetails(allPlanets[numMove]);
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
					
					imgW += screen_x/(ZOOM*100000);
					imgH += screen_y/(ZOOM*100000);
				}
			}

			if(numMove != NUM_MOVE){
				allPlanets[numMove].x += event.movementX/ZOOM;
				allPlanets[numMove].y += event.movementY/ZOOM;
				// console.log(ZOOM);
			}
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
				if(mouseOnPlanet(absolutePositionX,absolutePositionY,allPlanets[i].radius)){
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

	for(let i=0; i<allPlanets.length; i++){
		let absolutePositionX = allPlanets[i].x*ZOOM - (event.x - width/2);
		let absolutePositionY = allPlanets[i].y*ZOOM - (event.y - height/2);
		if(mouseOnPlanet(absolutePositionX,absolutePositionY,allPlanets[i].radius)){
			showDetails(allPlanets[i]);
			detailShow = allPlanets[i];			/// last clicked planet
			lastClickedPlanet = allPlanets[i];
			document.getElementById('delete_btn').style.color = 'black';
			break;
		}
	}
	
}

function mouseOnPlanet(absX, absY, planetR){
	if(abs(absX) < planetR/2*ZOOM && abs(absY) < planetR/2*ZOOM){
		return true;
	}
	else return false;
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

	let br = 0;
  for(let i=0; i<allPlanets.length; i++){			/// show details and hide it when clicked on background
  		
		let absolutePositionX = allPlanets[i].x*ZOOM - (event.x - width/2);
		let absolutePositionY = allPlanets[i].y*ZOOM - (event.y - height/2);
		if(!mouseOnPlanet(absolutePositionX,absolutePositionY,allPlanets[i].radius)){
			br++;	
		}	
	}
	if(br == allPlanets.length && !dragged){
		hideDetails();
		detailShow = false;
	}
	br = 0;
	dragged = false;
}


function mouseWheel(event){
	if(event.delta > 0){
		ZOOM *= 1.1;
	}
	else{
		ZOOM *= 0.9;
	}
}