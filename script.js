//FUNCTIONS
// add
function add(a, b) {
  return a + b;
}
// subtract
function subtract(a, b) {
  return a - b;
}
// multiply
function multiply(a, b) {
  return a * b;
}
// divide
function divide(a, b) {
  return a / b;
}

//takes in input from button. tracks all numbers and operations in an array
let calcArray = [""];
function takeInput(buttonInput, calcArray) {

  if (typeof buttonInput === "function") {
    //Replace last index if last index isn't a number (meaning it's a function or '' empty string)
    if(!!isNaN(parseFloat(calcArray.slice(-1)))){
      calcArray[calcArray.length - 2] = buttonInput 
  
    }else{
    calcArray.push(buttonInput);
    calcArray.push("");
  }
  } else if (typeof +buttonInput === "number") {
    calcArray[calcArray.length - 1] += buttonInput;
  }

  return;
  // }}
}

//Variables for Operation & Numbers
/** @param {Array} calcArray */
function execOperation(calcArray) {
  //TODO: potential error handling
  //basically my own version of the reduce method
    //perform operation for the first 3 elements of calcArray
    // operation(element1, element2)
    const tempResult = calcArray[1](+calcArray[0], +calcArray[2]);
    //result becomes first element of array
    calcArray[2] = tempResult;
    calcArray.splice(0, 2);
  return calcArray[0];
}

/** @param {Array} calcArray */
function updateDisplay(calcArray) {
  let operatorSymbol;
  //swap all the functions to displayable symbols
  const calcArraySymbols = calcArray.map((val, index, array) => {
    if (typeof val === 'function') {
      switch (val.name) {
        case "add":
          operatorSymbol = "+";
          break;
        case "subtract":
          operatorSymbol = "-";
          break;
        case "multiply":
          operatorSymbol = "x";
          break;
        case "divide":
          operatorSymbol = "➗";
          break;
      }
      return operatorSymbol;
    }
    return val;
  });
  if(calcArray[0] === "") {document.querySelector(".display#main").innerHTML= "&nbsp"}
else{
  const calcArrayString = calcArraySymbols.join(" ");
//TODO: DONT let dIV COLLAPSE
  document.querySelector(".display#main").textContent = calcArrayString
}
}

function clearDisplay() {
  calcArray = [""]
  updateDisplay(calcArray)
}

//Button Event Listeners
document.querySelector("button#clear").addEventListener("click", clearDisplay);

//FIXME:ONE function that checks valid button clicks

//= Buttons

//Number buttons
const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((numberKey) =>
  numberKey.addEventListener("click", (e) => {
    takeInput(e.target.id, calcArray);
    updateDisplay(calcArray);
  })
);
//Equals button
document
  .querySelector("button#equals")
  .addEventListener("click", () =>{
    execOperation(calcArray);
    updateDisplay(calcArray)
  
  }
  );

const test = document.querySelector("#add").id;

document.querySelector("#add").addEventListener("click", (e) => {
  takeInput(add, calcArray);
});
document.querySelector("#subtract").addEventListener("click", (e) => {
  takeInput(subtract, calcArray);
});
document.querySelector("#multiply").addEventListener("click", (e) => {
  takeInput(multiply, calcArray);
});
document.querySelector("#divide").addEventListener("click", (e) => {
  takeInput(divide, calcArray);
});

//Operations Eventlistener
document.querySelectorAll(".row.operators button").forEach((btn) =>
  btn.addEventListener("click", () => {
    updateDisplay(calcArray);
  })
);