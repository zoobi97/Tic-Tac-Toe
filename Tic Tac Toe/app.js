const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const clearbtn= document.querySelector(".clear");
let go = "circle";
const startCells = [
    "", "", "",
    "", "", "",
    "", "", "",
]

clearbtn.addEventListener("click",clearBoard);


function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo);
        gameboard.append(cellElement);
    })
}

createBoard();

function addGo(e) {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = "It's now " + go + "'s go";
    e.target.removeEventListener("click", addGo);
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    winningCombinations.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild ?.classList.contains("circle"));
        if (circleWins) {
            infoDisplay.textContent = "Circle Wins !!";
            allSquares.forEach(square=> {
                square.replaceWith(square.cloneNode(true))
            })
        }
    })

    winningCombinations.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild ?.classList.contains("cross"));
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins !!";
            allSquares.forEach(square=> {
                square.replaceWith(square.cloneNode(true))
            })
        }
    })


}

function clearBoard(){
    Array.from(gameboard.children).forEach(cell => {
        cell.innerHTML = "";
        infoDisplay.textContent="";
    });
    
}
