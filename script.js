const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');

let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let justCalculated = false;


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (justCalculated) {
            displayValue = '';
            justCalculated = false;
        }

        displayValue += button.textContent;
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (displayValue === '' && currentOperator === null) return;

        if (currentOperator !== null && displayValue === '') {
            currentOperator = button.textContent;
            return;
        }

        if (currentOperator !== null) {
            secondNumber = parseFloat(displayValue);
            displayValue = operate(currentOperator, firstNumber, secondNumber).toString();
            updateDisplay();
        }

        firstNumber = parseFloat(displayValue);
        currentOperator = button.textContent;
        displayValue = '';
    });
});

equalButton.addEventListener('click', () => {
    if (firstNumber === null || currentOperator === null || displayValue === '') return;

    secondNumber = parseFloat(displayValue);
    displayValue = operate(currentOperator, firstNumber, secondNumber).toString();
    updateDisplay();

    currentOperator = null;
    justCalculated = true;
});

clearButton.addEventListener('click', () => {
    displayValue = '';
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    justCalculated = false;
    updateDisplay();
});

function updateDisplay() {
    display.textContent = displayValue || '0';
}
decimalButton.addEventListener('click', () => {
    if (justCalculated) {
        displayValue = '0';
        justCalculated = false;
    }

    if (displayValue === '') {
        displayValue = '0';
    }

    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
});


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Nice try. You can't divide by zero.";
    }

    return a / b;   
}

function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            return null;
    }
}
