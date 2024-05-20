show = document.getElementById('rules-btn');
close = document.getElementById('close-btn');
rules = document.getElementById('rules');
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

score = 0;
BrickRowCount = 9;
BrickColumnCount = 5;

ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
};

paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
};

BrickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

bricks = [];
for (let i = 0; i < BrickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < BrickColumnCount; j++) {
        const x = i * (BrickInfo.w + BrickInfo.padding) + BrickInfo.offsetX;
        const y = j * (BrickInfo.h + BrickInfo.padding) + BrickInfo.offsetY;
        bricks[i][j] = {
            x,
            y,
            ...BrickInfo
        };
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brick.w, brick.h);
                ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
                ctx.fill();
                ctx.closePath();
            }
        });
    });
}

function movePaddle() {
    paddle.x += paddle.dx;

    if (paddle.x < 0) {
        paddle.x = 0;
    }

    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    if (ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    if (ball.y + ball.size > canvas.height) {
        if (!gameover) {
            ball.dy *= -1;
        }
    }

    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed;
    }

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y - ball.size < brick.y + brick.h &&
                    ball.y + ball.size > brick.y
                ) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });
}

function increaseScore() {
    score++;
    if (score == BrickRowCount * BrickColumnCount) {
        score = 0;
        showAllBricks();
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawScore();
    drawBricks();
}

let gamePaused = true;
let colorTheme = false;
let gameover = false;

const startButton = document.getElementById('start-btn');
const restartButton = document.createElement('button');
restartButton.textContent = 'Restart';
restartButton.classList.add('btn');

const colorThemeButton = document.getElementById('color-theme-btn');

function toggleColorTheme() {
    colorTheme = !colorTheme;
    document.body.style.backgroundColor = colorTheme ? 'Blue' : 'White';
    canvas.style.background = colorTheme ? 'Black' : 'Gold';
    ctx.fillStyle = colorTheme ? '#fff' : '#0095DD';
    draw();
}

colorThemeButton.addEventListener('click', toggleColorTheme);

startButton.addEventListener('click', () => {
    if (gamePaused) {
        gamePaused = false;
        startButton.style.display = 'none';
        requestAnimationFrame(update);
    }
});

restartButton.style.display = 'none';

document.body.appendChild(restartButton);

function checkGameOver() {
    if (ball.y + ball.size > canvas.height) {
        gameover = true;
        restartButton.style.display = 'block';
        startButton.style.display = 'none';
        gamePaused = true;
        prevScore = score;
        drawScore();
    }
}

function restartGame() {
    score = 0;
    gameover = false;
    gamePaused = false;
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    paddle.x = canvas.width / 2 - 40;
    ball.x = canvas.width / 2;
    ball.y = canvas.height - 30;
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}

restartButton.addEventListener('click', () => {
    restartGame();
    gamePaused = false;
    restartButton.style.display = 'none';
    requestAnimationFrame(update);
});

function update() {
    if (!gamePaused && !gameover) {
        moveBall();
        movePaddle();
        draw();
        checkGameOver();
        requestAnimationFrame(update);
    }

    if (gameover && gamePaused) {
        restartButton.style.display = 'block';
    }
}

update();

function keyDown(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd') {
        paddle.dx = paddle.speed;
    }

    if (e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a') {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd' || e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a') {
        paddle.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

show.addEventListener('click', () => {
    rules.classList.toggle('show');
});

close.addEventListener('click', () => {
    rules.classList.toggle('show');
});
