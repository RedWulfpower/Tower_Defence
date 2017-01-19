
function WelleClass(GEGNERARR){
	
	/*
		Array(
			Array(new Gegner, WegArr, Anzahl)
		),
		...
	*/
	var GegnerArr = GEGNERARR;
	
	var world = null;
	
	var gegnernum = new Array(GegnerArr.length);
	for(var x=0;x<gegnernum.length;x++){
		gegnernum[x] = 0;
	}
	var status = 0;
	
	this.getStatus = function(){
		return status;
	}
	
	this.start = function(WORLD){
		world = WORLD;
		
		if(status == 0){
			status = 1;
			for(var i=0;i<GegnerArr.length;i++){
				runGegner(i);
			}
		}
	}
	
	this.restart = function(){
		if(status == 0 || status == 3){
			for(var x=0;x<gegnernum.length;x++){
				gegnernum[x] = 0;
			}
			status = 0;
			this.start();
		}
	}
	
	this.reset = function(){
		for(var x=0;x<gegnernum.length;x++){
			gegnernum[x] = 0;
		}
		status = 0;
		
	}
	
	function runGegner(id){
	
		if(status == 1 && gegnernum[id] != -1 && gegnernum[id] != null ){
			
			gegnernum[id]++;
			
			world.addGegner(this, new GegnerSpiel( GegnerArr[id][1][0], GegnerArr[id][0],GegnerArr[id][1]) );
			
			if(gegnernum[id] >=  GegnerArr[id][2]){
			
				var count = 0;
				gegnernum[id] = -1;
				for(var i=0;i<GegnerArr.length;i++){
					if(gegnernum[id] == -1){
						count++;
					}
				}
				if(count == GegnerArr.length){
					status = 3;
				}
				
				
			}else{
				setTimeout(function(){runGegner(id);},100);
			
			}
			
		}
	}
}