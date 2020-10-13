function slowTime(){
	if(fastUp >=1){
		fastUp--;
	}
}

function speedUpTime(){
	fastUp++;
}

function pauseTime(){
	if(pause){
		pause = false;							/// stop
		document.getElementById('play_pause').classList.remove("gg-play-pause-r");
		document.getElementById('play_pause').classList.add("gg-play-button-r");
	}
	else{
		pause = true;							/// start
		document.getElementById('play_pause').classList.remove("gg-play-button-r");
		document.getElementById('play_pause').classList.add("gg-play-pause-r");
		for(let i=0; i<allPlanets.length; i++){
			allPlanets[i].predArray = [];
		}
	}
}

function normalTime(){
	fastUp = N_TIME;
}

function hideTrail(){
	if(trailHistory == 0){
		trailHistory = trailLength;
	}
	else{
		trailHistory = 0;
	}
	for(let i=0; i<allPlanets.length; i++){
		allPlanets[i].array = [];
	}
}