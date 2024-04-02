
show = document.getElementById('rules-btn');
close = document.getElementById('close-btn');
rules = document.getElementById('rules');
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

score = 0;
BrickRowCount = 9;
BrickColumnCount = 5;

//create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}


paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

BrickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
}

bricks = []
for (let i = 0; i < BrickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < BrickColumnCount; j++) {
        const x = i * (BrickInfo.w + BrickInfo.padding) + BrickInfo.offsetX
        const y = j * (BrickInfo.h + BrickInfo.padding) + BrickInfo.offsetY
        bricks[i][j] = {
            x,
            y,
            ...BrickInfo,
        }
    }
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
    ctx.stroke()
}

function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

function movePaddle() {
    paddle.x = paddle.x + paddle.dx

    if (paddle.x < 0) {
        paddle.x = 0
    }

    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
}


function draw() {
    ctx.clearRect(0 , 0,canvas.width,canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}


function moveBall() {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy

    // wall collision (top)
    if (ball.y + ball.size < 0 ) {
        ball.dy = -1 + ball.dy
    }

    //wall collision (right)
    if (ball.x + ball.size > canvas.width) {
        ball.dx = -1 * ball.dy
    }
}

//update canvas drawing and animation
function update() {
    movePaddle()
    draw()
    requestAnimationFrame(update)
}

update ()

function keyDown(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd') {
        paddle.dx = paddle.speed
    }

    if (e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a') {
        paddle.dx = -paddle.speed
    }
}

function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd' || e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a')
        paddle.dx = 0
}

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

show.addEventListener('click', () => {
    rules.classList.toggle('show')
})

close.addEventListener('click', () => {
    rules.classList.toggle('show')
})
