
function Buttion(X, Y, BREIT, HOCH, SART, TEXT, FSIZE, FCOLOR, COLOR, BGCOLOR, KLICKOBJ, STROW){
	
	var x = X;
	var y = Y;
	
	var breit = BREIT;
	var hoch = HOCH;
	
	
	var sart = SART;
	var text = TEXT;
	var fsize = FSIZE;
	
	
	var color = COLOR;
	var fcolor = FCOLOR;
	var bgColor = BGCOLOR;
	
	var klickObj = KLICKOBJ;
	
	var strokeWidth = STROW;
	
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	
	this.getBreit = function(){
		return breit;
	}
	this.getHoch = function(){
		return hoch;
	}
	
	this.getBGColor = function(){
		return bgColor;
	}
	
	this.getStrokeWidth = function(){
		return strokeWidth;
	}
	
	this.getSrift = function(){
		return sart;
	}
	this.getText = function(){
		return text;
	}
	this.getFontSize = function(){
		return fsize;
	}
	
	this.getColor = function(){
		return color;
	}
	this.getFillColor = function(){
		return fcolor;
	}
	
	this.getKlickObj = function(){
		return klickObj;
	}
	
}

function ButtionImg(IMG, X, Y, BREIT, HOCH, KLICKOBJ){
	
	var x = X;
	var y = Y;
	
	var img = IMG;
	
	var breit = BREIT;
	var hoch = HOCH;
	
	
	var klickObj = KLICKOBJ;
	
	
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	
	this.getImage = function(){
		return img;
	}
	
	this.getBreit = function(){
		return breit;
	}
	this.getHoch = function(){
		return hoch;
	}
	
	this.getKlickObj = function(){
		return klickObj;
	}
	
}


function Text(X, Y, RADIUS, SART, TEXT, FSIZE, FCOLOR, COLOR, STROW, MAXLEN, ALIGN, FROMCENTER){
	
	var x = X;
	var y = Y;
	
	var radius = RADIUS;
	
	var sart = SART;
	var text = TEXT;
	var fsize = FSIZE;
	
	
	var fcolor = FCOLOR;
	var color = COLOR;
	
	var strokeWidth = STROW;
	var maxWidth = MAXLEN;
	
	var align = ALIGN;
	
	var fromcenter = FROMCENTER;
	
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	
	this.getStrokeWidth = function(){
		return strokeWidth;
	}
	
	this.getRadius = function(){
		return radius;
	}

	this.getSrift = function(){
		return sart;
	}
	this.getText = function(){
		return text;
	}
	this.getFontSize = function(){
		return fsize;
	}
	
	this.getColor = function(){
		return color;
	}
	this.getFillColor = function(){
		return fcolor;
	}
	
	this.getMaxWidth = function(){
		return maxWidth;
	}
	this.getAlign = function(){
		return align;
	}
	this.getFromCenter = function(){
		return fromcenter;
	}
	
	
	
	this.updateText = function(upText){
		text = upText;
	}
	
}



function ScrollText(X, Y, BREIT, HOCH, SART, TEXTARR, FSIZE, FCOLOR, COLOR, STROW, BGCOLOR){
	
	var x = X;
	var y = Y;
	var breit = BREIT;
	var hoch = HOCH;
	
	var sart = SART;
	var textArr = TEXTARR;
	var fsize = FSIZE;
	
	var fcolor = FCOLOR;
	var color = COLOR;
	var bgColor = BGCOLOR;
	
	var strokeWidth = STROW;
	
	var scrolled = 0;// px
	
	var scrollbarSize = 20;
	
	var maxScrollDown = ((fsize+ 3) * (textArr.length)) - hoch + 3;
	if(maxScrollDown <= 0){
		maxScrollDown = 0;
	}
	
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	this.getHoch = function(){
		return hoch;
	}
	this.getBreit = function(){
		return breit;
	}
	this.getStrokeWidth = function(){
		return strokeWidth;
	}
	this.getSrift = function(){
		return sart;
	}
	this.getTextArr = function(){
		return textArr;
	}
	this.getFontSize = function(){
		return fsize;
	}
	this.getColor = function(){
		return color;
	}
	this.getFillColor = function(){
		return fcolor;
	}
	this.getScrolled = function(){
		return scrolled;
	}
	this.getScrollbarSize = function(){
		return scrollbarSize;
	}
	this.getBgColor = function(){
		return bgColor;
	}
	
	
	this.ScrollUp = function(px){
		scrolled -= px;
		if(scrolled < 0){scrolled = 0;}
	}
	this.ScrollDown = function(px){
		scrolled += px;
		if(scrolled > maxScrollDown){scrolled = maxScrollDown;}
	}
	
	
	this.getScrollPosion = function(){
		
		var scrollbarPosition = ((hoch - scrollbarSize) / maxScrollDown) * scrolled;
		
		
		return scrollbarPosition;
	}
	/*
	this.updateText = function(upText){
		text = upText;
	}
	*/
}












/*
	INPUT Feld
	
	obj = {
		ART	: "Text",	// Atrt
		MAX : 20		//Text Länge
	}
	obj = {
		ART	: "number",	// Atrt
		MIN : 5			//Kleinste Zahl
		MAX : 20		//Größte Zahl
	}
*/

//CInput(breit/2, (hoch/2)+(40*3), 100, 30, "Arial", 40, "#000000", "#1fcc10", "#00ff00" ,0.01, {ART : "Text", MAX : 20}

function CInput(X, Y, BREIT, HOCH, SART, SGROß, SCOLOR, SCOLORW, BGCOLOR, STROW, OBJ){
	
	var self = this;
	var x = X;
	var y = Y;
	var breit = BREIT;
	var hoch = HOCH;
	var sart = SART;
	var fsize = SGROß;
	var sColor = SCOLOR;
	var fcolor = SCOLORW;
	var bgColor = BGCOLOR;
	var strokeWidth = STROW;
	var obj = OBJ;	
	
	
	var text = "";
	
	//Cursor Position
	var cursorPos = 3;
	var cursorShow = false;
	var isfocus = false;
	
	
	this.getCursorPos = function(){
		return cursorPos;
	}
	this.setCursorPos = function(cX, cY){
		
		cX = cX - self.getTextX();
		cY = cY - self.getTextY();
		
		var elem = document.createElement("div");
		
		document.body.appendChild(elem);
		
		elem.style.position = "absolute";
		elem.style.top = "0";
		elem.style.left = "0";
		
		elem.style.width = "auto";
		elem.style.height = "auto";
		elem.style.fontSize = fsize;
		elem.style.fontFamily = sart;
		
		
		
		var done = false;
		
		for(var i=0;i<text.length;i++){
			
			
			elem.innerHTML = text.substr(0,i);
			var ty1 = elem.clientWidth;
			
			elem.innerHTML = text.substr(0,i+1);
			var ty2 = elem.clientWidth;
			
			//console.log(ty1);
			
			if(cX >= ty1 && cX <= ty2){
			
				cursorPos = i;
				
				cursorShow = true;
				done = true;
				break;
			}
		}
		if(!done){
			cursorPos = text.length;
		}
		
		document.body.removeChild(elem);
		
	}
	
	
	this.setFocus = function(bool){
		isfocus = bool;
	}
	this.isFocus = function(){
		return isfocus;
	}
	
	
	
	this.input = function(e){
		
		var key = e.key;
		var done = false;
		
	//	console.log(e);
		
		
		switch(e.keyCode){
		
			//Steuerung
			case 17:
			break;
			
			//Backspace
			case 8:
				if(cursorPos > 0){
					
					if(keypres[17]){
						var baum = false;
						for(var i = cursorPos-1; i > 0; i--){
							
							if(text.substr(i-1, 1) == " "){
								baum = true;
							}else if(baum){
								text = text.substr(0,i) + text.substr(cursorPos, text.length) + "";
								cursorPos = i;
								break;
							}
						}
						if(!baum){
							text = text.substr(0,i) + text.substr(cursorPos, text.length) + "";
							cursorPos = 0;
						}
						
					}else{
						text = text.substr(0,cursorPos-1) + text.substr(cursorPos, text.length) + "";
						cursorPos--;
					}
				}
				
				done = false;
			break;
			
			//Delete | Entf
			case 46: 
				if(cursorPos < text.length){
				
					if(keypres[17]){
						var baum = 0;
						for(var i = cursorPos+1; i < text.length; i++){
							
							if(text.substr(i, 1) == " "){
								baum = 1;
							}else if(baum == 1){
								baum = 2;
								text = text.substr(0,cursorPos) + text.substr(i, text.length) + "";
								break;
							}
						}
						if(baum < 2){
							text = text.substr(0,cursorPos);
							cursorPos = text.length;
						}
						
					}else{
						text = text.substr(0,cursorPos) + text.substr(cursorPos+1, text.length) + "";
					}
					console.log(cursorPos);
				}
				done = false;
			break;
			
			//ArrowRight
			case 39: 
				
				if(keypres[17]){
					var baum = 0;
					for(var i = cursorPos+1; i < text.length; i++){
						
						if(text.substr(i, 1) == " "){
							baum = 1;
						}else if(baum){
							baum = 2;
							cursorPos = i;
							break;
						}
					}
					if(baum < 2){
						cursorPos = text.length;
					}
					
				}else{
					cursorPos++;
				}
				if(cursorPos > text.length){
					cursorPos = text.length;
				}
			break;
			
			//ArrowLeft
			case 37: 
				if(keypres[17]){
					var baum = false;
					for(var i = cursorPos-1; i > 0; i--){
						
						if(text.substr(i-1, 1) == " "){
							baum = true;
						}else if(baum){
							cursorPos = i;
							break;
						}
					}
					if(!baum){
						cursorPos = 0;
					}
				}else{
					cursorPos--;
				}
				if(cursorPos < 0){
					cursorPos = 0
				}
			break;
			
		}
		
		switch(obj.ART){
			case "Number":
				if(key % 1 === 0 && key != " "){
					done = true;
					
					if(obj.MAX != null && obj.MAX < parseInt("" + text.substr(0,cursorPos) + "" + key + "" + text.substr(cursorPos, text.length) + "") ){
						text = "" + obj.MAX;
						cursorPos = text.length;
						done = false;
					}
					
				}
			break;
			case "Text":
			
				if(key % 1 === 0 && key != " "){
					done = true;
				}
				if(key.length == 1){
					done = true;
				}
				
				
				if(obj.MAX != null && obj.MAX <= text.length){
					done = false;
				}
				
			break;
		}
		if(done == true){
			text = "" + text.substr(0,cursorPos) + "" + key + "" + text.substr(cursorPos, text.length) + "";
			
			
			if(obj.ART == "Number" && text.length > 1 && text.substr(0,1) == "0"){
				text = text.substr(1,text.length);
				cursorPos = 0;
			}else{
				cursorPos++;
			}
		}
		
		cursorShow = true;
	}
	
	this.isCursorShow = function(){
	
		if(isfocus == false)
			return false;
			
		return cursorShow;
	}
	
	setInterval(function(){
		cursorShow = (!cursorShow);
	},400);
	
	
	
	this.getTextX = function(){
		return x - (breit/2) + 3;
	}
	this.getTextY = function(){
		return y + (hoch/2) - (fsize/2);
	}
	
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	this.getHoch = function(){
		return hoch;
	}
	this.getBreit = function(){
		return breit;
	}
	this.getStrokeWidth = function(){
		return strokeWidth;
	}
	this.getSrift = function(){
		return sart;
	}
	this.getFontSize = function(){
		return fsize;
	}
	this.getColor = function(){
		return sColor;
	}
	this.getFillColor = function(){
		return fcolor;
	}
	this.getBGColor = function(){
		return bgColor;
	}
	this.getText = function(){
		return text;
	}
	
	
}














