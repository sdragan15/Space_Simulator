function slowTime(){
	if(fastUp >=1){
		fastUp /= 2;
	}
	document.getElementById('speed_btn').innerHTML = fastUp + 'x';
}

function speedUpTime(){
	if(fastUp < 250){
		fastUp *= 2;
		document.getElementById('speed_btn').innerHTML = fastUp + 'x';
	}
	
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
	document.getElementById('speed_btn').innerHTML = fastUp + 'x';
}

function hideTrail(){
	if(trailHistory == 0){
		trailHistory = trailLength;
		document.getElementById('trail_btn').style.background = '#86f7a4';
	}
	else{
		trailHistory = 0;
		document.getElementById('trail_btn').style.background = '#eb6f60';
	}
	for(let i=0; i<allPlanets.length; i++){
		allPlanets[i].array = [];
	}
}