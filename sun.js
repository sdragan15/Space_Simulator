class Planet{

	constructor(n, r, m){
		this.name = n;
		this.radius = r;
		this.mass = m*M;
		// console.log(ZOOM);
		this.array = [];
		this.predArray = [];
	}

	move(x,y,X,Y){
		this.x = x;
		this.y = y;
		this.X = X;
		this.Y = Y;
		this.R = 1;
	}

	colour(a,g){
		this.a = a;
		this.glow = g;
	}

	update(){
		if(pause){
			// console.log(123);
			for(let i=0; i<=allPlanets.length-1; i++){
				if(allPlanets[i] != this){
					if(this.R != 0){
						// console.log(allPlanets[i].x);
						// console.log(allPlanets[i].mass);
						this.R = dist(allPlanets[i].x,allPlanets[i].y,this.x,this.y);
						 // this.R = sqrt(Math.pow((allPlanets[i].x - this.x),2) + Math.pow((allPlanets[i].y - this.y),2));
						 this.Force = G*(allPlanets[i].mass)/Math.pow(this.R,2);
						 // console.log(this.Force);
						 // console.log(this);
						 // console.log(this.Force);
						 this.X += (allPlanets[i].x - this.x)*this.Force/(this.R);
						 this.Y += (allPlanets[i].y - this.y)*this.Force/(this.R);
					}
					
				}
			}
			// console.log(this.X);
			this.x += this.X;
			this.y += this.Y;
			if(this.array.length < HISTORY && optim%2 == 0){
				this.array.push({x: this.x, y: this.y});
				// console.log(this.array[0].x);
			}
			else if(optim%2 == 0){
				this.array.splice(0, 1);
			}
			optim++;
			// console.log(this.array[1]);
		}
		
	}

	center(){
		if(pause){
			for(let i=0; i<allPlanets.length; i++){		
				allPlanets[i].x -= this.X;
				allPlanets[i].y -= this.Y;
			}
		}
	}


	trail(){
		for(let i=0; i<this.array.length; i++){
			let tx = this.array[i].x;
			let ty = this.array[i].y;
			noStroke();
			push();
			emissiveMaterial(this.a);
			ellipse(tx,ty,this.radius*THICKNES,this.radius*THICKNES);
			pop();
		}
		
	}

	show(){
		for(let i=0; i<glowingPlanets.length; i++){
			if(this == glowingPlanets[i]){
				// console.log(this.radius);
				push();
				translate(this.x, this.y, 0);											/// for 3D
				noStroke();
				// fill(this.a,this.b,this.c);
				// lightFalloff(0.5, 0, 0);				/// how strong is light
				emissiveMaterial(this.a);
				sphere(this.radius/2);
				pop();
				break;
			}
			else{
				push();
				translate(this.x, this.y, 0);											/// for 3D
				noStroke();
				fill(this.a);
				lightFalloff(this.glow, 0, 0);				/// how strong is light
				sphere(this.radius/2);
				pop();
			}
		}
		
		
		

		// stroke(0);								/// for 2D
		// strokeWeight(this.radius * 0.05);
		// fill(this.a,this.b,this.c);
		// ellipse(this.x, this.y, this.radius, this.radius);
	}

	calculPrediction(planet){
		this.predArray = [];
		let predX = this.x;
		let predY = this.y;
		let moveX = this.X;
		let moveY = this.Y;

		for(let j=0; j<PREDICTION; j++){
			for(let i=0; i<=allPlanets.length-1; i++){
				if(allPlanets[i] != this){
					if(this.R != 0){
						// console.log(allPlanets[i].x);
						// console.log(allPlanets[i].mass);
						this.R = dist(allPlanets[i].x,allPlanets[i].y,predX,predY);
						 // this.R = sqrt(Math.pow((allPlanets[i].x - predX),2) + Math.pow((allPlanets[i].y - predY),2));
						 this.Force = G*(allPlanets[i].mass)/Math.pow(this.R,2);
						 // console.log(this.Force);
						 // console.log(this);
						 // console.log(this.Force);
						 moveX += (allPlanets[i].x - predX)*this.Force/(this.R);
						 moveY += (allPlanets[i].y - predY)*this.Force/(this.R);
					}
					
				}
			}


			// let predX2 = planet.x;
			// let predY2 = planet.y;
			// let moveX2 = planet.X;
			// let moveY2 = planet.Y;
			// for(let i=0; i<=allPlanets.length-1; i++){
			// 	if(allPlanets[i] != planet){
			// 		if(planet.R != 0){
			// 			// console.log(allPlanets[i].x);
			// 			// console.log(allPlanets[i].mass);
			// 			 planet.R = sqrt(Math.pow((allPlanets[i].x - predX2),2) + Math.pow((allPlanets[i].y - predY2),2));
			// 			 planet.Force = G*(allPlanets[i].mass)/Math.pow(planet.R,2);
			// 			 // console.log(this.Force);
			// 			 // console.log(this);
			// 			 // console.log(this.Force);
			// 			 moveX2 += (allPlanets[i].x - predX2)*planet.Force/(planet.R);
			// 			 moveY2 += (allPlanets[i].y - predY2)*planet.Force/(planet.R);
			// 		}
					
			// 	}
			// }
			// moveX -= moveX2;
			// moveY -= moveY2;
			// console.log(this.X);
			predX += moveX;
			predY += moveY;
			if(j%2 == 0){
				this.predArray.push({x: predX, y: predY});
			}
			
		}	
	}

	showPrediction(){
		for(let i=0; i<this.predArray.length; i++){
			let tx = this.predArray[i].x;
			let ty = this.predArray[i].y;
			noStroke();
			push();
			emissiveMaterial(this.a);
			ellipse(tx,ty,this.radius*THICKNES,this.radius*THICKNES);
			pop();
		}
	}

}


