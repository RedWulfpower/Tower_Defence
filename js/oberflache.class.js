
function COberflache(h,b){
	var self = this;
	
	var hoch 	= h;
	var breit 	= b;
	
	var showing = true;
	
	var GameMenue = new Array();
	
	var maxB = breit/6;
	if(maxB > 300){
		maxB = 300;
	}
	
	
	
	
	
	
	this.showElement = function(typ){
	
		GameMenue = new Array();
		switch(typ){
			case goption.gStateEnum.Game:
				
			break;
			case goption.gStateEnum.Menu:
				
				GameMenue.push(new Text(breit/2, (hoch/2)-100, 0, "Arial", "Menü :D", 40, "#1fcc10", "#000000" ,0.01, null, "center", true) );
				
				GameMenue.push(new Buttion(breit/2, (hoch/2)-40, 200, 40, "Arial", "Spiel Starten", 30, "#1fcc10", "#1fcc10", null,
					function(){
						goption.GState(goption.gStateEnum.Game);
					} , 0.01) );
					
				GameMenue.push(new Buttion(breit/2, (hoch/2), 200, 40, "Arial", "Changelog", 30, "#1fcc10", "#1fcc10", null,
					function(){
						console.log("Changelog...");
						goption.PState(goption.pStateEnum.Changelog);
					} , 0.01) );
					
				GameMenue.push(new Buttion(breit/2, (hoch/2)+40, 200, 40, "Arial", "Über", 30, "#1fcc10", "#1fcc10", null,
					function(){
						console.log("Über...");
						goption.PState(goption.pStateEnum.Credits);
					} , 0.01) );
				
			break;
			case goption.gStateEnum.Pause:
				
				GameMenue.push(new CInput(breit/2, (hoch/2)+(40*3), 250, 30, "Arial", 20, "#000000", "#1fcc10", "#0000ff" ,0.01, {ART : "Text", MAX : 30}) );
				GameMenue.push(new CInput(breit/2, (hoch/2)+(40*4), 100, 30, "Arial", 20, "#000000", "#1fcc10", "#0000ff" ,0.01, {ART : "Number", MAX : 1337}) );
				
				GameMenue.push(new Text(breit/2, (hoch/2)-100, 0, "Arial", "Pause :D", 40, "#000000", "#1fcc10" ,0.01, null, "center", true) );

				GameMenue.push(new Buttion(breit/2, (hoch/2)-40, 200, 40, "Arial", "Weiter Spielen", 30, "#000000", "#1fcc10", null,
					function(){
						goption.GState(goption.gStateEnum.Game);
					} , 0.01) );

				GameMenue.push(new Buttion(breit/2, (hoch/2), 200, 40, "Arial", "Optionen", 30, "#000000", "#1fcc10", null,
					function(){
						console.log("Optionen...");
						goption.PState(goption.pStateEnum.Option);
						
					} , 0.01) );
					
				GameMenue.push(new Buttion(breit/2, (hoch/2)+40, 200, 40, "Arial", "Changelog", 30, "#000000", "#1fcc10", null,
					function(){
						console.log("Changelog...");
						goption.PState(goption.pStateEnum.Changelog);
					} , 0.01) );
					
					

				GameMenue.push(new Buttion(breit/2, (hoch/2)+80, 200, 40, "Arial", "Zurück zum Menü", 30, "#000000", "#1fcc10", null,
					function(){
						console.log("Menü :D");
						goption.GState(goption.gStateEnum.Menu);
						
					} , 0.01) );
			break;
		}
	}
	
	this.showPElement = function(state){
		
		if(state != goption.pStateEnum.none){
			GameMenue = new Array();
		}
		
		switch(state){
			
			case goption.pStateEnum.none:
				
			break;

			
			case goption.pStateEnum.Changelog:
				
				var request = new XMLHttpRequest();
				request.open("GET","changelog.txt");
				request.addEventListener('load', function(event) {
					if (request.status >= 200 && request.status < 300) {
						
						var textArr = request.responseText.split("\n");
						GameMenue.push( new ScrollText(breit/2, (hoch/2)-(40*1), 500, 300, "Arial", textArr,20, "#00ff00", "#000", 0.01, "#ff0000") );
						
						
					} else {
						console.warn(request.statusText, request.responseText);
					}
				});
				request.send();
				
				GameMenue.push(new Buttion(breit/2, (hoch/2)+(40*4), 200, 40, "Arial", "Zurück", 30, "#0000ff", "#1fcc10", null,
					function(){
						console.log("Zurück");
						goption.PState(goption.pStateEnum.none);
						
					} , 0.01) );
				
				
			break;
			
			
			case goption.pStateEnum.Option:
				
				GameMenue.push(new Buttion(breit/2, (hoch/2)+(40*0), 200, 40, "Arial", "Tastenbelegung", 30, "#000000", "#1fcc10", null,
					function(){
						console.log("Tastenbelegung");
						goption.PState(goption.pStateEnum.Tastenbelegung);
						
					} , 0.01) );
					
				
				GameMenue.push(new Buttion(breit/2, (hoch/2)+(40*3), 200, 40, "Arial", "Zurück", 30, "#000000", "#1fcc10", null,
					function(){
						console.log("Zurück");
						goption.PState(goption.pStateEnum.none);
						
					} , 0.01) );
					
			break;
			
			case goption.pStateEnum.Tastenbelegung:
				
				GameMenue.push(new Buttion(breit/2, (hoch/2)+(40*3), 200, 40, "Arial", "Zurück", 30, "#000000", "#1fcc10", null,
					function(){
						console.log("Zurück");
						goption.PState(goption.pStateEnum.Option);
						
					} , 0.01) );
					
			break;
			
			case goption.pStateEnum.Credits:
				
				GameMenue.push(new Buttion(breit/2, (hoch/2)+(40*2), 200, 40, "Arial", "Kontakt", 30, "#1fcc10", "#1fcc10", null,
					function(){
						console.log("Kontakt");
						var win = window.open("https://RedWulfpower.de/kontakt.html", '_blank');
						win.focus();
						
					} , 0.01) );
				GameMenue.push(new Buttion(breit/2, (hoch/2)+(40*3), 200, 40, "Arial", "Zurück", 30, "#1fcc10", "#1fcc10", null,
					function(){
						console.log("Zurück");
						goption.PState(goption.pStateEnum.none);
						
					} , 0.01) );
					
			break;

		}
	}
	
	
	this.show = function(){
		showing = true;
	}
	this.hide = function(){
		showing = false;
	}
	
	this.resize = function(h,b){
		hoch 	= h;
		breit 	= b;
		
		
		maxB = breit/6;
		if(maxB > 300){
			maxB = 300;
		}
		else if(maxB < 200){
			maxB = 200;
		}
	}
	this.wheel = function(e){
		
		var obj = GameMenue;
		
		var acolled = (e.deltaY/2);
	
		for(var i=0; i< obj.length;i++){
			
			if( ( obj[i] instanceof ScrollText ) && 
				e.clientX < ( obj[i].getX() + obj[i].getBreit()/2)  && e.clientX > ( obj[i].getX() - obj[i].getBreit()/2 ) && 
				e.clientY < ( obj[i].getY() + obj[i].getHoch()/2 )  && e.clientY  > ( obj[i].getY() - obj[i].getHoch()/2 )
			){
				
				if(acolled > 0){
					obj[i].ScrollDown(acolled);
					
				}else if(acolled < 0){
					
					obj[i].ScrollUp(Math.abs(acolled));
				}
				
				return true;
			}
		}
		return false;
	}
	
	this.keyPress = function(e){
	
		var obj = GameMenue;
		for(var i=0; i< obj.length;i++){
				
			if(obj[i] instanceof CInput){
			
				if(obj[i].isFocus()){
					obj[i].input(e);
					
				}
			}
		}
	}
	
	this.click = function(e){
	
		switch(goption.aktState){
			case goption.gStateEnum.Game:
				
			break;
			
			case goption.gStateEnum.Pause:
			case goption.gStateEnum.Menu:
			
				var retvar = false;
			
				var obj = GameMenue;
				
				for(var i=0; i< obj.length;i++){
				
					if(obj[i] instanceof CInput){
						obj[i].setFocus(false);
					}
					
					
					if( ( obj[i] instanceof Buttion || obj[i] instanceof ButtionImg || obj[i] instanceof CInput ) && 
						e.clientX < ( obj[i].getX() + obj[i].getBreit()/2)  && e.clientX > ( obj[i].getX() - obj[i].getBreit()/2 ) && 
						e.clientY < ( obj[i].getY() + obj[i].getHoch()/2 )  && e.clientY  > ( obj[i].getY() - obj[i].getHoch()/2 )
					){
					
						if(obj[i] instanceof CInput){
							
							
							obj[i].setFocus(true);
							
							obj[i].setCursorPos(e.clientX, e.clientY);
							
							
						}else{
							/*
								Bekommt das angewählte object
								und fürt es aus
							*/
							var kobj = obj[i].getKlickObj();
							kobj();
						}
						retvar = true;
					}
				}
				if(retvar == true){
					return true;
				}
			break;
		}
		
		
		if(goption.stop == true){
			return true;
		}
		
		if(showing && e.clientX > (breit-maxB) ){
		
			switch (e.which) {
				
				case 1: //left
					
					
				break;
				case 2: //middedl
					
				break;
				case 3: //right
					
				break; 
			}
			
			
			return true;
			
			
		}
		
		if(showing && 	e.clientX > (breit-maxB-10) 	&& e.clientX < (breit-maxB) && 
			e.clientY > (hoch/2)-10 		&& e.clientY < (hoch/2)+10
		){
			
			self.hide();
			
			return true;
		}
		
		
		else if(!showing && 
			e.clientX > (breit-10) 		&& e.clientX < breit && 
			e.clientY > (hoch/2)-10 	&& e.clientY < (hoch/2)+10
		){
			
			self.show();
			return true;
		}
		
		return false;
	}
	
	
	this.draw = function(ctx){
	
		ctx.clearRect(0,0,breit,hoch);
	
		
		
		
		switch(goption.aktState){
			case goption.gStateEnum.Game:
				if(showing){
				
					ctx.fillStyle="red";
					ctx.fillRect( breit-maxB, 0, maxB, hoch);
					
					
					ctx.fillRect( breit-maxB-10, (hoch/2)-10, 10, 20);
					
					
					
					ctx.font = "17px Arial";
					//fartbe
					ctx.fillStyle = "#ffffff";
			
					ctx.textAlign = "left";
			
					//Text, x, y
					ctx.fillText("Weil wegen Baum und so...", breit-maxB+4, 20);
				
				
				
				
				}else{
				
					ctx.fillStyle="red";
					ctx.fillRect( breit-10, (hoch/2)-10, 10, 20);
				}
			break;
			case goption.gStateEnum.Menu:
				
				
				//Stopt :D
				if(goption.stop){
					//fartbe
					ctx.fillStyle = "#000000";
					ctx.fillRect( 0, 0, breit, hoch);
					
					
					drawObj(GameMenue,ctx);
					
					
				}
			break;
			case goption.gStateEnum.Pause:
				//Stopt :D
				if(goption.stop){
					//fartbe
					ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
					ctx.fillRect( 0, 0, breit, hoch);
					
					
					drawObj(GameMenue,ctx);
					
					
				}
			break;
		}
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function drawObj(obj, ctx){
	
		for(var i=0;i<obj.length;i++){
			if(obj[i] instanceof Buttion){
				
				if(obj[i].getBGColor() != null){
					ctx.fillStyle = obj[i].getBGColor();
					ctx.fillRect(
						obj[i].getX() - (obj[i].getBreit() /2 ),
						obj[i].getY() - (obj[i].getHoch() /2 ),
						obj[i].getBreit(),
						obj[i].getHoch()
					);
				}
				
				//größe, Schriftart
				ctx.font = obj[i].getFontSize()+"px "+ obj[i].getSrift();
				
				//fartbe
				ctx.fillStyle = obj[i].getFillColor();
				ctx.strokeStyle = obj[i].getColor();
				
				ctx.textAlign = "center";
				
				ctx.lineWidth = obj[i].getStrokeWidth();

				//Text, x, y
				ctx.fillText(obj[i].getText(),obj[i].getX(),obj[i].getY()+10);
				ctx.strokeText(obj[i].getText(),obj[i].getX(),obj[i].getY()+10);
				
				
				
			}else if(obj[i] instanceof ButtionImg){
				// img, x, y, breit, hoch, dx, dy, dbreit, dhoch 
					
				img = new Image();
				img.onload = function(){
					ctx.drawImage(img,img.obj.getX(),img.obj.getY(),img.obj.getBreit(),img.obj.getHoch());
				}
				img.obj = obj[i];
				img.src = obj[i].getImage();
			
			
			
		//		console.log(obj[i].getImage());
		
				//$('canvas').drawImage({
				//	source: obj[i].getImage(),
				//	x: obj[i].getX(), 
				//	y: obj[i].getY(),
				//	width: obj[i].getBreit(), 
				//	height: obj[i].getHoch()
				//});
				
			}else if(obj[i] instanceof Text){
				if(obj[i].getRadius() == null || obj[i].getRadius() == 0){
					
					//größe, Schriftart
					ctx.font = obj[i].getFontSize()+"px "+ obj[i].getSrift();
					
					//fartbe
					ctx.fillStyle = obj[i].getFillColor();
					ctx.strokeStyle = obj[i].getColor();
					
					ctx.textAlign = obj[i].getAlign();
					
					//Text, x, y
					ctx.fillText(obj[i].getText(),obj[i].getX(),obj[i].getY());
					if(ctx.fillStyle != ctx.strokeStyle){
						ctx.strokeText(obj[i].getText(),obj[i].getX(),obj[i].getY());
					}
					
				}else{
					
					//$('canvas').drawText({
					//	fillStyle: obj[i].getFillColor(),
					//	strokeStyle: obj[i].getColor(),
					//	strokeWidth: obj[i].getStrokeWidth(),
					//	x: obj[i].getX(),
					//	y: obj[i].getY(),
					//	fontSize: obj[i].getFontSize(),
					//	fontFamily: obj[i].getSrift(),
					//	text: obj[i].getText(),
					//	radius: obj[i].getRadius(),
					//	maxWidth: obj[i].getMaxWidth(),
					//	align: obj[i].getAlign(),
					//	fromCenter: obj[i].getFromCenter(),
					//});	
					
				}
			}else if(obj[i] instanceof CInput){
				
				if(obj[i].getBGColor() != null){
					ctx.fillStyle = obj[i].getBGColor();
					ctx.fillRect(
						obj[i].getX() - (obj[i].getBreit() /2 ),
						obj[i].getY() - (obj[i].getHoch() /2 ),
						obj[i].getBreit(),
						obj[i].getHoch()
					);
				}
				
				
				//größe, Schriftart
				ctx.font = obj[i].getFontSize()+"px "+ obj[i].getSrift();
				
				//fartbe
				ctx.fillStyle = obj[i].getFillColor();
				ctx.strokeStyle = obj[i].getColor();
				
				ctx.lineWidth = obj[i].getStrokeWidth();
				
				ctx.textAlign = "left";
				
				//Text, x, y
				ctx.fillText(obj[i].getText(), obj[i].getTextX(), obj[i].getTextY() );
				if(ctx.fillStyle != ctx.strokeStyle){
					ctx.strokeText(obj[i].getText(), obj[i].getTextX(), obj[i].getTextY());
				}
				
				if(obj[i].isCursorShow()){
				
					ctx.fillStyle = "#ABCDEF";
					ctx.fillRect(
						obj[i].getTextX() + ctx.measureText( obj[i].getText().substr(0,obj[i].getCursorPos() ) ).width,
						
						obj[i].getY() - (obj[i].getHoch() /2 ) + 2,
						1,
						obj[i].getHoch()- 4
					);
				}
			}
			else if(obj[i] instanceof ScrollText){
				
				
				var tmp = document.createElement('canvas');
				tmp.width = obj[i].getBreit();
				tmp.height = obj[i].getHoch();
				
				tmp2d = tmp.getContext('2d');
				
				
				//tmp2d.drawImage(document.getElementById('canvas'), 0, 0);
				
				var text = obj[i].getTextArr();
				
				if(obj[i].getBgColor() != null){
					tmp2d.fillStyle = obj[i].getBgColor();
				}
				
				tmp2d.fillRect(
					0,
					0,
					obj[i].getBreit(),
					obj[i].getHoch()
				);
				
				
				//größe, Schriftart
				tmp2d.font = obj[i].getFontSize()+"px "+ obj[i].getSrift();
				tmp2d.fillStyle = obj[i].getFillColor();
				tmp2d.strokeStyle = obj[i].getColor();
				
				tmp2d.textAlign = "left";
				
				var x = 0  + 3;
				var y = 0  + (obj[i].getFontSize()/2) + 10;
				
				var bbb = -1;
				for(var t=0;t<text.length;t++){
					
					if(y > obj[i].getScrolled()){
						if(bbb == -1){bbb = t;}
						//Text, x, y
						tmp2d.fillText(text[t],x,(y -obj[i].getScrolled()));
						
						if(tmp2d.fillStyle != tmp2d.strokeStyle){
							
							tmp2d.strokeText(text[t],x, (y -obj[i].getScrolled()) );
							
						}
						
						if(y > (obj[i].getHoch() + obj[i].getFontSize() + obj[i].getScrolled()) ){
							break;
						}
						
					}
					y += obj[i].getFontSize()+ 3;
				}
				var posi = 0;
				if((posi = obj[i].getScrollPosion()) >= 0){
					
					tmp2d.fillStyle = '#0f0';
					tmp2d.fillRect(
						obj[i].getBreit() - 20,
						0,
						20,
						obj[i].getHoch()
					);
					tmp2d.fillStyle = '#f00';
					tmp2d.fillRect(
						obj[i].getBreit() - 20,
						posi,
						20,
						obj[i].getScrollbarSize()
					);
				}
				
				
				
				
				ctx.drawImage(tmp, 
					(obj[i].getX() - (obj[i].getBreit()/2)),
					(obj[i].getY() - (obj[i].getHoch()/2)) 
				);
			}
		}
	}
}




