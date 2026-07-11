const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restart");
const resetScoreBtn = document.getElementById("resetScore");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

let currentPlayer = "X";
let board = ["","","","","","","","",""];
let gameActive = true;

let scores = JSON.parse(localStorage.getItem("xoScores")) || {
    X:0,
    O:0,
    draw:0
};

updateScoreboard();

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click",handleClick);
});

restartBtn.addEventListener("click",restartGame);
resetScoreBtn.addEventListener("click",resetScores);

function handleClick(){

    const index = this.dataset.index;

    if(board[index]!=="" || !gameActive) return;

    board[index]=currentPlayer;

    this.textContent=currentPlayer;

    this.classList.add("pop");

    if(currentPlayer==="X"){
        this.classList.add("x");
    }else{
        this.classList.add("o");
    }

    checkWinner();
}

function checkWinner(){

    let winner=null;

    for(let condition of winConditions){

        const [a,b,c]=condition;

        if(
            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]
        ){

            winner=condition;
            break;
        }

    }

    if(winner){

        winner.forEach(index=>{
            cells[index].classList.add("winner");
        });

        statusText.textContent=`🎉 اللاعب ${currentPlayer} فاز`;

        scores[currentPlayer]++;

        saveScores();

        gameActive=false;

        return;
    }

    if(!board.includes("")){

        statusText.textContent="🤝 تعادل";

        scores.draw++;

        saveScores();

        gameActive=false;

        return;
    }

    currentPlayer=currentPlayer==="X"?"O":"X";

    statusText.textContent=`دور اللاعب ${currentPlayer}`;

}

function restartGame(){

    board=["","","","","","","","",""];

    currentPlayer="X";

    gameActive=true;

    statusText.textContent="دور اللاعب X";

    cells.forEach(cell=>{

        cell.textContent="";

        cell.classList.remove(
            "x",
            "o",
            "winner",
            "pop"
        );

    });

}

function resetScores(){

    scores={
        X:0,
        O:0,
        draw:0
    };

    saveScores();

}

function saveScores(){

    localStorage.setItem(
        "xoScores",
        JSON.stringify(scores)
    );

    updateScoreboard();

}

function updateScoreboard(){

    scoreX.textContent=scores.X;

    scoreO.textContent=scores.O;

    scoreDraw.textContent=scores.draw;

}
