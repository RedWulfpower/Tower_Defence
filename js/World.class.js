






function Welle(GEGNERARR){
	var self = this;
	var gegnerarr = GEGNERARR;
	
	
	var wst = {
		start	:	0,
		runn	:	1,
		end		:	2,
	};
	
	
	var status = wst.start;
	
	
	this.canStart = function(){
		
		if(status == wst.start){
			return true;
		}
		
		return false;
	}
	this.Start = function(){
		if(self.canStart()){
			status = wst.runn;
			return clone(gegnerarr);
		}
		
	}
}




function World(WELLEARR){
	var self = this;
	
	var welleArr = WELLEARR;
	
	
	
	var aktwelle = 0;
	
	
	
	this.startWelle = function(){
		
		if(welleArr[aktwelle].canStart()){
			
			var gegner = welleArr[aktwelle].Start();
			
		}
		
	}
	
	
	
	
	
	
	
	
}

