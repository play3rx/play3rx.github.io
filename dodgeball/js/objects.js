var createGround = (function() {
	var landGeometry = new THREE.BoxGeometry(40, 1, 70);
	var landTexture = new THREE.TextureLoader().load('textures/land.jpg');
	landTexture.wrapS = THREE.RepeatWrapping;
	landTexture.wrapT = THREE.RepeatWrapping;
	landTexture.repeat.set(2, 2);
	var landMaterial = new THREE.MeshLambertMaterial({map: landTexture});

	return function() {
		var land = new THREE.Mesh(landGeometry, landMaterial);
		land.receiveShadow = true;
		land.castShadow = false;
		return land;
	}
})();

var createBall = (function() {
	var ballGeometry = new THREE.SphereGeometry(1, 128, 128);
	var ballTexture = new THREE.TextureLoader().load('textures/ball.jpg');
	ballTexture.wrapS = THREE.RepeatWrapping;
	ballTexture.wrapT = THREE.RepeatWrapping;
	var ballMaterial = new THREE.MeshLambertMaterial({map: ballTexture});

	return function() {
		var ball = new THREE.Mesh(ballGeometry, ballMaterial);
		ball.castShadow = true;
		ball.receiveShadow = true;
		ball.position.set((Math.random() - 0.5) * 38, 1.4, -35);
		return ball;
	}
})();

var createPlayer = (function() {
	var playerGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
	var playerMaterial = new THREE.MeshLambertMaterial({color: 0x4444dd});
	var directions = [
		new THREE.Vector3(0, 0, 1),
		new THREE.Vector3(1, 0, 1),
		new THREE.Vector3(1, 0, 0),
		new THREE.Vector3(1, 0, -1),
		new THREE.Vector3(0, 0, -1),
		new THREE.Vector3(-1, 0, -1),
		new THREE.Vector3(-1, 0, 0),
		new THREE.Vector3(-1, 0, 1)
	];
	return function() {
		var player = new THREE.Mesh(playerGeometry, playerMaterial);
		player.receiveShadow = true;
		player.castShadow = true;
		player.position.set(0, 1.5, 28);
		player.isAlive = true;
		player.checkCollision = function(ball) {
			var playerPosition = this.position.clone();
			var raycaster = new THREE.Raycaster();
			var collisions = [];

			for (var direction of directions) {
				raycaster.set(playerPosition, direction);
				var collision = raycaster.intersectObject(ball);
				if (collision.length > 0 && collision[0].distance <= 0.5) {
					this.isAlive = false;
					break;
				}
			}
			
		}
		return player;
	}
})();