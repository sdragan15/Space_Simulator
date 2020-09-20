var container_width = document.getElementById("container").offsetWidth;
var container_height = document.getElementById("container").offsetHeight;

const G = 0.01;

sunce = new Planet(70,7000);
sunce.move(0,0,0,0);
zemlja = new Planet(30,200);
zemlja.move(200,0,0,10);
merkur = new Planet(20,10);
merkur.move(0,-100,8,0);
mesec = new Planet(10,1);
mesec.move(220,0,0,11.3);
jupiter = new Planet(50,800);
jupiter.move(-500,0,0,-10);

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

	translate(width/2, height/2);

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

// console.log(14);