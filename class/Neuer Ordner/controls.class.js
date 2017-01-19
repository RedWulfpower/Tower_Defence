
var Controls = {
	/*
		K = Kamera 
	*/
	

	
	KUp 		: 87,/* W */
	KUpAlt 		: 38,/* Pfeil Hoch */
	KRight 		: 68,/* D */
	KRightAlt	: 39,/* Pfeil Rechts */
	KLeft		: 65,/* A */
	KLeftAlt	: 37,/* Pfeil Links */
	KDown		: 83,/* S */
	KDownAlt	: 40,/* Pfeil Runter */
	
	kFast		: 16,/* Shift */
	kFastAlt	: null,
	
	pmulti		: 17,/* Strg -> mehere Tower platzieren*/
	pmultiAlt	: null,
	
	Option		: 27, /* ESC */
	OptionAlt	: 19, /* Pause */
}


function KeyToChar(key){

	switch(key){
		case null:{
			str = "";
		}break;
		case 0:{
			str = "";
		}break;
		case 38:{
			str = "Pfeil hoch";
		}break;
		case 39:{
			str = "Pfeil rechts";
		}break;
		case 37:{
			str = "Pfeil links";
		}break;
		case 40:{
			str = "Pfeil runter";
		}break;
		case 27:{
			str = "ESC";
		}break;
		case 16:{
			str = "Shift";
		}break;
		case 17:{
			str = "Strg";
		}break;
		case 222:{
			str = "Ä";
		}break;
		case 192 :{
			str = "Ö";
		}break;
		case 186:{
			str = "Ü";
		}break;
		case 32:{
			str = "Lehrtaste";
		}break;
		case 19:{
			str = "Pause";
		}break;
		
		default:
			str = String.fromCharCode(key);
			
	}
	return str;
}