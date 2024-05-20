const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['application', 'programming', 'interface', 'wizard']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]

const correctLetters = []
const wrongLetters = []



let continueRunning = true

// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
      ${selectedWord
        .split('')
        .map(letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `).join('')
    }
    `
    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if (innerWord == selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!'
        popup.style.display = 'flex'
        continueRunning = false
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
     ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
     ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    //display different parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length

        if (index < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })

    //check if lost
    if (wrongLetters.length == figureParts.length) {
        finalMessage.innerText = `Unfortunately you lost! The word was: ${selectedWord}`
        popup.style.display = 'flex'
        continueRunning = false
    }




}

// Show notification
function showNotification() {
    notification.classList.add('show')

    setTimeout(() => {
      notification.classList.remove('show')
    }, 2000)
