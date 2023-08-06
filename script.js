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
//tracks all numbers and operations in an array
const calcArray = [];
let currentPos;
function trackOperations(buttonInput) {
  currentPos = calcArray.length();
  //check whether number/operator can be accepted
  let inputShouldBe;
  //Even indexes hold numbers
  if (currentPos === 0 || currentPos % 2 === 0) {
    inputShouldBe = "number";
  } else {
    inputShouldBe = "operator";
  }

  if (inputShouldBe === "number") {
    if (typeof +buttonInput != "number") {
      console.log("input is not a number when it should be");
      return;
    }
  } else {
    calcArray.push(buttonInput);
    currentPos = calcArray.length();
    return;
  }

  if (inputShouldBe === "operator") {
    if (typeof buttonInput != "function") {
      console.log("input is not a function when it should be");
      return;
    }
  } else {
    calcArray.push(buttonInput);
    currentPos = calcArray.length();
    return;
  }
}

//Variables for Operation & Numbers
/** @param {Array} calcArray */
function execOperation(calcArray) {
    
    //basically my own version of the reduce method
    while(calcArray.length > 1){
    //perform operation for the first 3 elements of calcArray
    // operation(element1, element2)
     const result= calcArray[1](calcArray[0],calcArray[2])
    //result becomes first element of array
    calcArray[2] = result
    calcArray.splice(0,2)
        }
        return calcArray
    
}
console.log(execOperation([1,add,3,multiply,4]));

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
      return operatorSymbol
    }
    return val
  })
  console.log(calcArraySymbols);
  ;
  const calcArrayString = calcArraySymbols.join(' ')
  document.querySelector('.display#main').textContent = calcArrayString
}

function clearDisplay() {
  num1String = "";
  num2String = "";
  operation = null;
  document.querySelector("#number1").textContent = num1String;
  document.querySelector("#operator").textContent = "";
  document.querySelector("#number2").textContent = num2String;
}
document.querySelector("button#clear").addEventListener("click", clearDisplay);

//TODO: Track place in array
//Rules for array: last place in array must be a number
//array[0] is number
//array[1, 3, 5, 7, 9] must be operators

//last place in array = array.length -1

//Start with array with 1 empty string array[0]
//when button is clicked, if it's an  operator button, do nothing

//if number, create temp string, extend string on every click

//update every click
//update: display the whole array, parsed

//Event Listeners

const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((numberKey) =>
  numberKey.addEventListener("click", (e) => {
    if (operationDone) clearDisplay();
    //FIXME:
    if (!isNum2) {
      num1String += e.target.id;
      updateDisplay(num1String, operation, num2String);
    } else {
      num2String += e.target.id;
      updateDisplay(num1String, operation, num2String);
    }
  })
);

//Clicking operator buttons toggles between Num1 and Num2 (if conditions
//met)
document.querySelectorAll(".row.operators, button.row#clear").forEach((btn) =>
  btn.addEventListener("click", () => {
    //FIXME:

    //if num2String and op
    //Case when num1String is Active. If num1String isn't empty and operation are chosen, switch type mode to num2String
    if (!isNum2 && num1String.length > 0 && operation) {
      isNum2 = true;
      console.log({ isNum2 });
    }
    //Case when num2String is Active
    if (isNum2 && num2String.length > 0 && operation) {
      isNum2 = false;
      console.log({ isNum2 });
    }
  })
);
//= Button
document
  .querySelector("button#equals")
  .addEventListener("click", () =>
    execOperation(num1String, num2String, operation)
  );

const test = document.querySelector("#add").id;

document.querySelector("#add").addEventListener("click", () => {
  if (!operation) operation = add;
});
document.querySelector("#subtract").addEventListener("click", () => {
  if (!operation) operation = subtract;
});
document.querySelector("#multiply").addEventListener("click", () => {
  if (!operation) operation = multiply;
});
document.querySelector("#divide").addEventListener("click", () => {
  if (!operation) operation = divide;
});

//Operations Eventlistener
document.querySelectorAll(".row.operators button").forEach((btn) =>
  btn.addEventListener("click", () => {
    updateDisplay(num1String, operation, num2String);
  })
);
//TODO:
