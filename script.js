class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computiton;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computiton = prev + current;
        break;
      case "-":
        computiton = prev - current;
        break;
      case "*":
        computiton = prev * current;
        break;
      case "÷":
        computiton = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computiton;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("eng", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]"),
  operationButtons = document.querySelectorAll("[data-operation]"),
  equalsButton = document.querySelector("[data-equals]"),
  deleteButton = document.querySelector("[data-delete]"),
  allClearButton = document.querySelector("[data-all-clear]"),
  previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
  ),
  currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.chooseOperation(number.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
