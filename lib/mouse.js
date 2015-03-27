import THREE from 'three'

class Mouse extends THREE.Vector2 {
	constructor() {
		this.inBound = false;
		this.RightButton = false;
	//document.addEventListener('mousedown', this.onDocumentMouseDown.bind(this), false);
	//document.addEventListener('mouseup', this.onDocumentMouseUp.bind(this), false);
	}
	getInBound() {
		return this.inBound;
	}
	setInBound() {
		this.inBound != this.inBound;
	}
	onDocumentMouseDown(event) {
		if (event.button == 2) {
			this.RightButton = true;
		}
		//console.log(event);
	}
	onDocumentMouseUp(event) {
		if (event.button == 2) {
			this.RightButton = false;
		}
//		console.log(event);

	}
}


var mouse = new Mouse();

export default mouse