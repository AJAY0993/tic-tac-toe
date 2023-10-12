const boxes = document.querySelectorAll('.column')
const turn = document.querySelector('.turn')
const start = document.querySelector('.start')
const startGame = document.querySelector('.startGame')
const reset = document.querySelector('.reset')
const overlay = document.querySelector('.overlay')
const winAudio = new Audio('victory.mp3')

function game() {
    let count = 0
    turn.innerText = 'Player X turn'
    start.style.display = 'none'
    boxes.forEach(box => box.addEventListener('click', (e) => {
        if (box.getAttribute('filled') == 'true') {
            alert('pls select a different box')
            count--
        }
        else {
            box.setAttribute('filled', 'true')

            if (count % 2) {
                turn.innerText = 'Player X turn'
                box.classList.add('filled-o');
                box.setAttribute('data-xoro', 'o')
                const span = document.createElement('span')
                span.innerText = 'O'
                span.classList.add('stroke-o')
                box.appendChild(span)
            }
            else {
                turn.innerText = 'Player O turn'
                box.classList.add('filled-x');
                box.setAttribute('data-xoro', 'x')
                const span = document.createElement('span')
                span.innerText = 'X'
                span.classList.add('stroke-x')
                box.appendChild(span)
            }
        }
        const currentPlayer = box.getAttribute('data-xoro').toUpperCase()
        const result = checkWin(currentPlayer)
        if (result === 'win') {
            return 0
        }
        count++
    }))
}
//Logic for checking winner-----------------------------------------------------------
function checkWin(player) {
    // For rows------------------------------------------------------------
    if (((boxes[0].getAttribute('data-xoro') !== 'empty') &&
        (boxes[0].getAttribute('data-xoro') == boxes[1].getAttribute('data-xoro')) &&
        (boxes[1].getAttribute('data-xoro') == boxes[2].getAttribute('data-xoro'))) ||

        ((boxes[3].getAttribute('data-xoro') !== 'empty') &&
            (boxes[3].getAttribute('data-xoro') == boxes[4].getAttribute('data-xoro')) &&
            (boxes[4].getAttribute('data-xoro') == boxes[5].getAttribute('data-xoro'))) ||

        ((boxes[6].getAttribute('data-xoro') !== 'empty') &&
            (boxes[6].getAttribute('data-xoro') == boxes[7].getAttribute('data-xoro')) &&
            (boxes[7].getAttribute('data-xoro') == boxes[8].getAttribute('data-xoro')))
    ) {
        turn.style.color = `var(--${player}-stroke)`
        turn.innerText = `${player} won`
        winAudio.play()
        overlay.style.display = 'block'
        return 'win'
    }
    //For columns --------------------------------------------------------------
    else if (((boxes[0].getAttribute('data-xoro') !== 'empty') &&
        (boxes[0].getAttribute('data-xoro') == boxes[3].getAttribute('data-xoro')) &&
        (boxes[3].getAttribute('data-xoro') == boxes[6].getAttribute('data-xoro'))) ||

        ((boxes[1].getAttribute('data-xoro') !== 'empty') &&
            (boxes[1].getAttribute('data-xoro') == boxes[4].getAttribute('data-xoro')) &&
            (boxes[4].getAttribute('data-xoro') == boxes[7].getAttribute('data-xoro'))) ||

        ((boxes[2].getAttribute('data-xoro') !== 'empty') &&
            (boxes[2].getAttribute('data-xoro') == boxes[5].getAttribute('data-xoro')) &&
            (boxes[5].getAttribute('data-xoro') == boxes[8].getAttribute('data-xoro')))
    ) {//Displaying result on the basis of winner--------------------------------------
        turn.style.color = `var(--${player}-stroke)`
        turn.innerText = `${player} won`
        winAudio.play()
        overlay.style.display = 'block'
        return 'win'
    }
    //For diagonals---------------------------------------------------------------------
    else if (((boxes[0].getAttribute('data-xoro') !== 'empty') &&
        (boxes[0].getAttribute('data-xoro') == boxes[4].getAttribute('data-xoro')) &&
        (boxes[4].getAttribute('data-xoro') == boxes[8].getAttribute('data-xoro'))) ||

        ((boxes[2].getAttribute('data-xoro') !== 'empty') &&
            (boxes[2].getAttribute('data-xoro') == boxes[4].getAttribute('data-xoro')) &&
            (boxes[4].getAttribute('data-xoro') == boxes[6].getAttribute('data-xoro')))
    ) {
        turn.style.color = `var(--${player}-stroke)`
        turn.innerText = `${player} won`
        winAudio.play()
        overlay.style.display = 'block'
        return 'win'
    }

}

startGame.addEventListener('click', () => {
    game()
    startGame.style.display = 'none'
    reset.style.display = 'block'
    reset.addEventListener('click', () => {
        location.reload()
    })
})

