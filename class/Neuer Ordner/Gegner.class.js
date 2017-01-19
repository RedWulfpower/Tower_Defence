function Gegner(Img, Imgh, Imgw, speed, HP, MONEY, SCHADEN){
	// this. -> public
	// var -> private
	var self = this;
	
	var hp = HP;
	
	var geld = MONEY;
	var moveSpeed = speed;

	var schaden = SCHADEN;
	var angrifZ = 1;
	
	// Bild
	var img  = Img;
	var imgH = Imgh;
	var imgW = Imgw;
	
	
	this.getColor = function(){
		return color;
	}
	this.setImage = function(Img, h, w){
		img = Img;
		imgH = h;
		imgW = w;
	}
	this.getImgW = function(){
		return imgW;
	}
	this.getImgH = function(){
		return imgH;
	}
	this.getImage = function(){
		return img;
	}
	this.getHP = function(){
		return hp;
	}
	this.getSpeed = function(){
		return moveSpeed;
	}
	this.getMoney = function(){
		return geld;
	}
	this.getSchaden = function(){
		return schaden;
	}
	this.getAngrifZ= function(){
		return angrifZ;
	}
}



function GegnerSpiel(PositionC, GEGNER, wegArray){
	// this. -> public
	// var -> private
	var self = this;
	
	var Gegner = GEGNER;
	
	
	var hp = Gegner.getHP();

	var rotate = 0;
	
	
	
	var isreload = false;
	
	
	// Position
	var x = PositionC.getX();
	var y = PositionC.getY();
	
	var moveArray = wegArray;
	
	var moveSpeed = Gegner.getSpeed();
	
	// Ziel Nr
	var nextPosNr = 0;
	
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	
	
	this.moveUp = function(){
		y -= moveSpeed;
	}
	this.moveDown = function(){
		y += moveSpeed;
	}
	this.moveLeft = function(){
		x -= moveSpeed;
	}
	this.moveRight = function(){
		x += moveSpeed;
	}
	
	this.moveNextPost = function(){
		
		var bewegung = moveSpeed;
		var bewegungaufbraucht = 0;
		
		while(bewegungaufbraucht < bewegung){
			
			var np = self.getNextPos();
			
			
			var dx = moveArray[np].getX() - x;
			var dy = moveArray[np].getY() - y;
			
			if( (dx*dx+dy*dy) == 0 ){
				
				
			}else{
				var dl = Math.sqrt(dx*dx+dy*dy);
				dx /= dl;
				dy /= dl;
				
				for(; bewegungaufbraucht < bewegung; bewegungaufbraucht++){
					
					
					/* Check ob Tower in der nähe ist? */
					
					var build = Game.isBildung(x,y, Gegner.getImgW(), Gegner.getImgH());
					if(build != false){
					
						if(isreload == false){
						
							if (build.kill(Gegner.getSchaden()) <= 0){
								
								Game.World[Game.AktWorld].RemoveBuildingObj(build);
							}
							isreload = true;
							window.setTimeout(ReloadTimer, Gegner.getAngrifZ() * 1000);
						}
						return;
					}
					
					dx *= 1;
					dy *= 1;
					x += dx;
					y += dy;
					
					if(
						x < moveArray[np].getX()+2 &&  x > moveArray[np].getX()-2 &&
						y < moveArray[np].getY()+2 &&  y > moveArray[np].getY()-2
					){

						np += 1;
						if(moveArray.length == np){
							np = 0;
						}
						self.setNextPos(np);
						break;
					}
				}
				/*
					dx *= moveSpeed;
					dy *= moveSpeed;
				*/
			}
			
			if(
				x < moveArray[np].getX()+2 &&  x > moveArray[np].getX()-2 &&
				y < moveArray[np].getY()+2 &&  y > moveArray[np].getY()-2
			){
				np += 1;
				if(moveArray.length == np){
					np = 0;
				}
				self.setNextPos(np);
			}
		}
	}
	
	this.movePos = function(zx, zy){
		
		var dx = zx - x;
		var dy = zy - y;
		
		if( (dx*dx+dy*dy) == 0 ){
			
			
		}else{
		
			var dl = Math.sqrt(dx*dx+dy*dy);
			dx /= dl;
			dy /= dl;
			
			for(var i=0;i<moveSpeed; i++){
				dx *= 1;
				dy *= 1;
				x += dx;
				y += dy;
				
				if(
					x < zx+2 &&  x > zx-2 &&
					y < zy+2 &&  y > zy-2
				){
					break;
				}
			}
			/*
				dx *= moveSpeed;
				dy *= moveSpeed;
			*/
			
			
			
		}
		if(x == zx && y > zy){
			rotate = 0;
		}
		else if(x == zx && y < zy){
			rotate = 180;
		}
		else if(x > zx && y == zy){
			rotate = 270;
		}
		else if(x < zx && y == zy){
			rotate = 90;
		}
		
		//1 unten links
		else if(x >= zx && y <= zy){
			rotate = 180;
			
			
			
			
			
		//	console.log("1111111111");
		//	console.log( Math.atan((zy - y) / (x - zx)) );
		}
		//3 rechts oben
		else if(x <= zx && y >= zy){
			rotate = 0;
			
			
			var a = y - zy;
			var b = zx - x;
			var c = Math.sqrt(a*a + b*b);
			
			
			//console.log("44444444444");
			//sin a / c
			//console.log(  );
			//console.log( a +"||"+ b +"||" + c +"||||"+ (90-Math.sin(a / c )*3.6));
			
			//rotate +=  (Math.sin(a / c )*3.6);
			
			
		//	console.log("333333333333");
			//console.log( Math.atan((y - zy) / (zx - x)) );
		}

		//2 unten rechts
		else if(x <= zx && y <= zy){
			rotate = 90;
			
			
			
			
		//	console.log("22222222222222");
		//	console.log( Math.atan((zy - y) / (zx - x)) );
			
		}
		//4 oben links
		else if(x >= zx && y >= zy){
			rotate = 270;
			
		//	console.log("44444444444");
		//	console.log("Hier:" +  Math.sin(a / c ) );
			
		}
		
		
		else{
			console.log("kein Winkel!");
		}	
		
		rotate = 0;
		
		
		
	}

	function ReloadTimer(){
		isreload = false;
	}
	
	this.getRotate = function(){
		return rotate;
	}
	
	
	this.getNextPos = function(){
		return nextPosNr;
	}
	this.moveNextPos = function(){
		return nextPosNr;
	}
	this.setNextPos = function(next){
		
		nextPosNr = next;
		
	}
	
	this.atack = function(schaden){
		
		hp -= schaden;
		
		if(hp <= 0){
			hp = -1;
		}
	}
	
	this.getHP = function(){
		return hp;
	}
	this.getHp = function(){
		return hp;
	}
	
	this.getColor = function(){
		return Gegner.getcolor();
	}
	this.getImgW = function(){
		return Gegner.getImgW();
	}
	this.getImgH = function(){
		return Gegner.getImgH();
	}
	this.getImage = function(){
		return Gegner.getImage();
	}
	this.getMoney = function(){
		return Gegner.getMoney();
	}
	this.getSchaden = function(){
		return Gegner.getSchaden();
	}
	
	
	
}