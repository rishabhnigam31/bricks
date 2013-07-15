var ctx;
var canvas;
var GAME_WIDTH=600;
var GAME_HEIGHT=500;
var x=GAME_WIDTH/2;
var y=GAME_HEIGHT/2;
var dx;
var dy;
var paddlex=100;
var paddley=GAME_HEIGHT-10;
var rightDown=false;
var leftDown=false;
var NRows=7;
var NCols=10;
var Padding=1;
var Bricks;
var Row;
var Col;
var RowHeight;
var ColWidth;
var pid;
var paddlew = 100;
var score = 0;
var autoplay = false;

function initbricks()
{
    BrickWidth=GAME_WIDTH/NCols-1;
    BrickHeight=20;
    Padding=1;

    Bricks = new Array(
		       new Array(1,1,1,1,1,1,1,1,1,1),
		       new Array(0,0,0,0,0,0,0,0,0,0),
		       new Array(1,1,1,1,0,1,1,1,1,1),
		       new Array(0,0,0,0,0,0,0,0,0,0),
		       new Array(1,1,0,1,1,1,1,1,1,1),
		       new Array(0,0,0,0,0,0,0,0,0,0),
		       new Array(1,1,1,0,1,0,1,1,1,1)
		       );
}

function mod(x) {
    if (x>0) return x;
    return -x;
}

function score() {
    return score;
}

function onkeydown(evt)
{
    if (evt.keyCode==39) {
	rightDown = true;
    }
    else if (evt.keyCode == 37) {
	leftDown = true;
    }
    else if (evt.keyCode == /*j=*/74) {
	dx += (mod(dx)/dx)*2;
	dy += (mod(dy)/dy)*2;
    }
    else if (evt.keyCode == /*k=*/75) {
	dx -= (mod(dx)/dx)*2;
	dy -= (mod(dy)/dy)*2;
    }    
}

function onkeyup(evt) {
    if (evt.keyCode == 39) rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onkeydown);
$(document).keyup(onkeyup);

//window.addEventListener("keydown", onkeydown, false);
//window.addEventListener("keyup", onkeyup, false);
function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fillStyle="#FF0000"; 
    ctx.fill();
}

function rect(x,y,w,h) {
    ctx.fillStyle="#FF0000"; 
    ctx.beginPath();
    ctx.fillRect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    dx = -3;
    dy = -3;
    pid = setInterval(draw, 10);
    score = 0;
    about();
}

function about() {
    ctx.fillstyle = 'rgb(0,0,255)'
    ctx.font = "bold 16px Arial";
    text = "Use arrow keys to move the red stick, use j and k to control speed";
    ctx.fillText(text, 10, 530);
    ctx.beginPath();
    ctx.moveTo(0,500);
    ctx.lineTo(650,500);
    ctx.stroke();
}

function clear() {
    ctx.clearRect(0, 0, GAME_WIDTH + 50, GAME_HEIGHT);
    ctx.beginPath();
    ctx.moveTo(600,0);
    ctx.lineTo(600,500);
    ctx.stroke();
    ctx.moveTo(600,285);
    ctx.lineTo(650,285);
    ctx.moveTo(650,315);
    ctx.lineTo(600,315);
    ctx.stroke();
}

function fillRHSArea() {
    ctx.fillstyle = 'blue'
    ctx.font = "bold 16px Arial";
    ctx.fillText(score, 620, 305);
    ctx.fillText('score', 600, 275)
}

function draw(){
    //ctx.fillStyle = "rgba(255, 255, 0, .5)"
    //ctx.clearRect(0,0,300,300);
    clear();
    circle(x,y,10);
    
    if (rightDown && paddlex < GAME_WIDTH-paddlew) paddlex += 10;else if (leftDown && paddlex > 0) {
	paddlex -= 10;
    }

    rect(paddlex, paddley, 100, 10);
    ctx.fill();

    for (i=0;i<NRows;i++) {
	for (j=0;j<NCols;j++) {
	    if(Bricks[i][j]==1) {
		ctx.fillStyle = 'rgb(' + Math.floor(255-32.5*i) + ',' + Math.floor(255-32.5*j) + ',0)';  
		ctx.fillRect(j*(BrickWidth+Padding)+Padding,i*(BrickHeight+Padding)+Padding,BrickWidth,BrickHeight);
	    }
	}
    }
    fillRHSArea();
    RowHeight = BrickHeight + Padding;
    ColWidth = BrickWidth + Padding;
    Row = Math.floor(y/RowHeight);
    Col = Math.floor(x/ColWidth);

    //if so, reverse the ball and mark the brick as broken
    if (y < NRows * RowHeight && Row >= 0 && Col >= 0 && Bricks[Row][Col] == 1) {
	dy = -dy;
	Bricks[Row][Col] = 0;
	score ++;
    }
    
    if (x + dx > GAME_WIDTH || x + dx < 0) {
	dx = -dx;
    }

    if (y + dy < 0) {
	dy = -dy;
    } else if (y + dy > GAME_HEIGHT-10) {
	if (autoplay || (x > paddlex - 10 && x < paddlex + paddlew+ 10)) {
	    dy = -dy;
	} else {
	    clearInterval(pid);
	}
    }
    x += dx;
    y += dy;
}
window.onload=function() {
    init();initbricks();
}