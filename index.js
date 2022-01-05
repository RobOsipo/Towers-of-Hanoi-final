// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!


//////// ALL variables liable to change, so they are initialized with let
let stone
let moveMessage = ''; 
let currentStoneSize
let selectedRow 
let numberOfMoves = 0; 

/// This lets you click on the row and get its corresponding information
const selectRow = (row) => {
  moveMessage = '';
  document.getElementById("moveMessage").innerHTML = moveMessage
  const currentRow = row.getAttribute("data-row")
  const currentRowId = row.id
  console.log(`the row you clicked on is ${currentRow} row and has id ${currentRowId}`)

  pickUpStone(currentRowId)
} 

// This removes the stone selected in the last function from its current row
const pickUpStone = (rowId) => {
  selectedRow = document.getElementById(rowId);
  console.log(selectedRow);
  stone = selectedRow.removeChild(selectedRow.lastElementChild);
  currentStoneSize = parseInt(stone.getAttribute("data-size")); 
  console.log(stone, currentStoneSize)
}



// The logic and else if statements for dropping the selected stone and being able to pick up another
const dropStone = (row) => {
  const droppedRow = document.getElementById(row.id);
  const rowSize = droppedRow.childElementCount
  console.log(rowSize)
  if(rowSize === 0){
    droppedRow.appendChild(stone);
    console.log("move successful");
    moveMessage = "Successfully moved stone"; 
    document.getElementById("moveMessage").innerHTML = moveMessage
    stone = null; 
    currentStoneSize = null; 
    numberOfMoves++
    document.getElementById("moves").innerHTML = numberOfMoves
  }else if((rowSize > 0) && (parseInt(droppedRow.lastElementChild.innerHTML) > currentStoneSize)){
    droppedRow.appendChild(stone);
    numberOfMoves++
    document.getElementById("moves").innerHTML = numberOfMoves
    console.log("this is a valid move");
    moveMessage = "Successfully moved stone"
    document.getElementById("moveMessage").innerHTML = moveMessage
    checkForWin();
    stone = null; 
    currentStoneSize = null; 
  }else{
    selectedRow.appendChild(stone)
    console.log("invalid move"); 
    moveMessage = "Invalid move. The stone you are placing must be smaller than the last stone in ending stack.";
    document.getElementById("moveMessage").innerHTML = moveMessage
    stone = null; 
    currentStoneSize = null; 
  }
}

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

/// This is logic from main.js 

function checkForWin(){

  const topRedRowSize = document.getElementById("top-row").childElementCount
  const middleYellowRowSize = document.getElementById("middle-row").childElementCount
  const bottomGreenRowSize = document.getElementById("bottom-row").childElementCount

  console.log(topRedRowSize, middleYellowRowSize, bottomGreenRowSize)

  if(topRedRowSize === 4 || middleYellowRowSize === 4 || bottomGreenRowSize === 4){
    console.log("you won!");
    alert("You won the game! Congratulations!")
    document.getElementById("moveMessage").innerHTML = ''; 
  }
}

function resetGame(){
  console.log("game reset");
  alert("Game reset");
  moveMessage = '';
  numberOfMoves = 0; 
  document.getElementById("moveMessage").innerHTML = moveMessage;
  document.getElementById("moves").innerHTML = numberOfMoves;
  const bottomRow = document.getElementById("bottom-row")
  const middleRow = document.getElementById("middle-row");
  const topRow = document.getElementById("top-row");
  let lastStone = null; 
 
  while(middleRow.lastElementChild){
    lastStone = middleRow.lastElementChild
    middleRow.removeChild(lastStone)
    bottomRow.appendChild(lastStone)
    lastStone = null 
  }

  while(topRow.lastElementChild){
    lastStone = topRow.lastElementChild
    topRow.removeChild(lastStone)
    bottomRow.appendChild(lastStone)
    lastStone = null 
  }

  let stones = bottomRow.childNodes
  let stonesArray = []; 

  for(let i = 0; i < stones.length; i++){
    if(stones[i].nodeType == 1){
      stonesArray.push(stones[i])
    }
  }
  console.log(stonesArray)

  stonesArray.sort(function(a,b){
    return a.innerHTML == b.innerHTML
    ? 0
    : (a.innerHTML < b.innerHTML ? 1 : -1);
  });

  for(let i = 0; i < stonesArray.length; i++){
    bottomRow.appendChild(stonesArray[i])
  }
}