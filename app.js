var container_width = document.getElementById("container").offsetWidth;
var container_height = document.getElementById("container").offsetHeight;

const G = 1;
const M = 1;    			///Multiplicator
const THICKNES = 0.2;		/// Thicknes of trail
const HISTORY = 10;		/// How long is trail
const N_TIME = 1;		/// What is normal time
const TIME_FASTEN = 1;		/// How fast time is changing
const NUM_MOVE = -1;		/// Zero planet for moving


var ZOOM = 0.1;			
var locked = false;
var screen_x = 0;
var screen_y = 0;
var pause = true;			/// Pause the game
var time = N_TIME;				/// slow down time
var t = time;				/// for time
var numMove = NUM_MOVE;			/// Number of planets you want to move
var changeVelocity = false;		/// Change velocity of planets with mouse


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
	
	// sunce.center();

	zooming(width, height);	

	

	sunce.update(time);
	sunce.colour(255, 247, 75);
	sunce.trail();							// First put trail and then show
	sunce.show();
	

	mesec.update(time);
	mesec.colour( 167, 180, 189 );
	mesec.trail();
	mesec.show();
	

	zemlja.update(time);
	zemlja.colour( 36, 205, 255 );
	zemlja.trail();
	zemlja.show();
	

	merkur.update(time);
	merkur.colour(218, 150, 104);
	merkur.trail();
	merkur.show();
	

	jupiter.update(time);
	jupiter.colour(214, 198, 94 );
	jupiter.trail();
	jupiter.show();

	t--;
	if(t < N_TIME){
		t =	time;
	}
	
	
}

function keyPressed(event) {	
	if(event.key == 'Control'){					/// Changing velocity of planets with mouse
		changeVelocity = true;
		console.log(121);
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
		if(numMove != NUM_MOVE){
			allPlanets[numMove].X += event.movementX/(ZOOM*100);
			allPlanets[numMove].Y += event.movementY/(ZOOM*100);
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
					// console.log(numMove);
				}
			}

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