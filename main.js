//taking things from html
const currentNumber = document.querySelector(".currentNumber");
const previousNumber = document.querySelector(".previousNumber p");
const mathSign = document.querySelector(".mathSign");
const numbersButtons = document.querySelectorAll(".number");
const operatorsButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const calculatorHistory = document.querySelector(".history");
const historyBtn = document.querySelector(".history-btn");

//setting result to none
let result = "";

//function that displays numbers
function displayNumbers() {
  if (this.textContent === "." && currentNumber.innerHTML.includes(".")) return;
  if (this.textContent === "." && currentNumber.innerHTML === "")
    return (currentNumber.innerHTML = ".0");

  currentNumber.innerHTML += this.textContent;
}

//function to operate on equations
function operate() {
  if (currentNumber.innerHTML === "" && this.textContent === "-") {
    currentNumber.innerHTML = "-";
    return;
  } else if (currentNumber.innerHTML === "") {
    return;
  }

  if (mathSign.innerHTML !== "") {
    showResult();
  }
  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = "";
}

//function to return result of equation
function showResult() {
  if (previousNumber.innerHTML === "" || currentNumber.innerHTML === "") return;

  let a = Number(currentNumber.innerHTML);
  let b = Number(previousNumber.innerHTML);
  let operator = mathSign.innerHTML;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = b - a;
      break;
    case "x":
      result = a * b;
      break;
    case ":":
      result = b / a;
      break;
    case "^":
      result = b ** a;
      break;
  }
  //calling function to add equation to history
  addToHistory();
  historyBtn.classList.add("active");
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

//function that adds equation to history
function addToHistory() {
  const newHistoryItem = document.createElement("li");
  newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
  newHistoryItem.classList.add("history-item");
  calculatorHistory.appendChild(newHistoryItem);
}

//function to clear the history
function clearHistory() {
  calculatorHistory.textContent = "";
  if (calculatorHistory.textContent === "") {
    historyBtn.classList.remove("active");
  }
}

//function to clear calculator screen
function clearScreen() {
  result = "";
  currentNumber.innerHTML = "";
  previousNumber.innerHTML = "";
  mathSign.innerHTML = "";
}

//buttons listeners
operatorsButtons.forEach((button) => button.addEventListener("click", operate));
equalsButton.addEventListener("click", showResult);
clearButton.addEventListener("click", clearScreen);
numbersButtons.forEach((button) => {
  button.addEventListener("click", displayNumbers);
});
historyBtn.addEventListener("click", clearHistory);
