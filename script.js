let start = document.querySelector("button");
let boardDisplay = document.getElementById("board");
let title = document.getElementById("title");
let startButton = document.getElementById("start-button");
let board;
let boardWidth = 1000;
let boardHeight = 850;
let context; 
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;
let wPressed = false;
let sPressed = false;
let upPressed = false;
let downPressed = false;

start.onclick=function(){
  start.style.display = "none";
  title.style.display = "none";
  startButton.style.display = "none";
  board.style.display = "block";
}


let player1 = {
    x : 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

let player1Score = 0;
let player2Score = 0;


//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : 1,
    velocityY : 2
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw initial player1
    context.fillStyle="skyblue";
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);
    requestAnimationFrame(update)
    document.addEventListener("keyup", movePlayer);
    document.addEventListener("keydown", movePlayer);


}

function update(){
  requestAnimationFrame(update)
    context.clearRect(0, 0, board.width, board.height);
    //player1
    context.fillStyle="#4DEEEA";
     //player1.y += player1.velocityY;
     let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    //player2
    //player2.y += player2.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);

    //ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) { 
        // if ball touches top or bottom of canvas
        ball.velocityY *= -1; //reverse direction 
    }

//bounce
    B=-1
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) { //left side of ball touches right side of player 1 (left paddle)
            ball.velocityX *= B + -0.2;   // flip x direction
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) { //right side of ball touches left side of player 2 (right paddle)
            ball.velocityX *= B + -0.2;   // flip x direction
        }
    }

    //game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

     //score
     context.font = "45px sans-serif";
     context.fillText(player1Score, boardWidth/5, 45);
     context.fillText(player2Score, boardWidth*4/5 - 45, 45);

    
}
function outOfBounds(yPosition){
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}
function movePlayer(e) {
    
    //player1
    if (e.code == "KeyW") {
        player1.velocityY = -5; 
    }
    if (e.code == "KeyS") {
        console.log("S");
        player1.velocityY = 5;   
    }
    //player2
    if (e.code == "Up"|| e.code =="ArrowUp") {
        console.log("up");
        player2.velocityY = -5;    
    }
    if (e.code == "Down"|| e.code =="ArrowDown") {
         player2.velocityY = 5;
        
    }
}
function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function resetGame(direction) {
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : direction,
        velocityY : 2
    }
}