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

//Variables for Operation & Numbers
let num1;
let operation;
let num2;
let operationDone = false;
function execOperation(num1, num2, operation) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  console.log(operation(num1, num2));
  isNum2 = false
  operationDone = true;
  return operation(num1, num2);
}


function updateDisplay(num1String, operation, num2String) {
  document.querySelector("#number1").textContent = num1String;
  let operatorSymbol;


  if (operation){

  switch(operation.name){
    case "add": operatorSymbol= '+'
        break;
    case "subtract": operatorSymbol= '-'
        break;
    case "multiply": operatorSymbol= 'x'
        break;
    case "divide": operatorSymbol= '➗'
        break;
    }

    document.querySelector("#operator").textContent = operatorSymbol;}

  document.querySelector("#number2").textContent = num2String;
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

//Event Listeners
//Numbers
let num1String = "";
let num2String = "";
//Switch to Num2?
let isNum2 = false;

const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((numberKey) =>
  numberKey.addEventListener("click", (e) => {
    if(operationDone) clearDisplay()
    
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
document
  .querySelectorAll(".row.operators button")
  .forEach((btn) =>
    btn.addEventListener("click", () =>{
      updateDisplay(num1String, operation, num2String)}
    )
  );
//TODO: