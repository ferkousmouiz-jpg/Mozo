const board = document.getElementById("board");

const pieces = [

["♜","♞","♝","♛","♚","♝","♞","♜"],
["♟","♟","♟","♟","♟","♟","♟","♟"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["♙","♙","♙","♙","♙","♙","♙","♙"],
["♖","♘","♗","♕","♔","♗","♘","♖"]

];

let selected = null;

drawBoard();

function drawBoard(){

    board.innerHTML="";

    for(let row=0;row<8;row++){

        for(let col=0;col<8;col++){

            const square=document.createElement("div");

            square.classList.add("square");

            if((row+col)%2===0){

                square.classList.add("light");

            }else{

                square.classList.add("dark");

            }

            square.dataset.row=row;
            square.dataset.col=col;

            square.textContent=pieces[row][col];

            square.addEventListener("click",clickSquare);

            board.appendChild(square);

        }

    }

}

function clickSquare(){

    const row=Number(this.dataset.row);
    const col=Number(this.dataset.col);

    if(selected===null){

        if(pieces[row][col]==="") return;

        selected={row,col};

        this.classList.add("selected");

        return;

    }

    pieces[row][col]=pieces[selected.row][selected.col];

    pieces[selected.row][selected.col]="";

    selected=null;

    drawBoard();

}
