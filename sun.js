class Planet{

	constructor(r, m){
		this.radius = r;
		this.mass = m*M;
		
	}

	move(x,y,X,Y){
		this.x = x;
		this.y = y;
		this.X = X;
		this.Y = Y;
		this.R = 1;
	}

	update(all){
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
	}

	center(all){
		for(let i=0; i<all.length; i++){		
			all[i].x -= this.X;
			all[i].y -= this.Y;
		}
	}


	show(a,b,c){
		fill(a,b,c);
		ellipse(this.x, this.y, this.radius, this.radius);
	}
}


