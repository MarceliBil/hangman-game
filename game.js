(function main() {

    //HANGMAN ELEMENTS
    const base = document.querySelector("#base"),
        pole = document.querySelector("#pole"),
        topBeam = document.querySelector("#top_beam"),
        rope = document.querySelector("#rope"),
        head = document.querySelector("#head"),
        torso = document.querySelector("#torso"),
        rightArm = document.querySelector("#right_arm"),
        leftArm = document.querySelector("#left_arm"),
        rightLeg = document.querySelector("#right_leg"),
        leftLeg = document.querySelector("#left_leg");

    //END SCREEN ELEMENTS
    const endScreen = document.querySelector(".end__screen"),
        gameResult = document.querySelector(".game__result"),
        phraseToGuess = document.querySelector(".phrase__to__guess");

    //RENDER THE KEYBOARD
    (function renderKeyboard() {
        const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
            'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U',
            'V', 'W', 'X', 'Y', 'Z'];

        ALPHABET.forEach(i => {
            let cell = document.createElement('button')
            cell.textContent = i
            cell.classList.add('letter')
            document.querySelector(".keyboard").appendChild(cell)
        })
    })()

    //START THE GAME
    let phrase,
        singleCharacters,
        hideCharacters,
        mistakes = 0;

    const setPhrase = (arg1) => {
        phrase = arg1.join("").toUpperCase()
        singleCharacters = phrase.split("");
        hideCharacters = singleCharacters.map(i => i == " " ? " " : "_");
        document.querySelector(".phrase").textContent = hideCharacters.join("")
        console.log(`A phrase to guess: ${phrase}`);
    }

    let api = 'https://random-word-api.herokuapp.com/word?number=1';

    (async function testMan() {
        await fetch(api)
            .then(res => res.json())
            .then(data => {
                setPhrase(data)
            })
            .catch((err) => {
                setPhrase(['hello world'])
                console.log(err);
            })
    })()

    //GAME OVER
    const gameOver = (score, msg) => {

        document.querySelectorAll(".letter").forEach(i => i.disabled = 'true')
        gameResult.textContent = score;
        phraseToGuess.textContent = `A phrase to guess was: ${phrase}`

        let scoreColor = msg ? "win" : "defeat";
        gameResult.classList.add(scoreColor)
        endScreen.classList.add("visible");
    }

    //PLAY AGAIN
    document.querySelector(".play__again").addEventListener("click", () => location.reload())

    //MAIN COURSE OF THE GANE 
    const gameCourse = (letterTextContent, letterBtn) => {

        letterBtn.disabled = 'true'

        if (singleCharacters.includes(letterTextContent)) {

            letterBtn.classList.add("success")

            let index = -1
            singleCharacters.map(i => { index++; if (i == letterTextContent) hideCharacters[index] = letterTextContent })

            document.querySelector(".phrase").textContent = hideCharacters.join("")
        }
        else {
            letterBtn.classList.add("mistake")
            mistakes++

            switch (mistakes) {
                case 1:
                    base.classList.add("visible")
                    break;
                case 2:
                    pole.classList.add("visible")
                    break;
                case 3:
                    topBeam.classList.add("visible")
                    break;
                case 4:
                    rope.classList.add("visible")
                    break;
                case 5:
                    head.classList.add("visible")
                    break;
                case 6:
                    torso.classList.add("visible")
                    break;
                case 7:
                    rightArm.classList.add("visible")
                    break;
                case 8:
                    leftArm.classList.add("visible")
                    break;
                case 9:
                    rightLeg.classList.add("visible")
                    break;
                case 10:
                    leftLeg.classList.add("visible")
                    gameOver("defeat")
                    break;
                default: 0
                    break;
            }
        }
        const WIN = !hideCharacters.includes("_")
        if (WIN) gameOver("win", WIN)
    }
    document.querySelectorAll(".letter").forEach(i => {
        return i.addEventListener('click', () => gameCourse(i.textContent, i))
    })
})()

