
rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
ctx = canvas.getContext("2d")

//create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height/2 ,
    size: 10,
    speed: 4,
    dx: 4;
    dy: -4;

}

// draw ball on canvas
function drawball() {
    ctx.beginPath()
}

rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})
