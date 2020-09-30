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
		  	s = "Sunce";

		  	fill(255);
		  	textAlign(CENTER);
		  	textSize(25/ZOOM);
		  	textFont(font);
		  	text(s, allPlanets[i].x, allPlanets[i].y - allPlanets[i].radius);
		  	
		}
	}
}