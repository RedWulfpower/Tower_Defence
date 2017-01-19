function Gebaude(NAME, Img,ImgH,ImgW,  Range, HP, Schaden,reloadTime, COASTS){
	
	var self = this;
	
	var img = Img;
	var imgh = ImgH;
	var imgw = ImgW;
	
	var hp = HP;
	
	var name = NAME;
	
	var coasts = COASTS;
	
	
	//angriff
	var range = Range;
	var schaden = Schaden;
	
	var rTime = reloadTime;
	
	this.getCoasts = function(){
		return coasts;
	}
	this.getImage = function(){
		return img;
	}
	this.getImgH = function(){
		return imgh;
	}
	this.getImgW = function(){
		return imgw;
	}
	
	this.getRange = function(){
		return range;
	}
	this.getHP = function(){
		return hp;
	}
	this.getSchaden = function(){
		return schaden;
	}
	this.getReloadTime = function(){
		return reloadTime;
	}
	
	this.getName = function(){
		return name;
	}
}


function GebaudeSpiel(PosX,PosY, GEBEUDE){
	
	var self = this;
	
	var x = PosX;
	var y = PosY;
	
	var Gebaude = GEBEUDE;
	var hp = Gebaude.getHP();
	
	var img = Gebaude.getImage();
	var imgH = Gebaude.getImgH();
	var imgW = Gebaude.getImgW();
	
	//angriff
	var range = Gebaude.getRange();
	var schaden = Gebaude.getSchaden();
	var rTime = Gebaude.getReloadTime();
	
	
	var canAtack = false;
	var angrifGegner = 0;
	var isangreif = false;
	
	var isreload = false; // läd nach ? 
	var ReloadTimer;
	
	var festung = false;
	
	var kills = 0;
	
	this.getKills = function(){
		return kills;
	}
	this.getHp = function(){
		return hp;
	}
	this.getX = function(){
		return x;
	}
	this.getY = function(){
		return y;
	}
	
	this.getImage = function(){
		return img;
	}
	this.getImgH = function(){
		return imgH;
	}
	this.getImgW = function(){
		return imgW;
	}
	this.getRange = function(){
		return range;
	}
	this.getSchaden = function(){
		return schaden;
	}
	this.getRTime = function(){
		return rTime;
	}
	this.getName = function(){
		return Gebaude.getName();
	}
	this.getGebaudeClass = function(){
		return Gebaude;
	}
	this.isFestung = function(){
		return festung;
	}
	
	
	
	
	this.setImg = function(newWert){
		img = newWert;
	}
	this.setImgW = function(newWert){
		imgW = newWert;
	}
	this.setImgH = function(newWert){
		imgH = newWert;
	}
	this.setFestung = function(newWert){
		festung = newWert;
	}
	
	
	
	
	this.angrif = function( tagetGegner ){
		
		angrifGegner = tagetGegner;
		
		//Gegner


		var dx = angrifGegner.getX() - x;
		var dy = angrifGegner.getY() - y;
		var distance = Math.sqrt(dx * dx + dy*dy);
		
		
		if(distance < (angrifGegner.getImgH() / 2) +  range  ){
			isangreif = true;
			return self.atack();
			
		}else{
			angrifGegner = 0;
		}
		return false;
	}
	
	this.isAngrif = function(){
		return isangreif;
	}
	this.isReload = function(){
		return isreload;
	}
	this.atack = function(){
		
		if(isangreif && angrifGegner != null){
			
			if(angrifGegner.getHP() <= 0){
				angrifGegner = 0;
				isangreif = false;
				return false;
			}
			
			var returnVar = angrifGegner;
			
			
			var dx = angrifGegner.getX() - x;
			var dy = angrifGegner.getY() - y;
			var distance = Math.sqrt(dx * dx + dy*dy);
			
			if(distance < (angrifGegner.getImgH() / 2) +  range  ){
				isangreif = true;
				
				if(!isreload){
					
					isreload = true;
					
					angrifGegner.atack(schaden);
					
					ReloadTimer = window.setTimeout(ShowReloadTimer, rTime * 1000);
					
					if(0 >= angrifGegner.getHP()){
						angrifGegner = 0;
						isangreif = false;
						kills++;
					}
	
				}
				
			}else{
				angrifGegner = 0;
				isangreif = false;
			}
			return returnVar;
		}
		return false;
	}
	function ShowReloadTimer(){
		isreload = false;
	}
	
	this.kill = function(schadenHp){
		hp -= schadenHp;
		if(hp <= 0){
			hp = -1;
		}
		
		return hp;
	}
	
	
}
