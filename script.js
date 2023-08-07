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
  //Take Backspace as input
  if (buttonInput === "backspace") {
    calcArray[calcArray.length - 1] = calcArray[calcArray.length - 1].slice(
      0,
      -1
    );
    return;
  }
  if (typeof buttonInput === "function") {
    //Replace last index if last index isn't a number (meaning it's a function or '' empty string)
    if (!!isNaN(parseFloat(calcArray.slice(-1)))) {
      calcArray[calcArray.length - 2] = buttonInput;
    } else {
      calcArray.push(buttonInput);
      calcArray.push("");
    }
  } else if (typeof +buttonInput === "number") {
    //Check if the string contains decimal
    if (buttonInput === "." && calcArray[calcArray.length - 1].includes(".")) {
      return;
    } else {
      calcArray[calcArray.length - 1] += buttonInput;
    }
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
  let result = calcArray[1](+calcArray[0], +calcArray[2]);
  //result becomes first element of array
  if (!isFinite(result)) return false;
  if (result % 1 != 0) result = result.toFixed(6);
  calcArray[2] = result;
  calcArray.splice(0, 2);
  return true;
}

/** @param {Array} calcArray */
function updateDisplay(calcArray) {
  let operatorSymbol;
  //swap all the functions to displayable symbols
  const calcArraySymbols = calcArray.map((val, index, array) => {
    if (typeof val === "function") {
      switch (val.name) {
        case "add":
          operatorSymbol = "＋";
          break;
        case "subtract":
          operatorSymbol = "﹣";
          break;
        case "multiply":
          operatorSymbol = "×";
          break;
        case "divide":
          operatorSymbol = "÷";
          break;
      }
      return operatorSymbol;
    }
    return val;
  });
  if (calcArray[0] === "") {
    document.querySelector(".display#main").innerHTML = "&nbsp";
  } else {
    const calcArrayString = calcArraySymbols.join(" ");
    document.querySelector(".display#main").textContent = calcArrayString;
  }
}

function clearDisplay() {
  calcArray = [""];
  updateDisplay(calcArray);
}

//Button Event Listeners
document.querySelector("button#ac").addEventListener("click", clearDisplay);

//FIXME:ONE function that checks valid button clicks

//= Buttons
//Decimal Button
document.querySelector("button#decimal").addEventListener("click", (e) => {
  takeInput(".", calcArray);
  updateDisplay(calcArray);
});

//Number buttons
const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", (e) => {
    takeInput(e.target.id, calcArray);
    updateDisplay(calcArray);
  });
});
//Equals button
document.querySelector("button#equals").addEventListener("click", () => {
  if (execOperation(calcArray)) {
    updateDisplay(calcArray);
  } else {
    updateDisplay(calcArray);
    document.querySelector(".display#main").textContent = "invalid result";
  }
});

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
//Backspace
document.querySelector("#backspace").addEventListener("click", (e) => {
  takeInput("backspace", calcArray);
});

//Operations Eventlistener
document.querySelectorAll("button.operator").forEach((btn) =>
  btn.addEventListener("click", () => {
    updateDisplay(calcArray);
  })
);

const allKeys = document.getElementsByTagName("button");
//Keyboard support
window.addEventListener("keydown", (e) => {
  // console.log(e.key);

  //Check if key is a supported number
  if (Array.from(numberKeys).some((item) => item.innerHTML === e.key)) {
    takeInput(e.key, calcArray);
    updateDisplay(calcArray);
  } else {
  //Check check other keys
    switch (e.key) {
      case ".":
        takeInput(e.key, calcArray);
        break;
      case "+":
        takeInput(add, calcArray);
        break;
      case "-":
        takeInput(subtract, calcArray);
        break;
      case "=":
      case "Enter":
        if (execOperation(calcArray)) {
          updateDisplay(calcArray);
        } else {
          updateDisplay(calcArray);
          document.querySelector(".display#main").textContent =
            "invalid result";
        }
        break;
      case "/":
        takeInput(divide, calcArray);
        break;
      case "Backspace":
        takeInput('backspace', calcArray);
        break;
      case "x":
      case "X":
      case "*":
        takeInput(multiply, calcArray);
        break;
        case "Escape":
          clearDisplay()
          break;
    }
    updateDisplay(calcArray);
  }

});
