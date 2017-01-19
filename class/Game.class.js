
var Game = {
	
	movespeed : 6,
	Speedfast : 20,
	
	
	frameRate	: 60,
	fps			: 0,
	fpslast		: 0,
	Dfps		: new Date(),
	DfpsR		: new Date(),
	
	DnextWelle	: 0,
	
	World		: Array(), /* Alle Welten */
	Gegnern		: Array(), /* Alle Gegner */
	Building	: Array(), /* Alle Gebeude */
	
	AktWorld	: 0, /* aktuelle Welt */
	
	
	isColision : function(x1,y1,w1,h1, x2,y2,w2,h2){
	
		return (
			(y1 + (h1/2) > y2 - (h2/2) && y1 - (h1/2) < y2 + (h2/2) ) &&
			(x1 + (w1/2) > x2 - (w2/2) && x1 - (w1/2) < x2 + (w2/2)  )
		);
	},
	
	isdrawObj : function(x1,y1,w1,h1, x2,y2,w2,h2){
	
		return (
			(y1 + (h1/2) > y2 - (h2/2) && y1 - (h1/2) < y2 + (h2/2) ) &&
			(x1 + (w1/2) > x2 - (w2/2) && x1 - (w1/2) < x2 + (w2/2)  )
		);
	},
	
	drawObj : function(obj){
		var ctx = document.getElementById('canvas').getContext('2d');
		
		for(var i=0;i<obj.length;i++){
			
			if(obj[i] instanceof Buttion){
				
				ctx.fillStyle = '#abcdef';
				ctx.fillRect(
					obj[i].getX() - (obj[i].getBreit() /2 ),
					obj[i].getY() - (obj[i].getHoch() /2 ),
					obj[i].getBreit(),
					obj[i].getHoch()
				);
				
				//größe, Schriftart
				ctx.font = obj[i].getFontSize()+"px "+ obj[i].getSrift();
				
				//fartbe
				ctx.fillStyle = obj[i].getFillColor();
				ctx.strokeStyle = obj[i].getColor();
				
				ctx.textAlign = "center";
				
				ctx.lineWidth = obj[i].getStrokeWidth();

				//Text, x, y
				ctx.fillText(obj[i].getText(),obj[i].getX(),obj[i].getY());
				ctx.strokeText(obj[i].getText(),obj[i].getX(),obj[i].getY());
				
				
				
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
			}
			else if(obj[i] instanceof ScrollText){
				
				
				var tmp = document.createElement('canvas');
				tmp.width = obj[i].getBreit();
				tmp.height = obj[i].getHoch();
				
				tmp2d = tmp.getContext('2d');
				
				
				//tmp2d.drawImage(document.getElementById('canvas'), 0, 0);
				
				var text = obj[i].getTextArr();
				
				tmp2d.fillStyle = '#abcdef';
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