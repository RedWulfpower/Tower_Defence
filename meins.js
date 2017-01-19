
function pause(){
	goption.stop = true;
}
function resume(){
	if(goption.stop == true){
		goption.stop = false;
		//render();
	}
}



var geometry = null;
var material = null;


var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( goption.bbreit, goption.bhoch );

document.body.appendChild( renderer.domElement );
//Obere Canvas
document.getElementById('texte').height = renderer.domElement.height;
document.getElementById('texte').width = renderer.domElement.width;

var Oberflache = new COberflache(renderer.domElement.height,renderer.domElement.width);


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var camera = new THREE.PerspectiveCamera( 75, goption.bbreit/goption.bhoch, 0.1, 100 );
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 13;

camera.angle = 0;
camera.radius = 5;
var camera_pivot = new THREE.Object3D();
scene.add( camera_pivot );
camera_pivot.position.set( 0, 0, 0 );
camera.position.x = ((camera.radius * Math.cos( camera.angle )) + camera_pivot.position.x);  
camera.position.z = ((camera.radius * Math.sin( camera.angle )) + camera_pivot.position.z);
camera.position.y = camera.radius*0.6;



var materials = [
	new THREE.MeshBasicMaterial({side: THREE.BackSide, depthWrite: false, map: new THREE.TextureLoader().load("images/clouds.jpg")}),
	new THREE.MeshBasicMaterial({side: THREE.BackSide, depthWrite: false, map: new THREE.TextureLoader().load("images/clouds.jpg")}),
	new THREE.MeshBasicMaterial({side: THREE.BackSide, depthWrite: false, map: new THREE.TextureLoader().load("images/clouds.jpg")}),
	new THREE.MeshBasicMaterial({side: THREE.BackSide, depthWrite: false, map: new THREE.TextureLoader().load("images/clouds.jpg")}),
	new THREE.MeshBasicMaterial({side: THREE.BackSide, depthWrite: false, map: new THREE.TextureLoader().load("images/clouds.jpg")}),
	new THREE.MeshBasicMaterial({side: THREE.BackSide, depthWrite: false, map: new THREE.TextureLoader().load("images/clouds.jpg")})
];

material = new THREE.MeshFaceMaterial(materials);

console.log(material);

geometry = new THREE.BoxGeometry( 70, 70, 70 );

var skybox = new THREE.Mesh( geometry, material );

skybox.position.x = 0;
skybox.position.y = 0;
skybox.position.z = 0;

scene.add( skybox );





geometry = new THREE.PlaneGeometry( 50, 50 );
material = new THREE.MeshLambertMaterial( {color: 0x2aa858, side: THREE.DoubleSide} );

var boden = new THREE.Mesh( geometry, material );
boden.rotation.x = (90/180)*Math.PI;
boden.position.set( 0, 0, 0 );
scene.add( boden );



material = new THREE.LineBasicMaterial({
	color: 0x0000ff
});
geometry = new THREE.Geometry();
for(var i=0;i<gegnerMove.length;i++){
	geometry.vertices.push(
		new THREE.Vector3( gegnerMove[i].x, gegnerMove[i].y, gegnerMove[i].z )
	);
}
geometry.vertices.push(
	new THREE.Vector3( gegnerMove[0].x, gegnerMove[0].y, gegnerMove[0].z )
);
var line = new THREE.Line( geometry, material );
scene.add( line );
//console.log(line);


var towerarr = Array(0);
var towtimeranz = 0;

var towtimer = setInterval(function(){ 

	var tmp = new Tower( {type:3, live: 100, attack: 4, reload: 0.1, radius: 10 });
	towerarr.push(tmp);
	scene.add( tmp.getMesh());
	
	
	if(1 < towtimeranz){
		clearInterval(towtimer);
		
	}
	towtimeranz++; 
	
	
}, 4);


var gegnerarr = Array(0);
	
var gegtimeranz = 0;

var gegtimer = setInterval(function(){ 

	//for(var i=0;i<gegnerarr.length;i++){

	var tmp = new Gegner(gegnerMove,{type:1, live: 100, attack: 4, reload: 0.1, radius: 10 });
	gegnerarr.push(tmp);
	scene.add( tmp.getMesh());
	
	
	if(500 < gegtimeranz){
		clearInterval(gegtimer);
		
	}
	gegtimeranz++; 
	
	
}, 4);




loadAllTextures();




var spotLight = new THREE.SpotLight( 0xffffff, 2, 100 );
spotLight.position.set( 0, 50, 0 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 100;
spotLight.shadow.mapSize.height = 100;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );


geometry	= new THREE.SphereGeometry(1, 32, 32);
material	= new THREE.LineBasicMaterial( {color: 0xffff00} );

var sun		= new THREE.Mesh(geometry, material);
sun.position.set( spotLight.position.x, spotLight.position.y, spotLight.position.z );
scene.add(sun);





window.addEventListener( 'mousemove', function ( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / goption.bbreit ) * 2 - 1;
	mouse.y = - ( event.clientY / goption.bhoch ) * 2 + 1;
}, false );


window.addEventListener("mousedown",function ( e ) {
	
	
	
	if(Oberflache.click(e)){
	
	
	}else{
		
		if(goption.stop == true){
			return;
		}
		
		switch (e.which) {
			
			case 1: 
				mouse.leftDown = true
				//alert('left'); 
				//console.log(event);
				
				
				var intersects = raycaster.intersectObjects( scene.children );
				for ( var i = 0; i < intersects.length; i++ ) {
					
					
					//Ist der Boden
					if(intersects[i].object.uuid == boden.uuid){
						
						var tmp = new Tower( {type:3, live: 100, attack: 4, reload: 0.1, radius: 10 });

						tmp.setX(intersects[i].point.x);
						tmp.setY(intersects[i].point.y);
						tmp.setZ(intersects[i].point.z);
						
						towerarr.push(tmp);
						
						
						scene.add( tmp.getMesh() );
					}
				}
				
			break;
			case 2: 
				mouse.middleDown = true
				//alert('middle');
				
				mouse.Ky = mouse.y;
				mouse.Kx = mouse.x;
				camera.rotation.Ky = camera.rotation.y;
				camera.rotation.Kx = camera.rotation.x;
				
			break;
			case 3: 
				mouse.rightDown = true
				//alert('right'); 
				
				//Neuer gegner
				//var geg = new Gegner(gegnerMove,{type:1, live: 100, attack: 4, reload: 0.1, radius: 10 });
				//gegnerarr.push(geg);
				//scene.add( geg.getMesh() );
				// calculate objects intersecting the picking ray
				var intersects = raycaster.intersectObjects( scene.children );

				
				for ( var i = 0; i < intersects.length; i++ ) {
					
					
					//Ist der Boden
					if(intersects[i].object.uuid == boden.uuid){
						
						var geg = new Gegner(gegnerMove,{type:3, live: 100, attack: 4, reload: 0.1, radius: 10 });
						
						geg.setX(intersects[i].point.x);
						geg.setY(intersects[i].point.y);
						geg.setZ(intersects[i].point.z);
						
						geg.reesetwegpunt();
						
						gegnerarr.push(geg);
						
						
						setTimeout(function(){
							
						},100);
						scene.add( geg.getMesh() );
						//scene.add( geg.getLine() );
						
						//console.log(intersects[i]);
						
						
					}
				}
				
				
				e.preventDefault();
			break; 
		}
	}
}, false);

window.addEventListener( 'mouseup', function ( event ){
	
	switch (event.which) {
	
		case 1: 
			mouse.leftDown = false;
			//alert('left'); 
		break;
		case 2:
			mouse.middleDown = false;
			//alert('middle'); 
		break;
		case 3: 
			mouse.rightDown = false;
			//alert('right'); 
		break; 
	}
}, false );

window.addEventListener( 'wheel', function ( event ){
	//console.log(event);
	
	Oberflache.wheel(event);
	
	
	if(goption.stop == true){
		return;
	}
	
	var acolled = (event.deltaY/50);
	
	
	if(camera.radius + acolled >= 2 && camera.radius + acolled <= 20){
		camera.position.y += acolled;
		camera.radius += acolled;
	}
	if(camera.position.y < 2){
		camera.position.y = 2;
		
	}else if(camera.position.y > 20){
		camera.position.y = 20;
	}
	camera.position.x = ((camera.radius * Math.cos( camera.angle )) + camera_pivot.position.x);  
	camera.position.z = ((camera.radius * Math.sin( camera.angle )) + camera_pivot.position.z);
	
	
}, false );

window.addEventListener( 'keydown', function ( event ) {
	
	Oberflache.keyPress(event);
	
	if(event.keyCode == keys.menu){
		
		if(goption.aktState == goption.gStateEnum.Game){
			goption.GState(goption.gStateEnum.Pause);
		}
		else if(goption.aktState == goption.gStateEnum.Pause){
			goption.GState(goption.gStateEnum.Game);
		}
		
	}
	
	keypres[event.keyCode] = true;
	//console.log(event.keyCode);
	
}, false );
window.addEventListener( 'keyup', function ( event ) {
	keypres[event.keyCode] = false;
}, false );

window.addEventListener( 'resize', function ( event ) {
	goption.bbreit = window.innerWidth;
	goption.bhoch  = window.innerHeight;
    camera.aspect = goption.bbreit / goption.bhoch;
    camera.updateProjectionMatrix();
    renderer.setSize( goption.bbreit, goption.bhoch );
	
	document.getElementById('texte').height = renderer.domElement.height;
	document.getElementById('texte').width = renderer.domElement.width;
	
	Oberflache.resize(renderer.domElement.height,renderer.domElement.width);
	
}, false );








var render = function () {
	if(goption.stop){
	
		var ctx = document.getElementById('texte').getContext('2d');
		Oberflache.draw(ctx);
		
		requestAnimationFrame( render );
		return;
	}
	requestAnimationFrame( render );
	
	for(var i=0;i<gegnerarr.length;i++){
		gegnerarr[i].Move();
	}
	
	//kamera rotation
	var spdx = (mouse.x - mouse.Kx);
	var spdy = (mouse.y - mouse.Ky);
    
	if(mouse.middleDown){
		mouse.Kx = mouse.x;
		mouse.Ky = mouse.y;
		camera.angle += (spdx*1.4);
		camera.position.y += (spdy*10);
		
		
		if(camera.radius > 20){
			camera.radius = 20;
		}
		if(camera.position.y < 2){
			camera.position.y = 2;
			
		}else if(camera.position.y > 20){
			camera.position.y = 20;
		}
		
    }
	
	
	camera.position.x = ((camera.radius * Math.cos( camera.angle )) + camera_pivot.position.x);  
	camera.position.z = ((camera.radius * Math.sin( camera.angle )) + camera_pivot.position.z);
	
	camera.lookAt( camera_pivot.position );
	
	
	var movespeed = 0.1;
	if(keypres[keys.KFast] == true){
		movespeed = 0.2;
	}
	if(keypres[keys.KUp] == true || keypres[keys.KUpAlt] == true){
		camera_pivot.position.x -= Math.cos( camera.angle ) * movespeed;
		camera_pivot.position.z -= Math.sin( camera.angle ) * movespeed;
	}
	if(keypres[keys.KDown] == true || keypres[keys.KDownAlt] == true){
		camera_pivot.position.x += Math.cos( camera.angle ) * movespeed;
		camera_pivot.position.z += Math.sin( camera.angle ) * movespeed;
	}
	if(keypres[keys.KLeft] == true || keypres[keys.KLeftAlt] == true){
		camera_pivot.position.x -= Math.sin( camera.angle ) * movespeed;
		camera_pivot.position.z += Math.cos( camera.angle ) * movespeed;
	}
	if(keypres[keys.KRight] == true || keypres[keys.KRightAlt] == true){
		camera_pivot.position.x += Math.sin( camera.angle ) * movespeed;
		camera_pivot.position.z -= Math.cos( camera.angle ) * movespeed;
	}
	
	
	
	if(keypres[keys.zoom] == true){
		camera.zoom = 5;
		camera.updateProjectionMatrix();
	}else if(camera.zoom > 1){
		camera.zoom = 1;
		camera.updateProjectionMatrix();
	}
	
	//var divy = gegnerarr[0].getY() - camera_pivot.position.y;
	//
	//camera.position.y += divy;
	//
	//camera_pivot.position.x = gegnerarr[0].getX();
	//camera_pivot.position.y = gegnerarr[0].getY();
	//camera_pivot.position.z = gegnerarr[0].getZ();
	
	
	
	
	
	
	
	
	
	//camera_pivot.position.set( boden.getWorldPosition() );
	
	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, camera );
	
	renderer.render(scene, camera);
	


	var ctx = document.getElementById('texte').getContext('2d');
	
	Oberflache.draw(ctx);
	
	var aktTime = new Date();
	
	
	goption.fps ++;
	
	
	//größe, Schriftart
	ctx.font = "20px Arial";
	//fartbe
	ctx.fillStyle = "#ff0000";
	ctx.textAlign = "left";
	//Text, x, y
	ctx.fillText("FPS: " + goption.fpslast, 10,20);	
	if(aktTime.getTime() > goption.DfpsR.getTime()+1000 ){
		goption.DfpsR = new Date();
		goption.fpslast = goption.fps;
		goption.fps = 0;
	}
	
};

render();

