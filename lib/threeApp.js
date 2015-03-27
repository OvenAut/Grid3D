import THREE from 'three'
import Box from './box';
import Clock from './clock';
import Events from './events';
import Mouse from './mouse';
import RayCaster from './raycaster';
import OrbitControls from '../vendor/OrbitControls';
import HexGrid from './HexGrid';
import cubeCamera from './cubeCamera';
import TG from '../vendor/texgen.min';
import Tool from './tool';


var clearColor = 0x333333;

class	ThreeApp {
	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
		this.group = new THREE.Group();
		this.RayGroup = [];
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor( clearColor );

		//this.text = document.getElementById('info');

		Tool.text("construction");

	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 1, 1).normalize();
	light.lookAt(this.scene.position);
	this.scene.add(light);

		//var lightAm = new THREE.AmbientLight( 0x333333 ); // soft white light
		//this.scene.add( lightAm );
	
		//this.cube = undefined;
		this.cubes = new Array(0);
		//this.deltaTime = 0.0;
		//this.mouse = Mouse;
		Events.init(this.camera,this.renderer,Mouse);//this.clock.autoStart = true
		//Events.onWindowResize();
		//console.log(this.mouse.getInBound());
	}

	load(callback) {
		//
		//console.log("load")
		Tool.text("load");
		//this.renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( this.renderer.domElement );

		//console.log(Clock);
		//console.log(Clock.getId());

//		geometry, material
		this.group.name = "Hello";
		var selectColor = new THREE.Color( 0x3a9645 ); 
		var gridConfig = {
			size: 10,
			cellSize: 40,
			cellScale: 0.95,
			selectColor: selectColor,
			guiSelectColor: selectColor.getStyle(),
			group: this.group,
			RayGroup: this.RayGroup
		};


		let grid = new HexGrid(gridConfig);
		this.scene.add(grid.group);


		let randomColor =  () => Math.floor(Math.random()*(16777215)*0.001);
		var controls = new THREE.OrbitControls( this.camera );
		controls.damping = 0.2;


// {{		var texture = new TG.Texture( 255, 255 )
// 				.add( new TG.SinX().offset( - 16 ).frequency( 0.03 ).tint( 0.1, 0.25, 0.5 ) )
// 				.add( new TG.SinY().offset( - 16 ).frequency( 0.03 ).tint( 0.1, 0.25, 0.5 ) )
// 				.add( new TG.Number().tint( 0.75, 0.5, 0.5 ) )
// 				.add( new TG.SinX().frequency( 0.03 ).tint( 0.2, 0.2, 0.2 ) )
// 				.add( new TG.SinY().frequency( 0.03 ).tint( 0.2, 0.2, 0.2 ) )
// 				.add( new TG.Noise().tint( 0.1, 0, 0 ) )
// 				.add( new TG.Noise().tint( 0, 0.1, 0 ) )
// 				.add( new TG.Noise().tint( 0, 0, 0.1 ) )
// 				.toCanvas();


				// 	var texture = new TG.Texture( 256, 256 )
				// .add( new TG.XOR() )
				// .mul( new TG.OR().tint( 0.5, 0.8, 0.5 ) )
				// .mul( new TG.SinX().frequency( 0.0312 ) )
				// .div( new TG.SinY().frequency( 0.0312 ) )
				// .add( new TG.SinX().frequency( 0.004 ).tint( 0.5, 0, 0 ) )
				// .add( new TG.Noise().tint( 0.1, 0.1, 0.2 ) )
				// .toCanvas();


			var texture = new TG.Texture( 256, 256 )
				.add( new TG.SinX().frequency( 0.004 ) )
				.mul( new TG.SinY().frequency( 0.004 ) )
				.mul( new TG.SinY().offset( 32 ).frequency( 0.02 ) )
				.div( new TG.SinX().frequency( 0.02 ) )
				.add( new TG.Noise().tint( 0.1, 0, 0 ) )
				//.add( new TG.Noise().tint( 0, 0.1, 0 ) )
				.add( new TG.Noise().tint( 1, 1, 1 ) )
				.toCanvas();

		var threeTexture = new THREE.Texture( texture )
		threeTexture.needsUpdate = true;

		//console.log(texture)

		for (var i = this.cubes.length - 1; i >= 0; i--) {
			var material = new THREE.MeshBasicMaterial( { color: randomColor() , map: threeTexture } ); //color: randomColor(),
			var geometry = new THREE.BoxGeometry( 50, 50, 50 );
			this.cubes[i] = new Box(geometry, material);
			this.cubes[i].init(this.cubes.length,i);
			this.scene.add(this.cubes[i]);	
		};

		RayCaster.init(this.RayGroup, this.camera);
		this.camera.position.copy(new THREE.Vector3(0,500,-500));
		this.camera.lookAt(this.scene.position)
		Tool.text("Grid !") ;
		cubeCamera.position.copy( this.group.position );
		this.scene.add(cubeCamera);
		callback();
	}

	render() {
		RayCaster.update();
		this.cubes.forEach(function(element){
			element.update();
		})
		this.group.visible = false;
		cubeCamera.updateCubeMap( this.renderer, this.scene );
		this.group.visible = true;
		this.renderer.render( this.scene, this.camera );

	}
}

export default new ThreeApp()