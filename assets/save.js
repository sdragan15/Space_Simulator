
function autoSave(){
	saveString = JSON.stringify(allPlanets);
	let glowSave = JSON.stringify(glowingPlanets);

	localStorage.setItem('autosave',saveString);
	localStorage.setItem('glowsave',glowSave);
}

function reloadSave(){
	saveString = localStorage.getItem('autosave');
	if(JSON.parse(saveString) != null){
		saveString = JSON.parse(saveString);
		
	}
	
	glowSave = localStorage.getItem('glowsave');
	if(JSON.parse(glowSave) != null){
		glowSave = JSON.parse(glowSave);
		// console.log(glowSave);
	}

	if(saveString != null){
		for(let i=0; i<saveString.length; i++){
			makeSavedSystem(saveString[i],glowSave);
		}
	}
		

}




function makeSavedSystem(planet,glow){
	// console.log(shinePlanet.checked);

	allPlanets.push(new Planet(planet.name,planet.radius,planet.mass));

	last = allPlanets.length - 1;
	// console.log(planetName.value);
	allPlanets[last].colour(planet.a,0.5);
	allPlanets[last].move(planet.x,planet.y,planet.X,planet.Y);
	
	// console.log(glow);
	if(glow != null){
		for(let i=0; i<glow.length; i++){
			if(planet.name == glow[i].name && planet.x == glow[i].x && planet.y == glow[i].y){
				glowingPlanets.push(allPlanets[last]);
				console.log(planet);
				console.log(glow[i]);
			}
			
		}
	}
	pauseGame = true;
	last = -1;
	
}