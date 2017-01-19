
/*
gobj = {
	
	//Aussehen des Gegners
	type:		1,
	
	//Langsamste Geschwindigkeit
	speed:		3,
	
	//Leben
	live: 		100,
	
	//Angriff schaden
	attack: 	4,
	
	//Nachlade Zeit
	reload: 	0.1,
	
	//Schuss Radius
	radius: 	10
	
	X: 1,//Spawn position
	Y: 1,//Spawn position
	Z: 1,//Spawn position
	
}
*/

function Gegner(gegnerMove,gobj){
	var self = this;
	
	var positzions = clone(gegnerMove);
	
	var speed = 2;
	var aktspeed = speed;
	
	var vx = 0;
	var vy = 0;
	var vz = 0;
	
	var PosIs = 0;
	
	var geometry 	= null;
	var material 	= null;
	var mesh 		= null;
	
	//var geometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 10 );
	switch(gobj.type){
		case 1:
			geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
			material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
			mesh = new THREE.Mesh( geometry, material );
		break;
		case 2:
			geometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 10 );
			material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
			mesh = new THREE.Mesh( geometry, material );
		break;
		case 3:
			
			geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
			
			var material = Textures.Gegner[2].material;
			mesh = new THREE.Mesh( geometry, material );
			
			
		break;
	}
	for(var i=0; i< positzions.length;i++){
		positzions[i].y += (mesh.geometry.parameters.height/2);
	}
	
	
	if(gobj.X != null){
		mesh.position.x = gobj.X;
	}else{
		mesh.position.x = positzions[0].x;
	}
	
	if(gobj.Y != null){
		mesh.position.y = gobj.Y + (mesh.geometry.parameters.height/2);
	}else{
		mesh.position.y = positzions[0].y;
	}
	
	if(gobj.Z != null){
		mesh.position.z = gobj.Z;
	}else{
		mesh.position.z = positzions[0].z;
	}
	
	
	
	
	geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( 0, 0, 0 ),
		new THREE.Vector3( 0, 0, 0 )
	);
	var line = new THREE.Line( geometry, material );
	
	
	
	
	this.getMesh = function(){
		return mesh;
	}
	this.getLine = function(){
		return line;
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
	
	this.reesetwegpunt = function(){
		var posid = 0;
		var distance = 100000;
		
		for(var i=0;i<positzions.length;i++){
			if(distance > distanceVector(mesh.position,positzions[i])){
				posid = i;
				distance = distanceVector(mesh.position,positzions[i]);
			}
		}
		PosIs = posid;
	}
	
	function distanceVector( v1, v2 )
	{
		var dx = v1.x - v2.x;
		var dy = v1.y - v2.y;
		var dz = v1.z - v2.z;

		return Math.sqrt( dx * dx + dy * dy + dz * dz );
	}
	
	
	this.Move = function(movep){
		var rekrus = true;
		if(movep == null){
			movep = aktspeed;
			rekrus = false;
		}
		
		
		var dx = positzions[PosIs].x - mesh.position.x;
		var dy = positzions[PosIs].y - mesh.position.y;
		var dz = positzions[PosIs].z - mesh.position.z;
		
		if( (dx*dx+dy*dy+dz*dz) == 0 ){

			PosIs += 1;
			if(positzions.length == PosIs){
				PosIs = 0;
			}
		}
		else{
			var dl = Math.sqrt(dx*dx + dy*dy + dz*dz);
			dx /= dl;
			dy /= dl;
			dz /= dl;
			
			if(!rekrus){
			
				if(dy > 0.01){
				
					aktspeed -= (dy* 0.65);
					//aktspeed = 0.9999;
					if(aktspeed <= speed){
						aktspeed = speed;
					}
					
				}
				else if(dy < -0.01){
					aktspeed += ((dy*dy));
					
				}
				else{
					
					aktspeed -= 0.12;
					if(aktspeed < speed){
						aktspeed = speed;
					}
					
				}
				
				if(positzions[PosIs].art != null && positzions[PosIs].art.breaks != null && positzions[PosIs].art.maxspeed != null){
					if(aktspeed > positzions[PosIs].art.maxspeed){
						aktspeed -= positzions[PosIs].art.breaks;
						if(aktspeed < positzions[PosIs].art.maxspeed){
							aktspeed = positzions[PosIs].art.maxspeed;
						}
					}
				}
				
				
				if(positzions[PosIs].art != null &&positzions[PosIs].art.minspeed > aktspeed){
					aktspeed += positzions[PosIs].art.speed;
					if(aktspeed > positzions[PosIs].art.speed){
						aktspeed = positzions[PosIs].art.speed;
					}
					
				}
				movep = aktspeed;
			}
			
			line.geometry.vertices[0].x = mesh.position.x;
			line.geometry.vertices[0].y = mesh.position.y+0.3;
			line.geometry.vertices[0].z = mesh.position.z;
			
			line.geometry.vertices[1].x = mesh.position.x + vx * 50;
			line.geometry.vertices[1].y = mesh.position.y + vy * 50+0.3;
			line.geometry.vertices[1].z = mesh.position.z + vz * 50;
			
			line.geometry.verticesNeedUpdate = true;
			
			
			mesh.position.x += (vx = (dx/60)*movep);
			mesh.position.y += (vy = (dy/60)*movep);
			mesh.position.z += (vz = (dz/60)*movep);
			
			if(
				mesh.position.x < positzions[PosIs].x+0.05 &&  mesh.position.x > positzions[PosIs].x-0.05 &&
				mesh.position.y < positzions[PosIs].y+0.05 &&  mesh.position.y > positzions[PosIs].y-0.05 &&
				mesh.position.z < positzions[PosIs].z+0.05 &&  mesh.position.z > positzions[PosIs].z-0.05
			){
			
				PosIs += 1;
				if(positzions.length == PosIs){
					PosIs = 0;
				}
				
			}else{
				var dx2 = positzions[PosIs].x - mesh.position.x;
				var dy2 = positzions[PosIs].y - mesh.position.y;
				var dz2 = positzions[PosIs].z - mesh.position.z;
				
				var dot = dx*dx2 + dy*dy2 + dz*dz2;
				
				if(dot < 0){
					mesh.position.x -= vx;
					mesh.position.y -= vy;
					mesh.position.z -= vz;
					
					PosIs += 1;
					if(positzions.length == PosIs){
						PosIs = 0;
					}
					self.Move(movep/2);
				}
			}
			
		}
	}
	
	
}















