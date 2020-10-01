/// There is all function for buttons and gui

function updateAll(fastUp){
	for(let k=0; k<=fastUp; k++){
		optim++;
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
var shinePlanet = document.getElementById('shine');
var finishedDiv = document.getElementById('finished');
var finishedBtn = document.getElementById('btn_finished');
var startSim = document.getElementById('start_sim');



var last = -1;			/// planets that are created

// while(true){
// 	console.log(planetColor);
// }

btnMeni.addEventListener('click', showMeni);
gameDiv.addEventListener('click', hideMeni);
createBtn.addEventListener('click', create);
Done.addEventListener('click', makePlanet);
finishedBtn.addEventListener('click', showFinished);


function showMeni(){
	meniDiv.style.display = 'flex';
	btnMeni.style.display = 'none';
	startSim.style.display = 'none';
}

function showFinished(){
	console.log(1245);
	meniDiv.style.display = 'none';
	finishedDiv.style.display = 'flex';
}

function hideMeni(){
	last = -1;
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
	if(verify()){
		allPlanets.push(new Planet(planetName.value,planetDiameter.value,planetMass.value));

		last = allPlanets.length - 1;
		// console.log(planetName.value);
		allPlanets[last].colour(planetColor.value,0.5);
		allPlanets[last].move(0,0,0,0);
		
		if(shinePlanet.checked){
			glowingPlanets.push(allPlanets[last]);
		}

		planetName.value = '';
		planetDiameter.value = '';
		planetMass.value = '';
		planetColor.value = '#000000';
		planetName.value = '';
		createPlanet.style.display = 'none';
		btnMeni.style.display = 'block';
	}
}

function verify(){
	if(planetName.value == ''){
		alert('You must input planet name!');
		return false;
	}
	else if(Number(planetMass.value) != planetMass.value || Number(planetMass.value) == 0){
		alert('Planet mass must be a number!');
		return false;
	}
	else if(Number(planetDiameter.value) != planetDiameter.value || Number(planetDiameter.value) == 0){
		alert('Planet diameter must be a number!');
		return false;
	}
	
	return true;
}



//// There goes all finished systems:
var solarSys = document.getElementById('solar_sys');
solarSys.addEventListener('click', addSolarSys);
///


function addSolarSys(){
	sunce = new Planet('Sun',200,90000);		
	sunce.move(0,0,0,0);
	zemlja = new Planet('Earth',80,1500);
	zemlja.move(2000,0,0,-7);
	merkur = new Planet('Mercury',50,10);
	merkur.move(900,0,0,10);
	mesec = new Planet('Moon',30,0.1);
	mesec.move(2090,-40,-1,-10);
	jupiter = new Planet('Jupiter',100,4000);
	jupiter.move(5000,0,0,4);

	sunce.colour('#ffea00', 0.5);
	mesec.colour('#bcbfb6', 0.5 );
	zemlja.colour('#0080ff', 0.5 );
	merkur.colour('#ff8000', 0.5);
	jupiter.colour('#ba8900', 0.5 );

	allPlanets = [sunce,zemlja,merkur,mesec,jupiter];
	glowingPlanets = [sunce];

	finishedDiv.style.display = 'none';
	btnMeni.style.display = 'block';
}