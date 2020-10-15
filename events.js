/// There is all function for buttons and gui

function updateAll(fastUp){
	if(detailShow && shd % SHD == 0){
		showDetails(detailShow);
		shd = 0;
	}
	for(let k=0; k<=fastUp; k++){
		optim++;
		for(let i=0; i<allPlanets.length; i++){
			allPlanets[i].update();
		}
		if(centerPlanet){
			centerPlanet.center();	
		}
	}
	shd++;
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
var createStarBtn = document.getElementById('btn_create_star');
var gameDiv = document.getElementById('container');
var createPlanet = document.getElementById('create_planet');
var planetName = document.getElementById('name');
var planetMass = document.getElementById('mass');
var planetDiameter = document.getElementById('diameter'); 
var planetColor = document.getElementById('color_input');
var Done = document.getElementById('done');
var shinePlanet = document.getElementById('shine');
var finishedDiv = document.getElementById('finished');
var finishedBtn = document.getElementById('btn_finished');
var startSim = document.getElementById('start_sim');
var cancleBtn = document.getElementById('cancle');



var last = -1;			/// planets that are created
var shineObj = false;

// while(true){
// 	console.log(planetColor);
// }

btnMeni.addEventListener('click', showMeni);
gameDiv.addEventListener('click', hideMeni);
createBtn.addEventListener('click', create);
createStarBtn.addEventListener('click', createStar);
Done.addEventListener('click', makePlanet);
finishedBtn.addEventListener('click', showFinished);
cancleBtn.addEventListener('click', canclePlanet);


function showMeni(){
	if(!pause){
		meniDiv.style.display = 'flex';
		btnMeni.style.display = 'none';
		startSim.style.display = 'none';
		pauseGame = false;					/// disable pausing game
	}
	else{
		alert('Game must be paused for this action!');
	}
}

function showFinished(){
	// console.log(1245);
	meniDiv.style.display = 'none';
	finishedDiv.style.display = 'flex';
}

function hideMeni(){
	last = -1;
	if(meniDiv.style.display == 'flex'){
		meniDiv.style.display = 'none';
	}
	if(btnMeni.style.display == 'none')
	{
		btnMeni.style.display = 'block';
		pauseGame = true;
	}

	if(createPlanet.style.display == 'block')
		createPlanet.style.display = 'none';
}

function create(){
	createPlanet.style.display = 'block';
	meniDiv.style.display = 'none';
	shineObj = false;
}

function createStar(){
	createPlanet.style.display = 'block';
	meniDiv.style.display = 'none';
	shineObj = true;
}


function makePlanet(){
	// console.log(shinePlanet.checked);
	if(verify()){
		allPlanets.push(new Planet(planetName.value,planetDiameter.value,planetMass.value));

		last = allPlanets.length - 1;
		// console.log(planetName.value);
		allPlanets[last].colour(planetColor.value,0.5);
		allPlanets[last].move(0,0,0,0);
		
		if(shineObj){
			glowingPlanets.push(allPlanets[last]);
		}

		planetName.value = '';
		planetDiameter.value = '';
		planetMass.value = '';
		planetColor.value = '#000000';
		planetName.value = '';
		createPlanet.style.display = 'none';
		btnMeni.style.display = 'block';
		pauseGame = true;
	}
}

function canclePlanet(){				/// delete information when cancle btn is pressed
		planetName.value = '';
		planetDiameter.value = '';
		planetMass.value = '';
		planetColor.value = '#000000';
		planetName.value = '';
		createPlanet.style.display = 'none';
		btnMeni.style.display = 'block';
		pauseGame = true;

}

function verify(){
	if(planetName.value == ''){
		alert('You must enter a name!');
		return false;
	}
	else if(planetName.value.length > 20){
		alert('Name must be under 20 characters!');
		return false;
	}
	else if(Number(planetMass.value) != planetMass.value || Number(planetMass.value) == 0){
		alert('Mass must be a number!');
		return false;
	}
	else if(Number(planetMass.value) > MAX_MASS){
		alert('Maximum mass is 10^15');
		return false;
	}
	else if(Number(planetDiameter.value) != planetDiameter.value || Number(planetDiameter.value) <= 0){
		alert('Diameter must be a positive number!');
		return false;
	}
	else if(Number(planetDiameter.value) > MAX_DIAMETER){
		alert('Maximum diameter is 10^5');
		return false;
	}
	
	return true;
}



var detailsDiv = document.getElementById('details');


function showDetails(planet){
	removeChilds(detailsDiv);
	createElementAndAppend('Name: ', planet.name);
	createElementAndAppend('Color: ', planet.a);
	createElementAndAppend('Radius: ', planet.radius);
	createElementAndAppend('Mass: ', planet.mass);
	createElementAndAppend('Velocity X: ', planet.X.toFixed(4));
	createElementAndAppend('Velocity Y: ', planet.Y.toFixed(4));

	var inTotal = Math.pow((Math.pow(planet.X,2) + Math.pow(planet.Y,2)),1.0/2.0); 
	inTotal = inTotal.toFixed(4);

	createElementAndAppend('Velocity in total: ', inTotal);

	updateDetails = true;
}


function createElementAndAppend(text,add){
	var detailClass = document.createElement('div');
	detailClass.className = 'det_class';
	detailClass.innerHTML = text + add;
	detailsDiv.appendChild(detailClass);
}

function hideDetails(){
	removeChilds(detailsDiv);
}

function removeChilds(parent){
	while(parent.firstChild){
		parent.removeChild(parent.firstChild);
	}
}



//// There goes all finished systems:
var solarSys = document.getElementById('solar_sys');
solarSys.addEventListener('click', addSolarSys);
///


function addSolarSys(){
	sunce = new Planet('Sun',500,90000);		
	sunce.move(0,0,0,0);
	
	merkur = new Planet('Mercury',50,100);
	merkur.move(1200,0,0,9);
	
	venera = new Planet('Venus',70,200);		
	venera.move(3000,0,0,5.5);
	
	zemlja = new Planet('Earth',80,1500);
	zemlja.move(5000,0,0,-4.3);
	
	mesec = new Planet('Moon',30,0.1);
	mesec.move(5200,-40,-1,-6);
	
	mars = new Planet('Mars',60,150);		
	mars.move(7000,0,0,-3.8);

	jupiter = new Planet('Jupiter',200,2000);
	jupiter.move(10000,0,0,3.3);

	saturn = new Planet('Saturn',150,1000);		
	saturn.move(18000,0,0,-2.5);

	uran = new Planet('Uranus',120,800);		
	uran.move(25000,0,0,-2.1);

	neptun = new Planet('Neptune',100,500);		
	neptun.move(31000,0,0,2);

	sunce.colour('#ffea00', 0.5);
	merkur.colour('#8a5700', 0.5);
	venera.colour('#c77e00', 0.5 );
	mesec.colour('#adb0b8', 0.5 );
	zemlja.colour('#3066fc', 0.5 );
	mars.colour('#e39400', 0.5 );
	jupiter.colour('#bfa36f', 0.5 );
	saturn.colour('#c9ad77', 0.5 );
	uran.colour('#40ffff', 0.5 );
	neptun.colour('#9099f5', 0.5 );

	allPlanets = [sunce,merkur,venera,zemlja,mesec,mars,jupiter,saturn,uran,neptun];
	glowingPlanets = [sunce];

	finishedDiv.style.display = 'none';
	btnMeni.style.display = 'block';
	pauseGame = true;
}