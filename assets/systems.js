//// There goes all finished systems:
var solarSys = document.getElementById('solar_sys');
solarSys.addEventListener('click', addSolarSys);
///


function addSolarSys(){
	sunce = new Planet('Sun',500,90000);		
	sunce.move(0,0,0,0);
	
	merkur = new Planet('Mercury',70,100);
	merkur.move(1200,0,0,9);
	
	venera = new Planet('Venus',100,200);		
	venera.move(3000,0,0,5.5);
	
	zemlja = new Planet('Earth',120,1500);
	zemlja.move(5000,0,0,-4.3);
	
	mesec = new Planet('Moon',50,0.1);
	mesec.move(5200,-40,-1,-6);
	
	mars = new Planet('Mars',90,150);		
	mars.move(7000,0,0,-3.8);

	jupiter = new Planet('Jupiter',260,2000);
	jupiter.move(10000,0,0,3.3);

	saturn = new Planet('Saturn',200,1000);		
	saturn.move(18000,0,0,-2.5);

	uran = new Planet('Uranus',180,800);		
	uran.move(25000,0,0,-2.1);

	neptun = new Planet('Neptune',150,500);		
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

	autoSave();
}