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
const calcArray = [""];
let currentPos;
function takeInput(buttonInput, calcArray) {
  if (typeof buttonInput === "function") {
    calcArray.push(buttonInput);
    calcArray.push("");
    currentPos = calcArray.length - 1;
  } else if (typeof +buttonInput === "number") {
    calcArray[calcArray.length - 1] += buttonInput;
  }

  console.table(calcArray);
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
    if (index !== 0 && index % 2 !== 0) {
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
  console.log(calcArraySymbols);
  const calcArrayString = calcArraySymbols.join(" ");
  document.querySelector(".display#main").textContent = calcArrayString;
}

function clearDisplay() {
  num1String = "";
  num2String = "";
  operation = null;
  document.querySelector("#number1").textContent = num1String;
  document.querySelector("#operator").textContent = "";
  document.querySelector("#number2").textContent = num2String;
}

//Button Event Listeners
document.querySelector("button#clear").addEventListener("click", clearDisplay);

//FIXME:ONE function that checks valid button clicks

//Number buttons
const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((numberKey) =>
  numberKey.addEventListener("click", (e) => {
    takeInput(e.target.id, calcArray);
  })
);

//= Button
document
  .querySelector("button#equals")
  .addEventListener("click", () =>
    execOperation(calcArray)
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