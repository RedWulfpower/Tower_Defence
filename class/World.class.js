
function WorldClass(NAME, HOCH, BREIT, BGARRAY, TOWERARRAY, WellenArray, MONEY, EndArr){
	
	var hoch = HOCH;
	var breit = BREIT;
	
	var BGArray = BGARRAY;
	var BGGes = BGArray[BGArray.length-1];
	BGArray.splice(BGArray.length-1,1);
	
	var BuildungList = Array();
	var GegnerList = Array();
	
	var welle = 0;
	
	this.GameOberflaeche = null;
	
	var amoney = MONEY;
	var money = MONEY;
	
	var name = NAME;
	var allowTowerArr = TOWERARRAY;
	
	var wellenarray = WellenArray;
	
	var lost = false;
	

	/*img, End Position, Breit, Hoch*/ 
	var endArr = EndArr;
	
	for(var i=0;i<endArr.length;i++){
		
		var obj = new GebaudeSpiel(endArr[i][1].getX(),endArr[i][1].getY(),Game.Building[0]);
		obj.setImg(endArr[i][0]);
		obj.setImgW(endArr[i][2]);
		obj.setImgH(endArr[i][3]);
		obj.setFestung(true);
		
		BuildungList.push( obj );
		
	}
	
	
	
	
	this.getBG = function(){
		return BGArray;
	}
	this.getBGImg = function(){
		return BGGes.getImg();
	}
	
/*	this.getEndPos = function(){
		return endArr;
	}
*/	
	this.getMoney = function(){
		return money;
	}
	this.addMoney = function(MONNEY){
		money += MONNEY;
	}
	
	this.buyTower = function(x, y, Tobj){

		if(!lost && money >= Tobj.getCoasts()){
			
			// PosX,PosY,Img, ImgH,ImgW, Range, HP,Schaden,reloadTime
			BuildungList.push(  new GebaudeSpiel(x,y,Tobj));
			money -= Tobj.getCoasts();
		}
	}
	
	
	this.getHoch = function(){
		return hoch;
	}
	this.getBreit = function(){
		return breit;
	}
	
	this.isLost = function(){
		return lost;
	}
	this.getBuildungList = function(){
		return BuildungList;
	}
	
	this.getGegnerList = function(){
		return GegnerList;
	}
	
	this.addGegner = function(fromObj, obj){
		if(!lost){
			GegnerList.push(obj);			
		}
		/*
		console.log(wellenarray[welle] == fromObj);
		console.log(fromObj);
		console.log(wellenarray[welle]);
		
		if(wellenarray[i] == fromObj){
			
			GegnerList.push(obj);
			return true;
		}
		return false;
		*/
	}
	
	
	this.getBuildungAnzahl = function(id){
		var count = 0;
		for(var i=0;i<BuildungList.length;i++){
			
			if(BuildungList[i].getGebaudeClass() == allowTowerArr[id]){
				count++;
			}
		}
		return count;
	}
	
	this.getName = function(){
		return name;
	}
	this.getWelle = function(){
		
		this.checkWelle();
		
		return welle;
	}
	this.getMaxWelle = function(){
		return wellenarray.length;
	}
	this.getAllowTowerArr = function(){
		return allowTowerArr;
	}
	
	this.getWellenArray = function(){
		return wellenarray;
	}
	
	this.newGame = function(){
		
		welle = 0;
		BuildungList = Array();
		GegnerList = Array();
		money = amoney;
		
		for(var i=0;i<wellenarray.length;i++){
			wellenarray[i].reset();
		}
		for(var i=0;i<endArr.length;i++){
			
			var obj = new GebaudeSpiel(endArr[i][1].getX(),endArr[i][1].getY(),Game.Building[0]);
			obj.setImg(endArr[i][0]);
			obj.setImgW(endArr[i][2]);
			obj.setImgH(endArr[i][3]);
			obj.setFestung(true);
			
			BuildungList.push( obj );
		}
		lost = false;
		this.GameOberflaeche.hideBuildingInfo();
		this.GameOberflaeche.create();
		
		
	}
	
	this.nextWelle = function(){
		if(!lost && wellenarray[welle].getStatus() == 0){
			
			wellenarray[welle].start(this);
			
			
			return true;
		}
		return false;
	}
	this.checkWelle = function(){
		
		if(lost){return false;}
		
		if(wellenarray[welle].getStatus() == 0){
			return true;
		}
		if(wellenarray[welle].getStatus() == 3 && GegnerList.length == 0){
			if(wellenarray.length > welle+1){
				welle++;
				return true;
			}
			else{
				return false;
			}
		}
		if(welle == 0 && GegnerList.length == 0){
			return true;
		}
		return false;
	}
	
	this.RemoveBuildingObj = function(obj){
		
		var ZeigeStatus = this.GameOberflaeche.getZeigeStatus();
		
		for(var i=0;i<BuildungList.length;i++){
				
			if(BuildungList[i] == obj){
				
				if(ZeigeStatus.aktuell == ZeigeStatus.TowerZeig && ZeigeStatus.TowerZeigObj == obj){
					this.GameOberflaeche.hideBuildingInfo();
				}
				BuildungList.splice(i,1);
				break;
			}
		}
		var countFest = 0;
		for(var i=0;i<BuildungList.length;i++){
			if(BuildungList[i].isFestung() == true){
				countFest++;
			}
		}
		if(countFest == 0){
			lost = true;
			console.log("VERLOREN!!!!!!!!!!!!!");
		}
	}
	
	
	
}
// World[AktWorld].getBreit()