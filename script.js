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
  playSound();

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

function addTransition() {
  this.classList.add("pressed");
}

function removeTransition(e) {
  // console.log(e);
  if (e.propertyName !== "transform") return;
  this.classList.remove("pressed");
}

function playSound() {
  const randNum = Math.ceil(Math.random() * 4);
  const sound = document.querySelector(`.sound#a${randNum}`);
  sound.currentTime = 0;
  sound.play();
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
    takeInput(e.target.id.slice(1), calcArray);
    updateDisplay(calcArray);
    // numberKey.classList.add("pressed")
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

const allKeys = document.querySelectorAll("button");

//Keyboard support
window.addEventListener("keydown", (e) => {

  //Check if key is a supported number
  if (Array.from(numberKeys).some((item) => item.innerHTML === e.key)) {
    document.querySelector(`#n${e.key}`).classList.add("pressed");
    takeInput(e.key, calcArray);
    updateDisplay(calcArray);
  } else {
    //Check check other keys

    switch (e.key) {
      
      case ".":
        takeInput(e.key, calcArray);
        document.querySelector(`#decimal`).classList.add("pressed");
        break;
      case "+":
        takeInput(add, calcArray);
        document.querySelector(`#add`).classList.add("pressed");
        break;
      case "-":
        takeInput(subtract, calcArray);
        document.querySelector(`#subtract`).classList.add("pressed");

        break;
      case "=":
      case "Enter":
        document.querySelector(`#equals`).classList.add("pressed");
        playSound();

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
        document.querySelector(`#divide`).classList.add("pressed");

        break;
      case "Backspace":
        takeInput("backspace", calcArray);
        document.querySelector(`#backspace`).classList.add("pressed");

        break;
      case "x":
      case "X":
      case "*":
        takeInput(multiply, calcArray);
        document.querySelector(`#multiply`).classList.add("pressed");
        break;
      case "Escape":
        document.querySelector(`#ac`).classList.add("pressed");
        playSound();

        clearDisplay();
        break;
    }
    updateDisplay(calcArray);


  }
});

allKeys.forEach((key) => {
  key.addEventListener("click", addTransition);
  key.addEventListener("click", playSound);
  key.addEventListener("transitionend", removeTransition);
});
