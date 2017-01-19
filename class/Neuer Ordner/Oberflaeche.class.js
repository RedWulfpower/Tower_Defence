
function OberflaecheClass(BREITE, WORLDCLASS){
	
	var breite = BREITE;
	var show = true;
	
	var world = WORLDCLASS;
	
	var Drawobjs = Array();
	
	var DrawobjsTower = Array();
	
	
	var WelleText;//text für die Wellen anzahl
	var MoneyText;//text für das Geld
	
	var ToweInfoobj = Array(world.getAllowTowerArr().length);
	
	var AnzahlB = Array(world.getAllowTowerArr().length);
	
	var ZeigeStatus = {
		aktuell		: 0,
		
		normal		: 0,
		TowerZeig 	: 1,
		TowerZeigObj: 0,
		
	}
	// X Mitte von der oberfläche
	var xm;
	
	for(var i=0;i<ToweInfoobj.length;i++){
		ToweInfoobj[i] = Array();
	}
	
	this.create = function(){
		Drawobjs = Array();
		DrawobjsTower = Array();
		ToweInfoobj = Array(world.getAllowTowerArr().length);
		for(var i=0;i<ToweInfoobj.length;i++){
			ToweInfoobj[i] = Array();
		}
		
		
		xm = $( document ).width()-(breite/2);
		
		var TowArr = world.getAllowTowerArr();
		var thohe = 250;
		var tbreite = xm - (breite/2 - 30);
		for(var i=0; i<TowArr.length;i++ ){
			
			if( i % 4 == 0){
				thohe += 50;
				tbreite = xm - (breite/2 - 30);
			}
			Drawobjs.push(new ButtionImg(TowArr[i].getImage(), tbreite, thohe, 45,45,{ Tower: true, PlaceTower:TowArr[i], PlaceTowerId:i }));
			
			tbreite += 50;
		}
		//Text(X, Y, RADIUS, SART, TEXT, FSIZE, FCOLOR, COLOR, STROW, MAXLEN, ALIGN){
	
		Drawobjs.push(new Text(xm, 50 , 0, "Verdana, sans-serif", world.getName(), 28, "#39ff14", "#39ff14",1,null, "center", true));
		
		WelleText = new Text(xm - (breite/2 - 10), 100 , 0, "Verdana, sans-serif", "Welle: " + (world.getWelle()+1) + " / "+ world.getMaxWelle(), 15, "#39ff14", "#39ff14",0.001,null, "left", true);
		Drawobjs.push(WelleText);
		
		MoneyText = new Text(xm - (breite/2 - 10), 200 , 0, "Verdana, sans-serif", "Geld: " + world.getMoney(), 15, "#39ff14", "#39ff14",0.001,null, "left", true);
		Drawobjs.push(MoneyText);
		
		Drawobjs.push(new Text(xm - (breite/4), 250 , 0, "Verdana, sans-serif", "Türme", 23, "#39ff14", "#39ff14",0.001,null, "center", true));
		
		Drawobjs.push( new Buttion( xm - (breite/4)+50, 130, 100,20, "Verdana, sans-serif", "Starten", 17, "#39ff14", "#000",{ 
			nextWelle:true
		},1 ) );
		for(var i=0;i<Game.World.length;i++){
			
			if(Game.World[i] == world){
				
				Drawobjs.push( new Buttion( xm - (breite/4)+50, 155, 100,20, "Verdana, sans-serif", "Neustart", 17, "#39ff14", "#000",{ 
					newGame: i,
				},1 ) );
				
			}
		}
		
		for(var i=0;i<ToweInfoobj.length;i++){
			
			var isbreit = 200;

			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit/2, 280, 0, 
				"Verdana, sans-serif", TowArr[i].getName(), 20, "#39ff14", "#39ff14",1,null, "center", true));

			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit + 5, 310, 0, 
				"Verdana, sans-serif", "Breite:", 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit + 5, 330, 0, 
				"Verdana, sans-serif", "Höche:", 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit + 5, 350, 0, 
				"Verdana, sans-serif", "Radius:", 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit + 5, 370, 0, 
				"Verdana, sans-serif", "Schaden:", 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit + 5, 390, 0, 
				"Verdana, sans-serif", "Reloadtime:", 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit + 5, 410, 0, 
				"Verdana, sans-serif", "Kosten:", 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit + 5, 430, 0, 
				"Verdana, sans-serif", "Anzahl:", 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			
			
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit/2 + 10, 310, 0, 
				"Verdana, sans-serif", TowArr[i].getImgW(), 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit/2 + 10, 330, 0, 
				"Verdana, sans-serif", TowArr[i].getImgH(), 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit/2 + 10, 350, 0, 
				"Verdana, sans-serif", TowArr[i].getRange(), 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit/2 + 10, 370, 0, 
				"Verdana, sans-serif", TowArr[i].getSchaden(), 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit/2 + 10, 390, 0, 
				"Verdana, sans-serif", TowArr[i].getReloadTime()+" sek.", 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			ToweInfoobj[i].push(new Text($( document ).width()- breite - isbreit/2 + 10, 410, 0, 
				"Verdana, sans-serif", TowArr[i].getCoasts(), 16, "#39ff14", "#39ff14",0.001,null, "left", false));
			
			
			AnzahlB[i] = new Text($( document ).width()- breite - isbreit/2 + 10, 430, 0, 
				"Verdana, sans-serif", "0", 16, "#39ff14", "#39ff14",0.001,null, "left", false);
			ToweInfoobj[i].push(AnzahlB[i]);
			
		}
		
		
		
		/*
			Tower info mit updates etc....
		*/
		DrawobjsTower.push(new Text(xm, 50 , 0, "Verdana, sans-serif", world.getName(), 28, "#39ff14", "#39ff14",1,null, "center", true));
		DrawobjsTower.push(WelleText);
		DrawobjsTower.push(MoneyText);
		DrawobjsTower.push( new Buttion( xm - (breite/4)+50, 130, 100,20, "Verdana, sans-serif", "Starten", 17, "#39ff14", "#000",{ 
			nextWelle:true
		},1 ) );
		for(var i=0;i<Game.World.length;i++){
			
			if(Game.World[i] == world){
				
				DrawobjsTower.push( new Buttion( xm - (breite/4)+50, 155, 100,20, "Verdana, sans-serif", "Neustart", 17, "#39ff14", "#000",{ 
					newGame: i,
				},1 ) );
				
			}
		}
		
		
	}
	
	this.draw = function(){
		
		if(show){
			switch(ZeigeStatus.aktuell){
				case ZeigeStatus.normal:{
					
					this.updateWelle();
					
					$('canvas').drawRect({
						fillStyle: '#c33',
						x: $( document ).width()-(breite/2), 
						y: ($( document ).height()/2),
						width: breite,
						height: $( document ).height()
					});
					Game.drawObj(Drawobjs);
					
				}break;
				case ZeigeStatus.TowerZeig:{
					
					$('canvas').drawRect({
						fillStyle: '#c33',
						x: $( document ).width()-(breite/2), 
						y: ($( document ).height()/2),
						width: breite,
						height: $( document ).height()
					});
					
					Game.drawObj(DrawobjsTower);
					
					var obj = ZeigeStatus.TowerZeigObj;
					var arr = Array();
					arr.push(new Text(xm - (breite/2 - 10), 300 , 0, "Verdana, sans-serif", "Kills: " + obj.getKills(), 14, "#39ff14", "#39ff14",0.001,null, "left", true));
					arr.push(new Text(xm - (breite/2 - 10), 320 , 0, "Verdana, sans-serif", "Leben: " + obj.getHp(), 14, "#39ff14", "#39ff14",0.001,null, "left", true));
					
					
					arr.push(new Text(xm - (breite/2 - 10), 340 , 0, "Verdana, sans-serif", "Range: " + obj.getRange() , 14, "#39ff14", "#39ff14",0.001,null, "left", true));
					arr.push( new Buttion( (xm - (breite/2) + 45 + 125), 340, 55, 16, "Verdana, sans-serif", (obj.getRange()+1), 14, "#39ff14", "#000",{ 
						
					},1 ) );
					
					arr.push(new Text(xm - (breite/2 - 10), 360 , 0, "Verdana, sans-serif", "Schaden: " + obj.getSchaden(), 14, "#39ff14", "#39ff14",0.001,null, "left", true));
					arr.push( new Buttion( (xm - (breite/2) + 45 + 125), 360, 55,16, "Verdana, sans-serif", (obj.getSchaden()+1), 14, "#39ff14", "#000",{ 
						
					},1 ) );
					
					arr.push(new Text(xm - (breite/2 - 10), 380 , 0, "Verdana, sans-serif", "Reload: " + obj.getRTime(), 14, "#39ff14", "#39ff14",0.001,null, "left", true));
					arr.push( new Buttion( (xm - (breite/2) + 45 + 125), 380, 55,16, "Verdana, sans-serif", (obj.getRTime()+0.001), 14, "#39ff14", "#000",{ 
						
					},1 ) );
					
					arr.push( new Buttion( (xm - (breite/4)+50), 410, 90,20, "Verdana, sans-serif", "Verkaufen", 17, "#39ff14", "#000",{ 
						
					},1 ) );
					
					
					var ctx = document.getElementById('canvas').getContext('2d');
					ctx.strokeStyle = '#0f0';
					ctx.beginPath();
					ctx.lineWidth = 3;
					ctx.arc(
						(($( document ).width()/2)  - (p_x - obj.getX() )),
						(($( document ).height()/2) - (p_y - obj.getY() )),
						obj.getRange(),
						0,2*Math.PI
					);
					ctx.stroke();
					
					
					Game.drawObj(arr);
					
				}break;
			}
			
		}
	}
	this.drawToweInfo = function(TowerId){
		
		if(show){
			
			var isbreit = 200;
			
			
			$('canvas').drawRect({
				
				fillStyle: '#00f',
				x: $( document ).width()- breite - isbreit/2, 
				y: 360,
				width: isbreit,
				height: 200
				
			});
			Game.drawObj(ToweInfoobj[TowerId]);
			this.updateBuildingAnzahl(TowerId);
		}
	}
	
	this.getObjs = function(){
		return Drawobjs;
	}
	
	this.getZeigeStatus = function(){
		return ZeigeStatus;
	}
	
	this.getBreite = function(){
		return breite;
	}
	this.getShow = function(){
		return show;
	}
	this.setShow = function(SHOW){
		show = SHOW;
	}
	
	this.updateWelle= function(){
		WelleText.updateText("Welle: " + (world.getWelle()+1) + " / "+ world.getMaxWelle());
	}
	
	this.updateBuildingAnzahl = function(id){
		AnzahlB[id].updateText(world.getBuildungAnzahl(id));
	}
	this.updateMoney = function(id){
		MoneyText.updateText("Geld: " + world.getMoney());
	}
	
	
	this.showBuildingInfo = function(obj){
		ZeigeStatus.aktuell = ZeigeStatus.TowerZeig;
		ZeigeStatus.TowerZeigObj = obj;
	}
	this.hideBuildingInfo = function(){
		ZeigeStatus.aktuell = ZeigeStatus.normal;
		ZeigeStatus.TowerZeigObj = 0;
	}
}

