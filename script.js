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

//Variables for display
let num1;
let operation;
let num2;

function operate(num1, num2, operation) {
  return operation(num1, num2);
}

//Event Listeners
//Numbers
let num1String = "";
let num2String = "";
//Switch to Num2?
let isNum2 = false;

const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((numberKey) =>
  numberKey.addEventListener("click", (e) => {
    if (!isNum2) {
      num1String += e.target.id;
      console.log(num1String);
      updateDisplay(num1String, operation, num2String);
    } else {
        num2String += e.target.id;
        console.log(num2String);
        updateDisplay(num1String, operation, num2String);

    }
  })
);

//When to toggle between Num1 and Num2
document.querySelectorAll(".row.operators, button.row#clear").forEach((btn) =>
  btn.addEventListener("click", () => {
    //if num2String and op
    //Case when num1String is Active. If num1String isn't empty and operation are chosen, switch type mode to num2String
    if (!isNum2 && num1String.length > 0 && operation) {
      isNum2 = true;
      console.log({isNum2});
    }
    //Case when num2String is Active
    if (isNum2 && num2String.length > 0 && operation) {
      isNum2 = false;
      console.log({isNum2});
    }
  })
);
//Functions
function updateDisplay(num1String, operation, num2String){
    document.querySelector('#number1').textContent = num1String
    document.querySelector('#operator').textContent = document.querySelector(`.operators button#add`).textContent
    document.querySelector('#number2').textContent = num2String
}


//Operations Eventlistener

document.querySelector("#add").addEventListener("click", () => {
  operation = add;
});
document.querySelector("#subtract").addEventListener("click", () => {
  operation = subtract;
});
document.querySelector("#multiply").addEventListener("click", () => {
  operation = multiply;
});
document.querySelector("#divide").addEventListener("click", () => {
  operation = divide;
});

document.querySelector("#equals").addEventListener("click", operate);
