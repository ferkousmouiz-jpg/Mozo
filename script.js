let randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 10;

const input = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");

const message = document.getElementById("message");

const attemptsText = document.getElementById("attempts");

const bestScoreText = document.getElementById("bestScore");

let bestScore = localStorage.getItem("bestScore");

if (bestScore === null) {
    bestScoreText.textContent = "-";
} else {
    bestScoreText.textContent = bestScore;
}

guessBtn.addEventListener("click", checkGuess);

restartBtn.addEventListener("click", newGame);

function checkGuess() {

    const guess = Number(input.value);

    if (guess < 1 || guess > 100 || isNaN(guess)) {

        message.textContent = "⚠️ أدخل رقماً بين 1 و100";

        message.className = "";

        return;

    }

    attempts--;

    attemptsText.textContent = attempts;

    if (guess === randomNumber) {

        message.textContent = `🎉 أحسنت! الرقم هو ${randomNumber}`;

        message.className = "correct";

        guessBtn.disabled = true;

        const score = 10 - attempts;

        if (bestScore === null || score < bestScore) {

            bestScore = score;

            localStorage.setItem("bestScore", score);

            bestScoreText.textContent = score;

        }

        return;

    }

    if (guess < randomNumber) {

        message.textContent = "📈 الرقم أكبر";

        message.className = "low";

    } else {

        message.textContent = "📉 الرقم أصغر";

        message.className = "high";

    }

    if (attempts === 0) {

        message.textContent = `💥 خسرت! الرقم الصحيح هو ${randomNumber}`;

        message.className = "high";

        guessBtn.disabled = true;

    }

    input.value = "";

    input.focus();

}

function newGame() {

    randomNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 10;

    attemptsText.textContent = attempts;

    message.textContent = "ابدأ بالتخمين...";

    message.className = "";

    input.value = "";

    guessBtn.disabled = false;

    input.focus();

}
