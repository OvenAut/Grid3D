import THREE from 'three';
import TWEEN from '../vendor/tween.min'
import Mouse from './mouse'
import cubeCamera from './cubeCamera';
import TG from '../vendor/texgen.min';
import hsm from './hexState';
import StateMachine from '../vendor/state-machine.min';

console.log(hsm.current);

const bounceValue = 5;




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

class HexMesh extends THREE.Mesh {
	constructor(geometry, material, color) {
		super(geometry,material,color);

	this.startup();
	this.timer = undefined;
	//console.log(cubeCamera);
	this.timer2 = undefined;
	this.selected = false;
	this.selectShot = false;
	this.hexBlocked = false;
	this.defaultColor = new THREE.Color(color);
	this.selectColor = new THREE.Color(0xFF0000);
	this.tweenStarded = false;
	this.tweenFinshed = true;
	this.touchOnec = false;
	}
	rayhit() {
		clearTimeout(this.time);
		clearTimeout(this.time2);
		//console.log("hit !!!" + this);
		if (!this.selected) {
			if (!this.touchOnec) {
				this.material.color.lerp(new THREE.Color( 0xDD00FF),0.5);
				this.touchOnec = true;	
			}
			
			this.time = setTimeout(() => this.setDefaultColor(), 1000);
		}
		if (!this.hexBlocked)
			this.time2 = setTimeout(() => this.setDefaultScale(), 100);
		

		if (Mouse.RightButton) {
			if (!this.selectShot) {
				this.selectShot = true;
				this.touchOnec = false;
				console.log("hello");
				if (!this.selected) {
					this.setHexSelected();
					
				} else {
					this.resetHexSelected();
					this.hexBlocked = false;
				}	
			}

			
		} else {
			if (this.selectShot) {
			this.selectShot = false
			//this.resetHexSelected();
			console.log("free");
			}
		}
		var that = this;
		//this.tween.delay(1000);
		//tween.start();

		if (!this.hexBlocked && !this.tweenStarded) {
			
			var tween = new TWEEN.Tween(this.position).to( {
				y: -bounceValue} , 1000 )
			.easing( TWEEN.Easing.Exponential.Out)
			//.repeat( 1 )
			//.yoyo()
			.onStart(function(){
				that.tweenStarded = true;
				//console.log("tween Sarted");
			})
			.onUpdate( function () {
				//con
				//console.log(this)
				//that.scale.x = this.scale;
				//that.scale.y = this.scale;
				/////that.scale.z = this.z;
				
				//console.log(cssColor);
				//this.x ;
				//this.y ;
				//output.style.webkitTransform = transform;
				//output.style.transform = transform;
				//that.material.color.setHSL(this);
			} ).onComplete(function() {
				that.tweenFinshed = true;
				//that.tweenStarded = false;
				//{
				//		that.hexBlocked = true;
				//		that.hexRise();
				//	}
				//that.setDefaultColor();
				//that.tweenActiv = false;
			}).start();
			//this.scale.z  = 0.1;
		}
	}
	setDefaultColor(){
		this.touchOnec = false;
		this.material.color.set(this.defaultColor);
			
	}
	setDefaultScale(){
		while( !this.tweenFinshed) {
			console.log("while");
		}
		var that = this;
			let tween = new TWEEN.Tween(this.position)
			.to( {y: 0} , 1000 )
			.easing( TWEEN.Easing.Bounce.Out )
			.onComplete(function() {
				that.tweenStarded = false;
				if (that.selected)  {
						that.hexBlocked = true;
						that.hexRise();
					}
				//that.setDefaultColor();
				//that.tweenActiv = false;
			}).start();
		//this.scale.z  = 1;
	}
	setHexSelected() {
		this.selected = true;
		this.material.color.set(this.defaultColor);
		this.material.color.lerp(this.selectColor , 0.7);
		//this.material.envMap = null;
		//console.log(this.material);
	}
	resetHexSelected() {
		this.selected = false;	
	}
	hexRise() {
		var newPosition = this.position.y + 10

		let tween = new TWEEN.Tween(this.position)
			.to( {y:newPosition} , 1000 )
			.easing( TWEEN.Easing.Elastic.Out )
			.start();
	}
	onstartup() {
		//console.log("state-Start")
	}
}

export default HexMesh;



StateMachine.create({
  target: HexMesh.prototype,
  events: [
    { name: 'startup', from: 'none',   to: 'green'  },
    { name: 'warn',    from: 'green',  to: 'yellow' },
    { name: 'panic',   from: 'yellow', to: 'red'    },
    { name: 'calm',    from: 'red',    to: 'yellow' },
    { name: 'clear',   from: 'yellow', to: 'green'  }
  ]});