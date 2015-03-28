import THREE from 'three';
import Mouse from './mouse';


class RayCaster {
	constructor() {
		this.camera = undefined;
		this.rayCaster = new THREE.Raycaster();
		this.intersects = [];
		this.objects = [];
		this.near = 0.1;
		this.far = 1000;
	}

	init(objects,camera) {
		this.objects = objects;
		this.camera = camera;
	}

	alertIntersected(){
		//console.log(this.intersects.length);
		for (var i = this.intersects.length - 1; i >= 0; i--) {
			//console.log(this.intersects[i].object);

			this.intersects[i].object.rayhit();
		};
	}

	update() {

		this.rayCaster.setFromCamera(Mouse, this.camera, this.near, this.far);
		this.intersects = this.rayCaster.intersectObjects(this.objects);
		if (this.intersects.length > 0)
			//console.log(Mouse.x,Mouse.y)
			this.alertIntersected()
	}
}

var raycaster = new RayCaster();

export default raycaster;