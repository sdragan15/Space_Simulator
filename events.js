/// There is all function for buttons and gui

function updateAll(fastUp){
	for(let k=0; k<=fastUp; k++){
		for(let i=0; i<allPlanets.length; i++){
			allPlanets[i].update();
		}
		if(centerPlanet){
			centerPlanet.center();	
		}
	}
}

function mousePossition(){
	for(let i=0; i<allPlanets.length; i++){									/// Text of planets
		let absolutePositionX = allPlanets[i].x*ZOOM - (mouseX - width/2);
		let absolutePositionY = allPlanets[i].y*ZOOM - (mouseY - height/2);
		if(abs(absolutePositionX) < allPlanets[i].radius/2*ZOOM && abs(absolutePositionY) < allPlanets[i].radius/2*ZOOM){
		  	fill(255);
		  	textAlign(CENTER);
		  	textSize(25/ZOOM);
		  	textFont(font);
		  	text(allPlanets[i].name, allPlanets[i].x, allPlanets[i].y - allPlanets[i].radius);
		  	
		}
	}
}


var btnMeni = document.getElementById('btn_meni');
var meniDiv = document.getElementById('meni');
var createBtn = document.getElementById('btn_create');
var gameDiv = document.getElementById('container');
var createPlanet = document.getElementById('create_planet');
var planetName = document.getElementById('name');
var planetMass = document.getElementById('mass');
var planetDiameter = document.getElementById('diameter'); 
var planetColor = document.getElementById('color_input');
var Done = document.getElementById('done');

// while(true){
// 	console.log(planetColor);
// }

btnMeni.addEventListener('click', showMeni);
gameDiv.addEventListener('click', hideMeni);
createBtn.addEventListener('click', create);
Done.addEventListener('click', makePlanet);


function showMeni(){
	meniDiv.style.display = 'flex';
	btnMeni.style.display = 'none';
}

function hideMeni(){
	if(meniDiv.style.display == 'flex'){
		meniDiv.style.display = 'none';
	}
	if(btnMeni.style.display == 'none')
		btnMeni.style.display = 'block';

	if(createPlanet.style.display == 'block')
		createPlanet.style.display = 'none';
}

function create(){
	createPlanet.style.display = 'block';
	meniDiv.style.display = 'none';
}

function makePlanet(){

	allPlanets.push(new Planet(planetName.value,planetDiameter.value,planetMass.value));

	let last = allPlanets.length - 1;
	// console.log(planetName.value);
	allPlanets[last].colour(planetColor.value,0.5);
	allPlanets[last].move(0,0,0,0);
	
	console.log(allPlanets);
}