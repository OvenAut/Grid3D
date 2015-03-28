import THREE from 'three'

class Mouse extends THREE.Vector2 {
	constructor() {
		this.inBound = false;
		this.RightButton = false;
		this.LeftButton = false;
		
	}
	getInBound() {
		return this.inBound;
	}
	setInBound() {
		this.inBound != this.inBound;
	}
}


var mouse = new Mouse();

export default mouse