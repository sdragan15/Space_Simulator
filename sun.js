class Planet{

	constructor(r, m){
		this.radius = r;
		this.mass = m*M;
		// console.log(ZOOM);
		this.array = [];
	}

	move(x,y,X,Y){
		this.x = x;
		this.y = y;
		this.X = X;
		this.Y = Y;
		this.R = 1;
	}

	colour(a,b,c){
		this.a = a;
		this.b = b;
		this.c = c;
	}

	update(all){
		if(pause){
			// console.log(123);
			for(let i=0; i<=all.length-1; i++){
				if(all[i] != this){
					if(this.R != 0){
						// console.log(all[i].x);
						// console.log(all[i].mass);
						 this.R = sqrt(Math.pow((all[i].x - this.x),2) + Math.pow((all[i].y - this.y),2));
						 this.Force = G*(all[i].mass)/Math.pow(this.R,2);
						 // console.log(this.Force);
						 // console.log(this);
						 // console.log(this.Force);
						 this.X += (all[i].x - this.x)*this.Force/(this.R);
						 this.Y += (all[i].y - this.y)*this.Force/(this.R);
					}
					
				}
			}
			// console.log(this.X);
			this.x += this.X;
			this.y += this.Y;
			if(this.array.length < HISTORY){
				this.array.push({x: this.x, y: this.y});
				// console.log(this.array[0].x);
			}
			else{
				this.array.splice(0, 1);
			}
			// console.log(this.array[1]);
		}
		
	}

	center(all){
		if(pause){
			for(let i=0; i<all.length; i++){		
				all[i].x -= this.X;
				all[i].y -= this.Y;
			}
		}
	}


	trail(){
		for(let i=0; i<this.array.length; i++){
			let tx = this.array[i].x;
			let ty = this.array[i].y;
			noStroke();
			fill(this.a, this.b, this.c);
			ellipse(tx,ty,this.radius*THICKNES,this.radius*THICKNES);
		}
		
	}

	show(){
		stroke(0);
		strokeWeight(3);
		fill(this.a,this.b,this.c);
		ellipse(this.x, this.y, this.radius, this.radius);
	}
}


