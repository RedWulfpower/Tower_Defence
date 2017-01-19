/*
width — Width of the sides on the X axis.
height — Height of the sides on the Y axis.
depth — Depth of the sides on the Z axis.
*/
String.prototype.hexEncode = function(){
    
    return parseInt(this, 16)
}
function distanceVector( v1, v2 )
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

var goption = {
	
	WorldArr 	: Array(),
	aktWorld	: 0,
	
	gStateEnum : {
		Game 	: 0,
		Menu 	: 1,
		Pause 	: 2,
	},
	pStateEnum : {
		none 			: 0,
		Option 			: 10,
		
		Tastenbelegung 	: 20,
		
		Changelog 		: 30,
		Credits 		: 40,
		
		
	},
	
	aktState 	: 0,
	aktPState 	: 0,
	
	GState : function(state){
		
		
		if(state == goption.gStateEnum.Game){
		
			if(goption.stop == true){
				goption.stop = false;
				//render();
			}
		}
		if(state == goption.gStateEnum.Menu){}
		if(state == goption.gStateEnum.Pause){
			goption.stop = true;
		}
		
		Oberflache.showElement(state);
		goption.aktState = state;
		
	},
	
	PState : function(state){
		
		
		
		switch(state){
			case goption.pStateEnum.none: 
				goption.GState(goption.aktState);
				
			break;
			case goption.pStateEnum.Option: 
				
			break;
			case goption.pStateEnum.Tastenbelegung: 
				
			break;
		}
		
		if(state != goption.pStateEnum.none && goption.aktState == goption.pStateEnum.Game){
			
			goption.GState(goption.pStateEnum.Option);
			
		}
		
		goption.aktPState = state;
		Oberflache.showPElement(state);
		
	},


	
	
	
	
	//bbreit	: 800,
	//bhoch	: 600,
	bbreit	: window.innerWidth,
	bhoch	: window.innerHeight,
	
	stop	: false,
	
	cam		: 1,
	mouseDown : false,
	
	camera :{
		x :3,
		y :0,
		z :10,
	},
	
	frameRate	: 60,
	fps			: 0,
	fpslast		: 0,
	Dfps		: new Date(),
	DfpsR		: new Date(),
	
};

var keys = {
	
	KUp 		: 38,
	KDown 		: 40,
	KRight 		: 39,
	KLeft 		: 37,
	
	KUpAlt 		: 87,
	KDownAlt	: 83,
	KRightAlt 	: 68,
	KLeftAlt 	: 65,
	
	KRLeftAlt	: 81,
	KRRightAlt	: 69,
	
	KFast		: 16,
	
	zoom 		: 90,
	
	
	menu 		: 27,
};
/*
var gegnerMovetmp = {
	"pos" : [
		{x: 0, 	y: 15, 	z : 0 },
		{x: 10, y: 10, 	z : -10 },
		
		{x: 20, y: 0.01, 	z : 20 },
		
	]
};
*/



function smoothy( pointArr) {
	
	var SUBDIVISIONS = 15;
	var arr = Array();
	
	for(var i = 0 ; i < pointArr.length; i++){
	
		
		
		var C = pointArr[(i -1 == -1 ? pointArr.length -1 : i-1) ];
		var B = pointArr[i  ];
		var A = pointArr[(i +1 == pointArr.length ? 0 : i+1)];
		
		var vA = new THREE.Vector3(A.x,A.y,A.z);
		var vB = new THREE.Vector3(B.x,B.y,B.z);
		var vC = new THREE.Vector3(C.x,C.y,C.z);
		
		var BA = new THREE.Vector3().subVectors(vB,vA).normalize().multiplyScalar(-3).add(vB);
		var BC = new THREE.Vector3().subVectors(vB,vC).normalize().multiplyScalar(-3).add(vB);
		
		//console.log(BA);
		//console.log(B);
		//console.log(BC);
		
		var curve = new THREE.QuadraticBezierCurve3();
		curve.v0 = new THREE.Vector3(BA.x,BA.y,BA.z);
		curve.v1 = new THREE.Vector3(B.x,B.y,B.z);
		curve.v2 = new THREE.Vector3(BC.x,BC.y,BC.z);
		
		//arr.splice(i, 1);
		
		for (j = 1; j < SUBDIVISIONS-1; j++) {
			var Mp = curve.getPoint(1- j / SUBDIVISIONS);
			
			var M = clone(B);
			M.x = Mp.x;
			M.y = Mp.y;
			M.z = Mp.z;
			
			arr.push(M);
		}
	}
	return arr;
}



var keypres = Array(300);




var Textures = {
	"Gegner":[
		{},
		{},
		{},
		{},
	],

};

function loadAllTextures(){
	
	
	var materials = [
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("images/crate.jpg")}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("images/crate.jpg")}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("images/crate.jpg")}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("images/crate.jpg")}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("images/crate.jpg")}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("images/crate.jpg")})
	];
	Textures.Gegner[2].material = new THREE.MeshFaceMaterial(materials);
	
}




var GegnerArr = [

	{type:1, live: 100, attack: 4, reload: 0.1, radius: 10 },
	{type:1, live: 100, attack: 4, reload: 0.1, radius: 10 },

];


var gegnerMovetmp = [
	{x: 0, 		y: 20, 		z : 0	},
	{x: 1, 		y: 2, 		z : 10	},
	{x: 15,		y: 0.01, 	z : 15	},
	{x: 10,		y: 10, 		z : 10	},
	{x: -10, 	y: 0.01, 	z : 15	},
	{x: -10, 	y: 0.01, 	z : -15	},
	{x: -20, 	y: 0.01, 	z : -15	},
	{x: -20, 	y: 10,		z : -5	},
	{x: -6, 	y: 6,		z : -2	},
	{x: 20, 	y: 2, 		z : 10	},
	{x: 20, 	y: 0.01, 	z : -20	},
	{x: 5, 		y: 3, 		z : -5	},
	{x: 20, 	y: 0.01, 	z : 10	},
	{x: 24, 	y: 0.01, 	z : 24	},
	{x: 0, 		y: 1, 		z : 24	},
	{x: -24, 	y: 0.01, 	z : 24	},
	{x: -24, 	y: 20, 		z : 12	},
	{x: -24, 	y: 0.01, 	z : -24	},
	{x: -12, 	y: 5, 		z : -24	},
	{x: 0, 		y: 1, 		z : -20	},
	{x: -10, 	y: 3, 		z : -10	},
	{x: 0, 		y: 3, 		z : -5	},
	{x: 10, 		y: 2, 		z : -20	},
	{x: 24, 	y: 0.01, 	z : -24	},
	//{x: 0,  	y: 20, 		z : 0	},
];

var gegnerMove = Array();
// smooth dat thingy
gegnerMove = smoothy(gegnerMovetmp);


