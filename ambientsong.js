var ambientVolume = 0.2;

function playAmbientSong(){
	if(!ambientSong.autoplay){
		ambientSong.play();
		ambientSong.loop = true;
		ambientSong.volume = ambientVolume;
	}
	
}