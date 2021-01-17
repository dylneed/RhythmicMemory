var displayScore;

var call0;
var call1;
var call2;
var call3;
var call4;
var call5;
var call6;
var calls;

var response0;
var response1;
var response2;
var response3;
var response4;
var response5;
var response6;
var responses;

var gameArea;
var topBar;

var pauseScreen;

var pauseButton;
var volumeButton;
var volumeImage;
var helpButton;

var resumeButton;

var buttonUp;
var buttonLeft;
var buttonDown;
var buttonRight;
var buttons;

var playButton;
var playImage;

var lightUp;
var lightLeft;
var lightDown;
var lightRight;
var lights;

var mute;

var border = 0;

var aWidth;
var aHeight;
var gameLength;
var correct = [];
var gameArray = [];
var score;
var turn = -1;

var timer;
var speed = 800;

window.addEventListener('load',init);
window.addEventListener('resize', layoutPage);

function init() {
	displayScore = document.getElementById('displayScore');
	
	pauseScreen = document.getElementById('pauseScreen');
	
	topBar = document.getElementById('topBar');
	
	pauseButton = document.getElementById('pauseButton');
	volume = document.getElementById('volumeButton');
	volumeImage = document.getElementById('volumeImage');
	helpButton = document.getElementById('helpButton');
	mute = false;
	
	resumeButton = document.getElementById('resumeButton');
	
	call0 = document.getElementById('call0');
	call1 = document.getElementById('call1');
	call2 = document.getElementById('call2');
	call3 = document.getElementById('call3');
	call4 = document.getElementById('call4');
	call5 = document.getElementById('call5');
	call6 = document.getElementById('call6');
	calls = [call0, call1, call2, call3, call4, call5, call6];
	
	response0 = document.getElementById('response0');
	response1 = document.getElementById('response1');
	response2 = document.getElementById('response2');
	response3 = document.getElementById('response3');
	response4 = document.getElementById('response4');
	response5 = document.getElementById('response5');
	response6 = document.getElementById('response6');
	responses = [response0, response1, response2, response3, response4, response5, response6];
	
	gameArea = document.getElementById('gameArea');
	buttonUp = document.getElementById('buttonUp');
	buttonLeft = document.getElementById('buttonLeft');
	buttonDown = document.getElementById('buttonDown');
	buttonRight = document.getElementById('buttonRight');
	buttons = [buttonUp, buttonLeft, buttonDown, buttonRight];
	for (let i = 0; i < 4; i++){
		buttons[i].disabled = true;
	}
	
	playButton = document.getElementById('playButton');
	playImage = document.getElementById('playImage');
	
	lightUp = document.getElementById("lightUp");
	lightLeft = document.getElementById("lightLeft");
	lightDown = document.getElementById("lightDown");
	lightRight = document.getElementById("lightRight");
	lights = [lightUp, lightLeft, lightDown, lightRight];
	
	layoutPage();
	
	document.addEventListener('keydown',keyListener, false);
}

function layoutPage() {
	
	aWidth = innerWidth;
	aHeight = innerHeight;
	
	var scale = aHeight/aWidth;
	if (scale < 1.3) {scale = 1.3;}
	
	gameArea.style.borderWidth = border + "px";
	gameArea.style.height = (aHeight * 0.92) - border - border + "px";
	gameArea.style.top = (aHeight * 0.08) - 8 + "px";
	gameArea.style.width = Math.floor((aHeight - border - border)/scale) + "px";
	gameArea.style.left = Math.floor(aWidth/2 - ((aHeight - (border * 2))/(2 *scale))) + "px";
	
	topBar.style.height = (aHeight * 0.07) + "px";
	topBar.style.top = "-8px";
	topBar.style.width = Math.floor((aHeight - border - border)/scale) + "px";
	topBar.style.left = Math.floor(aWidth/2 - ((aHeight - (border * 2))/(2 *scale))) + "px";
	
	for (var i = 0; i < 7; i++){
		calls[i].style.visibility = "hidden";
		responses[i].style.visibility = "hidden";
	}
	
	displayScore.style.fontSize = Math.floor(aHeight / 36)  + 'pt';
	displayScore.style.letterSpacing = aHeight / 200 + 'px';
	
	resumeButton.style.fontSize = Math.floor(aHeight / 24)  + 'pt';
}

function keyListener(e) {
	var key = e.keyCode;
	
	if (key == 32 && !(playButton.disabled)) {start();}
	
	if (buttons[0].disabled) {return;}
	
	
	if (key == 38 || key == 87) {response(0);} 
	else if (key == 37 || key == 65) {response(1);}
	else if (key == 40 || key == 83) {response(2);}
	else if (key == 39 || key == 68) {response(3);}
}

function start() {
	gameLength = 2.5;
	score = 0;
	turn = -1;
	playButton.style.zIndex = 0;
	playImage.src = "replay.png";
	playImage.style.transform = "scaleX(-1)";
	playImage.style.left = "-2%";
	playButton.disabled = true;
	for (let i = 0; i < 7; i++){
		calls[i].style.visibility = "hidden";
		responses[i].style.visibility = "hidden";
		responses[i].src = "arrow.svg";
	}
	
	for (let i = 0; i < 10; i++) {
		var a = [];
		
		for (let j = 0; j < 4 + Math.floor(4 * Math.random()); j++ ) {
			a[j] = Math.floor(4 * Math.random());
		}
		
		gameArray[i] = a;
	}
	
	call();
}

function call() {
	
	turn = -1;
	
	displayScore.innerHTML = "SCORE: " + score;
	
	
	for (let i = 0; i < 4; i++){
		buttons[i].disabled = true;
		lights[i].style.backgroundColor = "transparent";
	}
	
	correct = gameArray.shift();
	
	for (var i = 0; i < correct.length; i++){
		rotate(correct[i],i);
	}
	
	setTimeout(function(){
		for (var i = 0; i < 8; i++){
			calls[i].style.visibility = "hidden";
		}
	},(correct.length*speed)+(speed/4));
	
	setTimeout(function(){
		for (let i = 0; i < 4; i++){
			buttons[i].disabled = false;
		}
	},(correct.length*speed)+(speed/4));
}

function rotate(n, i) {
	timer = setTimeout(function(){
			calls[i].style.transform = "rotate(" + (270 - (90 * n)) + "deg)";
			calls[i].style.visibility = "visible";
	},speed*i);
}

function response(n) {
	let c = correct.shift();
	
	turn++;
	
	calls[turn].style.visibility = "visible";
	
	responses[turn].style.transform = "rotate(" + (270- (90 * n)) + "deg)";
	responses[turn].style.visibility = "visible";
	
	for (let i = 0; i < 4; i++) {
		lights[i].style.backgroundColor = "transparent";
	}
	
	lights[n].style.backgroundColor = "green";
	
	if (n != c){
		responses[turn].src = "red-arrow.svg";
		lights[n].style.backgroundColor = "red";
		lights[c].style.backgroundColor= "green";
		for (let i = 0; i < 4; i++){buttons[i].disabled = true;}
		for (let i = 0; i <= correct.length; i++) {calls[i].style.visibility = "visible";}
		//setTimeout(function() {gameOver()},speed);
		score--;
	}
	if (correct.length == 0||n != c){
		score++;
		
		if (gameArray.length == 0) {
			setTimeout(function() {gameOver()},speed);
			return;
		}
				
		
		for (let i = 0; i < 4; i++){buttons[i].disabled = true;}
		setTimeout(function(){
				for (let i = 0; i < 7; i++){
					calls[i].style.visibility = "hidden";
					responses[i].style.visibility = "hidden";
					responses[i].src = "arrow.svg";
				}
				
				call();
		},speed);
	} else {
		setTimeout(function() {
			lights[n].style.backgroundColor = "transparent";
		}, speed/8);
	}
	
}

function gameOver() {
	for (let i = 0; i < 4; i++){
		lights[i].style.backgroundColor = "transparent";
	}
	
	for (let i = 0; i < 7; i++) {
		calls[i].style.visibility = "hidden";
		responses[i].style.visibility = "hidden";
		responses[i].src = "arrow.svg";
	}
	
	displayScore.innerHTML += "     GAME OVER";
	
	playButton.disabled = false;
	playButton.style.zIndex = 2;
}

function pause() {
	stop();
}

function volumeToggle() {
	if (mute) {
		volumeImage.src = "volume.svg";
	} else {
		volumeImage.src = "mute.svg";
	}
	
	mute = !mute;
}

function help() {
	stop();
}

function stop() {
	pauseScreen.style.visibility = "visible";
}

function resume() {
	pauseScreen.style.visibility = "hidden";
}