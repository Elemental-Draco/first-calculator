// DOM ELEMENTS
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equals = document.querySelector("[data-id='equals']");
const decimal = document.querySelector("[data-id='decimal']");
const del = document.querySelector("[data-id='delete']");
const clear = document.querySelector("[data-id='clear']");
const display = document.querySelector(".displayInput");

// math functions

function compute(firstVal, operation, secondVal) {
  switch (operation) {
    case "+":
      return +firstVal + +secondVal;
    case "-":
      return +firstVal - +secondVal;
    case "X":
      return +firstVal * +secondVal;
    case "/":
      return +firstVal / +secondVal;
  }
}

let firstValue;
let operationSign;
let secondValue;
// event listeners -----------------------

// event listener for all the buttons

numbers.forEach((num) => {
  num.addEventListener("click", (event) => {
    display.innerText += event.target.innerText;
  });
});

operators.forEach((sign) => {
  sign.addEventListener("click", (event) => {
    if (
      /[+\-\/X]/.test(display.innerText) == false &&
      display.innerText !== "" &&
      display.innerText !== "."
    ) {
      display.innerText += event.target.innerText;
    } else if (/[+\-\/X]/.test(display.innerText)) {
      let positionOfOperator = display.innerText.search(/[+\-\/X]/);
      firstValue = display.innerText.slice(0, positionOfOperator);
      secondValue = display.innerText.slice(positionOfOperator + 1);
      operationSign = display.innerText.charAt(positionOfOperator);

      if (compute(firstValue, operationSign, secondValue) !== undefined) {
        display.innerText =
          compute(firstValue, operationSign, secondValue) +
          event.target.innerText;
      } else if (operationSign == "/" && secondValue == 0) {
        display.innerText = "self destruct";
      } //else {
      //   display.innerText = "0";
      // }
    }
  });
});
// del key done
del.addEventListener("click", () => {
  display.innerText = display.innerText.slice(0, -1);
});

// Clear button done
clear.addEventListener("click", () => {
  display.innerText = "";
  firstValue = 0;
  operationSign = "";
  secondValue = 0;
});
// Decimal point Done
decimal.addEventListener("click", () => {
  if (!display.innerText.includes(".")) {
    display.innerText += ".";
  }
});

equals.addEventListener("click", (event) => {
  let positionOfOperator = display.innerText.search(/[+\-\/X]/);
  firstValue = display.innerText.slice(0, positionOfOperator);
  secondValue = display.innerText.slice(positionOfOperator + 1);
  operationSign = display.innerText.charAt(positionOfOperator);

  if (compute(firstValue, operationSign, secondValue) !== undefined) {
    display.innerText = compute(firstValue, operationSign, secondValue);
  } else if (operationSign == "/" && secondValue == 0) {
    display.innerText = "self destruct";
  } else {
    return;
  }
});
