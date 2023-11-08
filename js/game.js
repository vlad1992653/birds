let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
bird.src = "img/bird.png";
let bg = new Image();
bg.src = "img/bg.png";
let fg = new Image();
fg.src = "img/fg.png";
let pipeUp = new Image();
pipeUp.src = "img/pipeUp.png";
let pipeBottom = new Image();
pipeBottom.src = "img/pipeBottom.png";

let fly = new Audio();
fly.src = "audio/fly.mp3";
let score_audio = new Audio();
score_audio.src = "audio/score.mp3";

document.addEventListener( "keydown", moveUp);
 function moveUp(event)
{
	 if (event.keyCode == 38)
	 {
		yPos -= 15;
		fly.play()
	 }
	else if(event.keyCode == 40)
	{
		yPos += 15;
	fly.play()
	}
}

let pipe = []
pipe[0] = {
	x : cvs.width,
	y : 0
}

let gap = 90
let grav = 2
let xPos = 10
let yPos = 150
let score = 0

function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x --

 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }
  if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height)
 {
 clearInterval(game)
  //location.reload(); // Перезагрузка страницы
 }
 
 if (pipe[i].x == 5) {
	 score++
	 score_audio.play()
 }
 
}
 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos );
 yPos += grav
 
 ctx.fillStyle = "#000"
ctx.font = "50px Arial"
ctx.fillText('Счет : ' + score, 10, cvs.height - 20) 
}

let game = setInterval(draw, 100);
