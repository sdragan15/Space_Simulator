var container_width = document.getElementById("container").offsetWidth;
var container_height = document.getElementById("container").offsetHeight;

const G = 1;
const M = 1;    			///Multiplicator
const THICKNES = 0.2;		/// Thicknes of trail
const HISTORY = 100;		/// How long is trail
const N_TIME = 1;		/// What is normal time
const TIME_FASTEN = 1;		/// How fast time is changing
const NUM_MOVE = -1;		/// Zero planet for moving
const VELOCITY_CHANGE = 100;	/// how much velocity will change with mouse
const PREDICTION = 1000;			/// prediction of moving


var ZOOM = 0.1;			
var locked = false;
var screen_x = 0;
var screen_y = 0;
var pause = false;			/// Pause the game
var time = N_TIME;				/// slow down time
var t = time;				/// for time
var numMove = NUM_MOVE;			/// Number of planets you want to move
var changeVelocity = false;		/// Change velocity of planets with mouse
var saveX;
var saveY;						/// save position of planets before changing velocity


//Planet(diameter, mass);
//Planet.move(x, y, x.Velocity, y.Velocity);

sunce = new Planet(200,90000);		
sunce.move(0,0,0,0);
zemlja = new Planet(80,800);
zemlja.move(1000,0,0,0);
merkur = new Planet(50,10);
merkur.move(500,0,0,0);
mesec = new Planet(30,0.1);
mesec.move(1200,0,0,0);
jupiter = new Planet(100,2000);
jupiter.move(3000,0,0,0);


var allPlanets;

var centerPlanet = sunce;				/// what is center planet

allPlanets = [sunce,zemlja,merkur,mesec,jupiter];

var cvs;

function setup(){
	cvs = createCanvas(container_width,container_height);
	cvs.parent('container');
	background(0, 1, 43);
	
}



function draw(){
	
	background(0, 1, 43);
	
	centerPlanet.center();

	zooming(width, height);	

	

	sunce.update();
	sunce.colour(255, 247, 75);
	sunce.trail();							// First put trail and then show
	sunce.show();
	sunce.showPrediction();
	

	mesec.update();
	mesec.colour( 167, 180, 189 );
	mesec.trail();
	mesec.show();
	mesec.showPrediction();
	

	zemlja.update();
	zemlja.colour( 36, 205, 255 );
	zemlja.trail();
	zemlja.show();
	zemlja.showPrediction();
	

	merkur.update();
	merkur.colour(218, 150, 104);
	merkur.trail();
	merkur.show();
	merkur.showPrediction();
	

	jupiter.update();
	jupiter.colour(214, 198, 94 );
	jupiter.trail();
	jupiter.show();
	jupiter.showPrediction();

	t--;
	if(t < N_TIME){
		t =	time;
	}
	
	
}

function keyPressed(event) {	
	if(event.key == 'Control'){					/// Changing velocity of planets with mouse
		changeVelocity = true;
		// console.log(121);
	}	


	if(event.key == 's' || event.key == 'S'){			///slow down time
		time += TIME_FASTEN;
		// console.log(time);
	}
	else if(event.key == 'f' || event.key == 'F'){
		if(time > N_TIME){
			time -= TIME_FASTEN;
		}
	}


	if(event.key == 'n' || event.key == 'N'){			/// reset time
		time = N_TIME;
	}


	if(pause){
		if(event.key == 'p' || event.key == 'P'){			/// pausing the game
			pause = false;
		}
	}
	else{
		if(event.key == 'p' || event.key == 'P'){
			pause = true;
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

function mouseReleased() {
  locked = false;
  if(numMove != -1){						/// delete predictions
  	allPlanets[numMove].predArray = [];
  }
  
  
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