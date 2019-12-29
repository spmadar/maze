'use strict';
const mazeBoard = document.getElementById("mazeBoard");
//const player = document.getElementById("player");
// current player position
let posX = 0;
let posY = 9;


let prevId = "9.0"

let boxLeft = 0;
let boxTop = 0;

const board = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];
// render the board into the DOM
// iterate over each row of maze
for (var r = 0; r < board.length; r++) {
    var row = document.createElement("div");
    row.classList.add("row");

    // iterate over each column of maze
    for (var c = 0; c < board[r].length; c++) {
        // creating divs for each cell
        var id_str = r + "." + c;
        switch (board[r][c]) {
            case "F": // finish cell
                var finish = document.createElement("div");
                finish.classList.add("finish","cell","column");
                finish.id = id_str;
                row.appendChild(finish);
                break;
            case "W": // wall cell
                var wall = document.createElement("div");
                wall.classList.add("wall","cell","column");
                wall.id = id_str;
                row.appendChild(wall);
                break;
            case "S": // starting cell
                var start = document.createElement("div");
                start.classList.add("start","cell","column");
                start.id = id_str;
                row.appendChild(start);
                break;
            case " ": // empty or "floor" cell
                var empty = document.createElement("div");
                empty.classList.add("empty","cell","column");
                empty.id = id_str;
                row.appendChild(empty);    

        }
    }
    mazeBoard.appendChild(row);
    console.log("board dimensions " + board.length + " rows " + board[0].length + " columns ")
}
placeBox();

document.addEventListener('keydown', playerMove);

function validatePos (x,y) {
    return (
        y >= 0 &&
        y < board.length && 
        x >= 0 && 
        x < board[0].length &&
        board[y][x] !== "W"
        )
}
function placeBox() {
    var curLoc = document.getElementById("player");
    curLoc.parentNode.removeChild(curLoc);
    // currentPos = board[posY][posX]
    var id_str = posY + "." + posX;
    var newDiv = document.getElementById(id_str);
    console.log(newDiv);
    newDiv.appendChild(curLoc);
    
    
}



// function placeBox() {
//     boxTop = 8 + posY * 30;
//     boxLeft = 8 + posX * 30;
//     document.getElementById("player").style.top = boxTop + "px";
//     document.getElementById("player").style.left = boxLeft + "px";
// }

function playerMove(event) {
    console.log("got event: " + event.key);
    prevId = posY + "." + posX;
    switch (event.keyCode) {
        case 40: // down arrow
            if (validatePos(posX, posY + 1)) {
                posY += 1;
            }
        break;
    
        case 38: // up arrow
            if (validatePos(posX, posY - 1)) {
                posY -= 1;
            }
        break;

        case 37: // left arrow
            if (validatePos(posX - 1, posY)) {
                posX -= 1;
            }
        break;
        
        case 39: // right arrow
            if (validatePos(posX + 1, posY)) {
                posX += 1;
            }
        break;
    }
    console.log("current position " + posY + "," + posX);
    // update box position
    placeBox();
    // check for win
    if (board[posY][posX]== "F") {
        // alert ("You win!");
        // $('#winMessage').text('You win!');
        document.getElementById('winMessage').innerHTML = "Winner!";
    }
}


