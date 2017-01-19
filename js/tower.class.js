
/*
tobj = {
	
	//Aussehen des Turms
	type:		1,
	
	
	//Leben
	live: 		100,
	
	//Angriff schaden
	attack: 	4,
	
	//Nachlade Zeit
	reload: 	0.1,
	
	//Schuss Radius
	radius: 	10,
	
	X: 1,//Spawn position
	Y: 1,//Spawn position
	Z: 1,//Spawn position
}
*/

function Tower(tobj){

	var self = this;
	
	var geometry 	= null;
	var material 	= null;
	var mesh 		= null;
	
	
	switch(tobj.type){
		case 1:
			geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
			material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
		break;
		case 2:
			geometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 10 );
			material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
		break;
		case 3:
			
			geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
			
			var material = Textures.Gegner[2].material;
			
			
		break;
	}
	
	mesh = new THREE.Mesh( geometry, material );
	
	
	//mesh.geometry.parameters.depth;
	//mesh.geometry.parameters.height;
	//mesh.geometry.parameters.width;
	
	if(tobj.X != null){
		mesh.position.x = tobj.X;
	}
	if(tobj.Y != null){
		mesh.position.y = tobj.Y + (mesh.geometry.parameters.height/2);
	}
	if(tobj.Z != null){
		mesh.position.z = tobj.Z;
	}
	
	
	
	
	geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( 0, 0, 0 ),
		new THREE.Vector3( 0, 0, 0 )
	);
	
	
	
	this.getMesh = function(){
		return mesh;
	}
	
	this.setX = function(x){
		mesh.position.x = x;
	}
	this.setY = function(y){
		mesh.position.y = y;
	}
	this.setZ = function(z){
		mesh.position.z = z;
	}
	
	this.getX = function(){
		return mesh.position.x;
	}
	this.getY = function(){
		return mesh.position.y;
	}
	this.getZ = function(){
		return mesh.position.z;
	}
	
	
	function distanceVector( v1, v2 )
	{
		var dx = v1.x - v2.x;
		var dy = v1.y - v2.y;
		var dz = v1.z - v2.z;

		return Math.sqrt( dx * dx + dy * dy + dz * dz );
	}
	
}
