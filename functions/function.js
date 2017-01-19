
function timerLogic(){
	if(keypres[71]==true && !Game.World[Game.AktWorld].isLost())/* G */{
		
		//function Gegner(PosX, PosY, GEGNER, wegArray){

		var WegArray = Array(
			new Position(0,0),
			new Position(10,10),
			new Position(100,12),
			new Position(490,90),
			new Position(512,95),
			new Position(495,110),
			new Position(400,100),
			new Position(400,800),
			new Position(100,800),
			new Position(200,900),
			new Position(720,900),
			new Position(900,800),
			new Position(900,10),
			new Position(800,30),
			new Position(700,200),
			new Position(700,800),
			new Position(600,600),
			new Position(600,10)
		);
		var GegnerList = Game.World[Game.AktWorld].getGegnerList();
		if(keypres[49]==true)/* 1 */{
			
			GegnerList.push(new GegnerSpiel(WegArray[0], Game.Gegnern[0],WegArray));
		}
		if(keypres[50]==true)/* 2 */{
			
			GegnerList.push(new GegnerSpiel(WegArray[0], Game.Gegnern[1],WegArray));
		}
		if(keypres[51]==true)/* 3 */{
			
			GegnerList.push(new GegnerSpiel(WegArray[0], Game.Gegnern[2],WegArray));
		}
		if(keypres[52]==true)/* 4 */{
			GegnerList.push(new GegnerSpiel(WegArray[0], Game.Gegnern[3],WegArray));
		}
		if(keypres[53]==true)/* 5 */{
			GegnerList.push(new GegnerSpiel(WegArray[0], Game.Gegnern[4],WegArray));
		}
		if(keypres[54]==true)/* 6 */{
		}
		if(keypres[55]==true)/* 7 */{
		}
		if(keypres[56]==true)/* 8 */{
		}
		if(keypres[57]==true)/* 9 */{
		}
		
	}
	
	
	
	//	ZOOM
	
	/*
	if(keypres[109]==true){// (Num) - 
		
		
			$('canvas').scaleCanvas({
				x:$( document ).width()/2,
				y:$( document ).height()/2,
				scale: 0.9
				
			});
			
			//AnzeigeX *= 1.2;
			//AnzeigeY *= 1.2;
	}
	if(keypres[107]==true){// (Num) + 
		
		
			$('canvas').scaleCanvas({
				
				x:$( document ).width()/2,
				y:$( document ).height()/2,
				scale: 1.1
				
			});
		
			//AnzeigeX /= 1.1;
			//AnzeigeY /= 1.1;
	
	
	}
//	*/
	
	
	if(Game.World[Game.AktWorld].GameOberflaeche.getShow() == true){
		
		if(p_x < 0+Game.World[Game.AktWorld].GameOberflaeche.getBreite() ){
			p_x = 0+Game.World[Game.AktWorld].GameOberflaeche.getBreite();
		}
		if(p_x > Game.World[Game.AktWorld].getBreit()){
			p_x = Game.World[Game.AktWorld].getBreit();
		}
		
		if(p_y < 0){
			p_y = 0;
		}
		if(p_y > Game.World[Game.AktWorld].getHoch()){
			p_y = Game.World[Game.AktWorld].getHoch();
		}
	}else{
		if(p_x < 0 ){
			p_x = 0;
		}
		if(p_x > Game.World[Game.AktWorld].getBreit()){
			p_x = Game.World[Game.AktWorld].getBreit();
		}
		if(p_y < 0){
			p_y = 0;
		}
		if(p_y > Game.World[Game.AktWorld].getHoch()){
			p_y = Game.World[Game.AktWorld].getHoch();
		}
	}
	
	
	
	/*
		Nicht Verloren
	*/
	if(!Game.World[Game.AktWorld].isLost()){
		
		var ctx = document.getElementById('canvas').getContext('2d');
		var GegnerList = Game.World[Game.AktWorld].getGegnerList();
		var BuildungList = Game.World[Game.AktWorld].getBuildungList();
		
		
		var obj;
		/*
			Gebeude durchgehen
		*/
		for(var b = 0; b < BuildungList.length; b++){
		
			/*
				hat ein Ziel zum angreifen
			*/
			if((obj = BuildungList[b].atack()) !== false){
			
				if(obj.getHP() <= 0){
				
					Game.World[Game.AktWorld].addMoney(obj.getMoney());
					Game.World[Game.AktWorld].GameOberflaeche.updateMoney();
					
					/*
						Sleife um den gegner zu entfernen
					*/
					for(var i=0;i<GegnerList.length;i++){
						if(GegnerList[i] == obj){
							GegnerList.splice(i,1);
							break;
						}
					}
					if(GegnerList[i] == obj){
						GegnerList[i] = null;
					}
				}
				
			}else{
				
				for(var i=0, len = GegnerList.length; i < len; i++){
					
					
					var dx = GegnerList[i].getX() - BuildungList[b].getX();
					var dy = GegnerList[i].getY() - BuildungList[b].getY();
					var distance = Math.sqrt(dx * dx + dy*dy);
					
					
					if(distance <= BuildungList[b].getRange()){
						
						BuildungList[b].angrif(GegnerList[i]);
						
						if(GegnerList[i].getHP() <= 0){
							
							Game.World[Game.AktWorld].addMoney(GegnerList[i].getMoney());
							
							Game.World[Game.AktWorld].GameOberflaeche.updateMoney();
							
							GegnerList.splice(i,1);
							break;
						}
					}
				}
			}
		}
		for(var i=0; i < GegnerList.length; i++){
			
			if(!Game.World[Game.AktWorld].isLost()){
				
				GegnerList[i].moveNextPost();
				
			}
		}
		
		


		
		
		
		
		
		
		
		
	}
}






function timerDrawGame(){
	var ctx = document.getElementById('canvas').getContext('2d');
	
	var BGImg = Game.World[Game.AktWorld].getBG();
	
	var BuildungList = Game.World[Game.AktWorld].getBuildungList();
	
	var GegnerList = Game.World[Game.AktWorld].getGegnerList();
	
	
			
	for(var i=0, len = BGImg.length; i < len; i++){
	
		if(
			(BGImg[i].getX() < (p_x + AnzeigeX+200)) && (BGImg[i].getX() > (p_x - AnzeigeX-200)) &&  
			(BGImg[i].getY() < (p_y + AnzeigeY+200)) && (BGImg[i].getY() > (p_y - AnzeigeY-200))
		){
			
			
			$('canvas').drawImage({
				source: BGImg[i].getImg(),
				
				x: (($( document ).width()/2)  - (p_x - BGImg[i].getX() )), 
				y: (($( document ).height()/2) - (p_y - BGImg[i].getY() )) ,
				
				width: BGImg[i].getWidth(), height: BGImg[i].getHeight(),
				
			});
			
		}
	}
			
			
	for(var b = 0; b < BuildungList.length; b++){
	
		if(
			Game.isdrawObj(p_x, p_y, AnzeigeX, AnzeigeY, 
			BuildungList[b].getX(),BuildungList[b].getY(),BuildungList[b].getImgW(),BuildungList[b].getImgW()
		)){
			
			$('canvas').drawImage({
				source: BuildungList[b].getImage(),
				
				x: (($( document ).width()/2)  - (p_x - BuildungList[b].getX() )), 
				y: (($( document ).height()/2) - (p_y - BuildungList[b].getY() )) ,
				
				width: BuildungList[b].getImgW(), height: BuildungList[b].getImgH(),
				
				
			});
			/*
			$('canvas').drawText({
				fillStyle: '#9cf',
				strokeStyle: '#25a',
				strokeWidth: 2,
				x: (($( document ).width()/2)  - (p_x - BuildungList[b].getX() )),
				y: (($( document ).height()/2) - (p_y - BuildungList[b].getY() )),
				fontSize: 10,
				fontFamily: 'Verdana, sans-serif',
				text: 'K: ' + BuildungList[b].getKills()
			});
			if(BuildungList[b].isReload()){

				$('canvas').drawText({
					fillStyle: '#fff',
					strokeStyle: '#f00',
					strokeWidth: 1,
					x: (($( document ).width()/2)  - (p_x - BuildungList[b].getX() )) ,
					y: (($( document ).height()/2) - (p_y - BuildungList[b].getY() )) + 10,
					fontSize: 10,
					fontFamily: 'Verdana, sans-serif',
					text: 'Reload!'
				});
			
			}
			*/
		}
	}


	/*
		Gegner
	*/
	for(var i=0; i < GegnerList.length; i++){
		if(
			Game.isdrawObj(p_x, p_y, AnzeigeX, AnzeigeY, 
				GegnerList[i].getX(),GegnerList[i].getY(),GegnerList[i].getImgW(),GegnerList[i].getImgH()
		)){
		
			$('canvas').drawImage({
				source: GegnerList[i].getImage(),
				
				x: (($( document ).width()/2)  - (p_x - GegnerList[i].getX() )), 
				y: (($( document ).height()/2) - (p_y - GegnerList[i].getY() )) ,
				
				width: GegnerList[i].getImgW(), height: GegnerList[i].getImgW(),
				
				rotate: GegnerList[i].getRotate(),
			});
			
			ctx.font = "20px Verdana, sans-serif";
			//fartbe
			ctx.fillStyle = '#abcdef';
			ctx.fillText(GegnerList[i].getHP(),(($( document ).width()/2)  - (p_x - GegnerList[i].getX() )),(($( document ).height()/2)  - (p_y - GegnerList[i].getY() )));
			
		}
	}
	
	
	/*
		Mouse Over Efect
	*/
	if(Game.World[Game.AktWorld].GameOberflaeche.getShow()){
		if(Game.World[Game.AktWorld].GameOberflaeche.getZeigeStatus().aktuell == Game.World[Game.AktWorld].GameOberflaeche.getZeigeStatus().normal){
			
			var obj = Game.World[Game.AktWorld].GameOberflaeche.getObjs();

			for(var i=0; i<obj.length;i++){
			
				if( ( obj[i] instanceof Buttion || obj[i] instanceof ButtionImg ) && 
					Game.isColision(Mouse.x,Mouse.y, 1, 1, obj[i].getX(),obj[i].getY(), obj[i].getHoch(), obj[i].getHoch())
				){
					var kobj = obj[i].getKlickObj();
					
					if(kobj.Tower != null){
						Game.World[Game.AktWorld].GameOberflaeche.drawToweInfo(kobj.PlaceTowerId);						
					}
					
				}
			}
		}
	}
	
	/* 
		Oberflache 
	*/
	
	
	// komplete Oberfläsche anzeigen (Rechts)
	
	/*
		Info wenn man über den Tower Hovert
	*/
	if(Game.World[Game.AktWorld].GameOberflaeche.getShow()){
	
	
		Game.World[Game.AktWorld].GameOberflaeche.draw();
		
		
		if(Game.World[Game.AktWorld].isLost()){
			ctx.fillStyle = '#00f';
			ctx.fillRect(
				($( document ).width()/2)-200,
				($( document ).height()/2)-30,
				400,
				60
			);
			
			ctx.font = "50px Verdana, sans-serif";
			
			//fartbe
			ctx.fillStyle = '#f00';
			
			ctx.fillText("!!!Verloren!!!",($( document ).width()/2),($( document ).height()/2) );
		}
		
		/* 
			Tower an der Maus anzeigen für das Platzieren 
		*/
		if(Mouse.bindTower != 0){
			
			
			var kanPlace = true;
		
			var build = Mouse.bindTower;
			
			var Nx = (Mouse.x - ($( document ).width()/2 ) + p_x);
			var Ny = (Mouse.y - ($( document ).height()/2 ) + p_y);
			
			// in der weld
			if(Nx - (build.getImgW()/2) < 0 || Nx + (build.getImgW()/2) > Game.World[Game.AktWorld].getBreit() || 
				Ny - (build.getImgH()/2) < 0 || Ny + (build.getImgH()/2) > Game.World[Game.AktWorld].getHoch()){
				kanPlace = false;
			}else {
				var BuildungList = Game.World[Game.AktWorld].getBuildungList();				
				for(var b = 0; b < BuildungList.length; b++){
					
					var Bx = BuildungList[b].getX();
					var By = BuildungList[b].getY();
					
					var Bhoch  = BuildungList[b].getImgH();
					var Bbreit = BuildungList[b].getImgW();
					
					var Boy = By + (Bhoch/2);
					var Buy = By - (Bhoch/2);
					
					var Brx = Bx + (Bbreit/2);
					var Blx = Bx - (Bbreit/2);
					
					if( Game.isColision(
						(Mouse.x - ($( document ).width()/2 ) + p_x), (Mouse.y - ($( document ).height()/2 ) + p_y), build.getImgW(), build.getImgH(),
						BuildungList[b].getX(), BuildungList[b].getY(),  BuildungList[b].getImgW(), BuildungList[b].getImgH()
					)){
						kanPlace = false;
						break;
					}
				}
			}
			/* Anzeige des Towers */
			if(kanPlace){
				
				ctx.strokeStyle = '#0f0';
				ctx.beginPath();
				ctx.lineWidth = 3;
				ctx.arc(
					(($( document ).width()/2)  - (p_x - (Mouse.x - ($( document ).width()/2 ) + p_x) )),
					(($( document ).height()/2) - (p_y - (Mouse.y - ($( document ).height()/2 ) + p_y) )),
					build.getRange(),
					0,2*Math.PI
				);
				ctx.stroke();
				
				$('canvas').drawImage({
					source: build.getImage(),
					x: (($( document ).width()/2)  - (p_x - (Mouse.x - ($( document ).width()/2 ) + p_x) )), 
					y: (($( document ).height()/2) - (p_y - (Mouse.y - ($( document ).height()/2 ) + p_y) )),					
					width: build.getImgW(), 
					height: build.getImgH()
					
				});
			}else{
				var ctx = document.getElementById('canvas').getContext('2d');
				ctx.strokeStyle = '#f00';
				ctx.beginPath();
				ctx.lineWidth = 3;
				ctx.arc(
					(($( document ).width()/2)  - (p_x - (Mouse.x - ($( document ).width()/2 ) + p_x) )),
					(($( document ).height()/2) - (p_y - (Mouse.y - ($( document ).height()/2 ) + p_y) )),
					build.getRange(),
					0,2*Math.PI
				);
				ctx.stroke();
				
				$('canvas').drawImage({
					source: build.getImage(),
					x: (($( document ).width()/2)  - (p_x - (Mouse.x - ($( document ).width()/2 ) + p_x) )),
					y: (($( document ).height()/2) - (p_y - (Mouse.y - ($( document ).height()/2 ) + p_y) )),				
					width: build.getImgW(), 
					height: build.getImgH()
				});
			}
		}
	}
}



