"use strict";

var renderer = null;
var scene = null;
var camera = null;

var balls = [];
var player = null;
var ballsDodged = 0;

var moveLeft = false;
var moveRight = false;

var delta = 0;
var lastUpdate = Date.now();
var spawnTimer = 500; // Delay spawning of the first ball 

var init = function() {
	// Scene, camera, and renderer
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.3, 1000);

	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild(renderer.domElement);

	// Creating ground
	var ground = createGround();
	scene.add(ground);

	// Some lighting
	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	scene.add(directionalLight);

	var light = new THREE.SpotLight(0xffffff);
	light.castShadow = true;
	light.angle = Math.PI / 4;
	light.position.set(-10, 20, 40);
	scene.add(light);

	// Creating the player
	player = createPlayer();
	scene.add(player);

	// camera positioning
	camera.position.set(-0.3, 9, 40);
}

var render = function() {
	if (player.isAlive) {
		requestAnimationFrame(render);
	} else {
		document.getElementById('game-over').style.display = 'block';
		document.getElementById('balls-dodged').innerHTML = ballsDodged;
	}

	var now = Date.now();
	delta = now - lastUpdate;
	lastUpdate = now;

	spawnTimer -= delta;
	if (spawnTimer <= 0) {
		var ball = createBall();
		scene.add(ball);
		balls.push(ball);
		spawnTimer = 100;
	}

	for (var ball of balls) {
		var distance = 0.02 * delta;
		ball.position.z += distance;
		ball.rotation.x += distance;
		player.checkCollision(ball);

		if (ball.position.z >= 70) {
			balls.splice(balls.indexOf(ball), 1);
			scene.remove(ball);
			ballsDodged++;
		}
	}

	if (moveLeft && player.position.x > -18) player.translateX(-0.01 * delta);
	if (moveRight && player.position.x < 18) player.translateX(0.01 * delta);

	renderer.render(scene, camera);
};

document.onkeydown = function(event) {
	event = event || window.event;

	switch (event.keyCode) {
	case 37:
	case 65:
		moveLeft = true;
		break;
	case 39:
	case 68:
		moveRight = true;
		break;
	}
}

document.onkeyup = function(event) {
	event = event || window.event;
	
	switch (event.keyCode) {
	case 37:
	case 65:
		moveLeft = false;
		break;
	case 39:
	case 68:
		moveRight = false;
		break;
	}
}

init();
render();