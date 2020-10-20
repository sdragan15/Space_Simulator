var ambientVolume = 0.2;
var started = false;			/// if music has started
var noStart = true;

var muteBtn = document.getElementById('mute_btn');

muteBtn.addEventListener('click', muteMusic);

function playAmbientSong(){
	if(!ambientSong.autoplay && noStart){
		ambientSong.play();
		ambientSong.loop = true;
		ambientSong.volume = ambientVolume;
	}
	started = true;
}

function muteMusic(){
	if(started){
		if(!ambientSong.paused){
			ambientSong.pause();
			muteBtn.innerHTML = 'unmute';
		}
		else{
			muteBtn.innerHTML = 'mute';
			ambientSong.play();
		}
	}
	noStart = false;
}