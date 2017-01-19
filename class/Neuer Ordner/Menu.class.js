
function Menu() {
	
	var Menuobjs = Array();
	var Pauseobjs = Array();
	var Creditsobjs = Array();
	var Optionsobjs = Array();
	var OptionsKontrolobjs = Array();
	var Changelogobjs = Array();
	var WeltWahlobjs = Array();
	
	var Mx;
	var My;
	
	this.create = function( mx, my){
	
		Mx = mx;
		My = my;
		
		Menuobjs = Array();
		Pauseobjs = Array();
		Creditsobjs = Array();
		Creditsobjs = Array();
		Optionsobjs = Array();
		OptionsKontrolobjs = Array();
		Changelogobjs = Array();
		WeltWahlobjs = Array();
		/*
			Tastenbelegung
		*/
		var contdisplay = Array(
			Array("Beschreibung:","Primär","Sekundär"),
			Array("","",""),
			Array("Option:",KeyToChar(Controls.Option),KeyToChar(Controls.OptionAlt),"Option"),
			Array("Kamera Links:", KeyToChar(Controls.KLeft), KeyToChar(Controls.KLeftAlt),"KLeft" ),
			Array("Kamera Unten:", KeyToChar(Controls.KDown), KeyToChar(Controls.KDownAlt),"KDown" ),
			Array("Kamera Oben:", KeyToChar(Controls.KUp), KeyToChar(Controls.KUpAlt),"KUp" ),
			Array("Kamera Rechts:", KeyToChar(Controls.KRight), KeyToChar(Controls.KRightAlt),"KRight" ),
			Array("Kamera Schnell:", KeyToChar(Controls.kFast),KeyToChar(Controls.kFastAlt),"kFast" ),
			Array("Mehere Türme:", KeyToChar(Controls.pmulti), KeyToChar(Controls.pmultiAlt), "pmulti" )
		);
		
		
		
		// Buttion(X, Y, BREIT, HOCH, SART, TEXT, FSIZE, FCOLOR, COLOR, KLICKOBJ, STROW)
		// ButtionImg(IMG, X, Y, BREIT, HOCH, KLICKOBJ)
		// Text(X, Y, RADIUS, SART, TEXT, FSIZE, FCOLOR, COLOR, STROW, MAXLEN, ALIGN, FROMCENTER)
		// ScrollText(X, Y, BREIT, HOCH, SART, TEXTARR, FSIZE, FCOLOR, COLOR, STROW)
		Menuobjs.push( new Text(mx, my , 200, "Verdana, sans-serif", "RedWulfpower", 30, "#cf1020", "#000",50,null, "center", true));
		Menuobjs.push( new Buttion(  mx, my -50, 170,40, "Verdana, sans-serif", "Welten", 30, "#39ff14", "#000", { 
			newMenSt:MenuState.WeltWahl,
			
			/*
			newState:state.Game, 
			newGame:true,
			*/
		},2 ) );
		Menuobjs.push( new Buttion(  mx, my,     170,40, "Verdana, sans-serif", "Options", 30, "#39ff14", "#000", { 
			newMenSt:MenuState.Options,
		},2 ) );
		Menuobjs.push( new Buttion(  mx, my +50, 170,40, "Verdana, sans-serif", "Credits", 30, "#39ff14", "#000", { 
			newMenSt:MenuState.Credits,
		},2 ) );
		Menuobjs.push( new Buttion(  mx, my +100, 170,40, "Verdana, sans-serif", "Changelog", 30, "#39ff14", "#000", { 
			newMenSt:MenuState.Changelog,
		},2 ) );
		
		
		/* Welten anzeige */
		WeltWahlobjs.push( new Text(mx, my , 200, "Verdana, sans-serif", "RedWulfpower", 30, "#cf1020", "#000",50,null, "center", true));
		WeltWahlobjs.push( new Text(mx, my , 200, "Verdana, sans-serif", "RedWulfpower", 30, "#cf1020", "#000",50,null, "center", true));
		
		WeltWahlobjs.push( new Buttion( mx, my + 150, 290,40, "Verdana, sans-serif", "Zurück", 30, "#39ff14", "#000",{ 
			newMenSt:MenuState.MainOrPause,
		},2 ) );
		
		var WmarsR = Game.World.length 
		if(Game.World.length > 5){
			WmarsR = 5;
			if(Game.World.length > 10){
				WmarsR = 7;
			}
		}
		var Wstartx = mx- (WmarsR * 50);
		var Wstarty = my - 150;
		for(var i=0;i<Game.World.length;i++){
			
			if(i % WmarsR  == 0){
				Wstartx = mx- (WmarsR * 50);
				Wstarty += 140;
			}
		
			WeltWahlobjs.push( new ButtionImg(Game.World[i].getBGImg(),  Wstartx, Wstarty, 100,100, { 
				newState:state.Game, 
				selectWorld:i,
				oberflacheUpdate:true,
			} ) );
			
			WeltWahlobjs.push( new Text(Wstartx, Wstarty-60 , 0, "Verdana, sans-serif", Game.World[i].getName(), 15, "#cf1020", "#cf1020",15,null, "center", true));
			Wstartx += 120;
			
		}
		
		
		
		
		Pauseobjs.push( new Text(mx, my,         200, "Verdana, sans-serif", "RedWulfpower", 30, "#cf1020", "#000",50,null, "center", true));
		Pauseobjs.push( new Buttion( mx, my -50, 290,40, "Verdana, sans-serif", "Weiter Spielen", 30, "#39ff14", "#000",{ 
			newState:state.Game,
		},2 ) );
		Pauseobjs.push( new Buttion(  mx, my,    290,40, "Verdana, sans-serif", "Options", 30, "#39ff14", "#000", {
			
			newMenSt:MenuState.Options,
		},2 ) );
		Pauseobjs.push( new Buttion(  mx, my +50, 290,40, "Verdana, sans-serif", "Credits", 30, "#39ff14", "#000", { 
			newMenSt:MenuState.Credits,
		},2 ) );
		Pauseobjs.push( new Buttion(  mx, my+100, 290,40, "Verdana, sans-serif", "Changelog", 30, "#39ff14", "#000", { 
			newMenSt:MenuState.Changelog,
		},2 ) );
		Pauseobjs.push( new Buttion( mx, my+150, 290,40, "Verdana, sans-serif", "Zurück zum Menü", 30, "#39ff14", "#000",{ 
			newState:state.Menu,
			newMenSt:MenuState.Main,
		},2 ) );
		
		
		
		
		Creditsobjs.push( new Text(mx, my , 200, "Verdana, sans-serif", "RedWulfpower", 30, "#cf1020", "#000",50,null, "center", true));
		Creditsobjs.push( new Text(mx, my , 0,   "Verdana, sans-serif", "Homapge: www.RedWulfpower.de\n© Florian Claus", 17, "#39ff14", "#39ff14",0.01,null, "center", true));
		Creditsobjs.push( new Buttion( mx, my + 57, 290,40, "Verdana, sans-serif", "Kontakt", 30, "#39ff14", "#000",{ 
			newTap:"https://redwulfpower.de/kontakt.html",
		},2 ) );
		Creditsobjs.push( new Buttion( mx, my + 100, 290,40, "Verdana, sans-serif", "Zurück", 30, "#39ff14", "#000",{ 
			newMenSt:MenuState.MainOrPause,
		},2 ) );
		
		
		
		Optionsobjs.push( new Text(mx, my , 200, "Verdana, sans-serif", "RedWulfpower", 30, "#cf1020", "#000",50,null, "center", true));
		Optionsobjs.push( new Text(mx, my-50 , 0, "Verdana, sans-serif", "Momentan nicht verfügbar!", 17, "#39ff14", "#39ff14",0.01,null, "center", true));
		Optionsobjs.push( new Buttion( mx, my + 100, 290,40, "Verdana, sans-serif", "Zurück", 30, "#39ff14", "#000",{ 
			newMenSt:MenuState.MainOrPause,
		},2 ) );
		Optionsobjs.push( new Buttion( mx, my + 55, 290,40, "Verdana, sans-serif", "Tastenbelegung", 30, "#39ff14", "#000",{ 
			newMenSt:MenuState.OptionsKontrol,
		},2 ) );
		Optionsobjs.push( new Buttion( mx, my + 10, 290,40, "Verdana, sans-serif", "Vollbild An/Aus", 30, "#39ff14", "#000",{ 
			switchFullscreen:true,
		},2 ) );
		
		
		
		var starty = my-70;
		for(var i=0; i < contdisplay.length; i++){
			
			OptionsKontrolobjs.push( new Text(mx -180, starty, 0, "Verdana, sans-serif", contdisplay[i][0], 17, "#39ff14", "#39ff14",0.01, 160, "left", false));
			if(i == 0 || i == 1){
				OptionsKontrolobjs.push( new Text(mx +20, starty, 0, "Verdana, sans-serif", contdisplay[i][1], 17, "#39ff14", "#39ff14",0.01, 160, "center", false));
				OptionsKontrolobjs.push( new Text(mx +160, starty, 0, "Verdana, sans-serif", contdisplay[i][2], 17, "#39ff14", "#39ff14",0.01, 160, "center", false));
			}else{
				OptionsKontrolobjs.push( new Buttion( mx + 20, starty, 100,18, "Verdana, sans-serif", contdisplay[i][1], 17, "#39ff14", "#000",{ 
					newButton:contdisplay[i][3],
					
				},2 ) );
				OptionsKontrolobjs.push( new Buttion( mx +160, starty, 100,18, "Verdana, sans-serif", contdisplay[i][2],17, "#39ff14", "#000",{ 
					newButton:contdisplay[i][3]+"Alt",
					
				},2 ) );
			}
			starty += 21;
			
		}
		
		
		OptionsKontrolobjs.push( new Text(mx,  my, 200, "Verdana, sans-serif", "RedWulfpower", 30, "#cf1020", "#000",0.01, null, "center", true));
		
		OptionsKontrolobjs.push( new Buttion( mx, my + 150, 290,40, "Verdana, sans-serif", "Zurück", 30, "#39ff14", "#000",{ 
			newMenSt:MenuState.Options,
		},2 ) );
		
		
		Changelogobjs.push( new Text(mx ,  my , 200, "Verdana, sans-serif", "RedWulfpower", 30, "#cf1020", "#000",0.01, null, "center", true));
		Changelogobjs.push( new Text(mx, my-50 , 0, "Verdana, sans-serif", "Momentan nicht verfügbar!", 17, "#39ff14", "#39ff14",0.01,null, "center", true));
		Changelogobjs.push( new Buttion( mx, my + 200, 290,40, "Verdana, sans-serif", "Zurück", 30, "#39ff14", "#000",{ 
			newMenSt:MenuState.MainOrPause,
		},2 ) );
		// ScrollText(X, Y, BREIT, HOCH, SART, TEXTARR, FSIZE, FCOLOR, COLOR, STROW)
		Changelogobjs.push(new ScrollText(mx, my+50, 600,250, "Verdana, sans-serif", ChangelogArr, 17, "#39ff14", "#000", 0.01 ));
		
		
	}
	
	this.showMenu = function(){
		show(Menuobjs);
	}
	this.showPause = function(){
		show(Pauseobjs);
	}
	this.showCredits = function(){	
		show(Creditsobjs);
	}
	this.showOptions = function(){	
		show(Optionsobjs);
	}
	this.showOptionsKontrol = function(){	
		show(OptionsKontrolobjs);
	}
	this.showChangelog = function(){	
		show(Changelogobjs);
	}
	this.showWeltWahl = function(){	
		show(WeltWahlobjs);
	}

	
	this.getMenuobjs = function(){
		return Menuobjs;
	}
	this.getPauseobjs = function(){
		return Pauseobjs;
	}
	this.getCreditsobjs = function(){
		return Creditsobjs;
	}
	this.getOptionsobjs = function(){
		return Optionsobjs;
	}
	this.getOptionsKontrolobjs = function(){
		return OptionsKontrolobjs;
	}
	this.getChangelogobjs = function(){
		return Changelogobjs;
	}
	this.getWeltWahlobjs = function(){
		return WeltWahlobjs;
	}
	
	function show(obj, bg){
		
		if(state.now == state.Pause){
			
			var ctx = document.getElementById('canvas').getContext('2d');
			
			ctx.drawImage(Game.PauseBuffer, 0, 0);
			
			ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
			ctx.fillRect(0,0,Mx * 2,My * 2);
			
			
			
		}else{
			$('canvas').drawRect({
				/* BG color */
				fillStyle: '#000',
				x: Mx, 
				y: My,
				width: Mx * 2,
				height: My * 2
			});			
		}
		Game.drawObj(obj);
		
	}
	
	
}
var Menue = new Menu();
