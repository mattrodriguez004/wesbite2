
rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
ctx = canvas.getContext("2d")

score = 0

brickRowCount = 9
brickColumnCount = 3

//create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height/2 ,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,

}

//create paddle properties
paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

//create brick properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

//Create Bricks
bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
       const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetx
        const y = j * (brickInfo.h + brickInfo.padding ) + brickInfo.offsetY
        bricks[i][j] = {x,y, ...brickInfo}
    }
}


// draw ball on canvas
function drawball() {
    ctx.beginPath()
    ctx.arc(ball.x,ball.y,ball.size,0, Math.PI * 2,)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()

}

// draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()

}

drawball()
drawPaddle()

// draw score on canvas
function drawScore() {

    ctx.fillText(`Score: $(score)`, canvas.width-100, 30)
}

// draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle= brick.visible ? '#0095dd' :
            'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}

// Create bricks


// Draw everything
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawPaddle()
    drawball()
    drawScore()
    drawBricks()
}

// move paddle on canvas
function movePaddle() {

    paddle.x = paddle.x + paddle.dx

    // wall detection
    if (paddle.x < 0) {
        paddle.x = 0
    }
    
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
}

//Keydown Event
function keyDown(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right') {
        paddle.dx = paddle.speed
    }
    if (e.key == 'ArrowLeft' || e.key == 'Left' ) {
        paddle.dx = -paddle.speed
    }
}

//keyUp event
function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = 0
    }

}


//keyboard event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

//update canvas drawing and animation
function update() {

    movePaddle()
    draw()
    requestAnimationFrame(update)

}

update()

rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})
