const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace');

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
    const result = operate(currentOperator, firstNumber, secondNumber);
    displayValue = formatResult(result);
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
        const result = operate(currentOperator, firstNumber, secondNumber);
        displayValue = formatResult(result);
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
backspaceButton.addEventListener('click', () => {
    if (justCalculated) {
        displayValue = '';
        justCalculated = false;
        updateDisplay();
        return;
    }

    displayValue = displayValue.slice(0, -1);
    updateDisplay();
});
function formatResult(result) {
    if (typeof result === 'string') {
        return result;
    }

    if (!Number.isInteger(result)) {
        return Number(result.toFixed(8)).toString();
    }

    return result.toString();
}


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
