var settingsBtn = document.getElementById('settings_btn');
var cancelSet = document.getElementById('cancel_settings');
var trailSlider = document.getElementById('trail_slider');
var settingsFlex = document.getElementById('settings_flex');
var applySet = document.getElementById('apply_settings');
var sliderValue = document.getElementById('slider_value');

var sliderBackup;


settingsBtn.addEventListener('click', openSettings);
cancelSet.addEventListener('click', notSaveSet);			//// settings is not saved
applySet.addEventListener('click', saveSet);



function openSettings(){
	if(!pause){
		settingsFlex.style.display = 'flex';
		sliderBackup = trailSlider.value;
		movePlanets = false;
	}
	else{
		alert('Game must be paused!');
	}
	
}

function notSaveSet(){
	settingsFlex.style.display = 'none';
	trailSlider.value = sliderBackup;
	movePlanets = true;
}

function saveSet(){
	settingsFlex.style.display = 'none';
	trailHistory = trailSlider.value;
	// console.log(trailSlider.value);
	movePlanets = true;
}

function updateSlider(){
	if(settingsFlex.style.display == 'flex'){				
		sliderValue.innerHTML = 'trail: ' + trailSlider.value;
	}
}