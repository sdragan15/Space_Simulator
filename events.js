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