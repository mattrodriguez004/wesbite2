//update the wrong letters
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span></span>)` }



//display parts
    figure.Parts.forEach((part, index)  => {
        const errors = wrongLetters.length

        if(index < errors) {
            part.style.display = 'block'


        }
    })
}
