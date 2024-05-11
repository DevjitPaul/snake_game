let board = document.querySelector(".board");
let scr = document.querySelector(".score");
let highScr = document.querySelector(".highScore");
let control=document.querySelectorAll(".controls i");


let foodX, foodY;
let snakeX = 5, snakeY = 10;
let dx = 0, dy = 0;
let arr = [];

let score = 0, highscore = localStorage.getItem("highscore");

document.querySelector(".container").style.display = "flex";
document.querySelector(".showResult").style.display = "none";

scr.innerHTML = `Score : ${score}`;
highScr.innerHTML = `High-Score : ${highscore}`;

//change food position
function foodPosition() {
    foodX = Math.floor((Math.random() * 28) + 1);
    foodY = Math.floor((Math.random() * 28) + 1);
}


function play() {
    board.innerHTML = `<div class="food" style="grid-area:${foodX} / ${foodY}"></div>`;

    
    snakeX += dx;
    snakeY += dy;

    //shift the snake forward
    for (let i = arr.length - 1; i > 0; i--) {
        arr[i] = arr[i - 1];
    }
    arr[0] = [snakeX, snakeY];
    for (let i = 0; i < arr.length; i++) {
        board.innerHTML += `<div class="snakeHead" style="grid-area:${arr[i][0]} / ${arr[i][1]}"></div>`;

        //when snake touch own body....game over code
        if (i!==0 && arr[0][0] === arr[i][0] && arr[0][1] === arr[i][1]) {
            document.querySelector(".showScore").innerHTML = `${score}`
            localStorage.setItem("highscore", highscore);
            document.querySelector(".container").style.display = "none";
            document.querySelector(".showResult").style.display = "flex";
        }
    }

    //when sanke eat a food
    if (snakeX === foodX && snakeY === foodY) {
        console.log(arr);
        foodPosition();
        arr.push([foodX, foodY]);
        score++;
        scr.innerHTML = `Score : ${score}`;
        if (score > highscore) {
            highscore = score
            highScr.innerHTML = `High-Score : ${highscore}`;
        }
    }

    //when snake touch the boundry
    if (snakeX <= 0 || snakeX > 28 || snakeY <= 0 || snakeY > 28) {
        document.querySelector(".showScore").innerHTML = `${score}`
        localStorage.setItem("highscore", highscore);
        document.querySelector(".container").style.display = "none";
        document.querySelector(".showResult").style.display = "flex";
    }
}


document.addEventListener("keydown", move);
function move(e) {
    if (e.key === "ArrowUp" && dx != 1) {
        dx = -1;
        dy = 0;
    }
    else if (e.key === "ArrowDown" && dx != -1) {
        dx = 1;
        dy = 0;
    }
    else if (e.key === "ArrowRight" && dy != -1) {
        dx = 0;
        dy = 1;
    }
    else if (e.key === "ArrowLeft" && dy != 1) {
        dx = 0;
        dy = -1;
    }
    play();
}

//controls for small devices like phones
control.forEach((key)=>{
    key.addEventListener("click",()=>move({key:key.dataset.key}));
})



foodPosition();
setInterval(() => {
    play();
}, 220);

// play();