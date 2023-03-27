/* TODO - Create function to populate the display instead of ad-hoc */
const buttons = document.querySelectorAll('.btn');
const displayElement = document.querySelector("#display");
let currentDisplayContent = displayElement.textContent;
let num1;
let num2;
let operator = '';
let result;
const operators = ['+', '-', '*', '/']

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // If click on C, we reset all values
        if (button.textContent === 'C') {
            displayElement.textContent = '';
            num1 = 0;
            num2 = 0;
            operator = '';
        }
        // If click on operator, we lock in 1st number and operator values
        else if (operators.includes(button.textContent)) {
            // If there is already a pair of numbers and operation entered previously, we do that operation and use the result as number 1
            if (findOperatorIndex(displayElement.textContent)) {
                num2 = parseInt(displayElement.textContent.substring(findOperatorIndex(displayElement.textContent) + 1));
                result = operate(operator, num1, num2);
                displayElement.textContent = result;
                num1 = result;
                num2 = 0;
                operator = '';
            }
            else {
                // Lock in num 1, operator and append the text box
                num1 = parseInt(displayElement.textContent);
                operator = button.textContent;
                displayElement.textContent += button.textContent;
            }
        }
        // If click on equals, we make the operation and reset the value 
        else if (button.textContent === '=') {
            num2 = parseInt(displayElement.textContent.substring(findOperatorIndex(displayElement.textContent) + 1));
            result = operate(operator, num1, num2);
            displayElement.textContent = result;
            num1 = 0;
            num2 = 0;
            operator = '';
        }
        // If click on digit, we just append the value
        else displayElement.textContent += button.textContent;
    })
})

function findOperatorIndex(text) {
    let textArray = text.split("");
    for (op of operators) {
        let operatorIndex = textArray.indexOf(op);
        if (operatorIndex >= 0) {
            return operatorIndex;
        }
    }
    return null;
}


function operate(operator, num1, num2) {
    // which op to call, get result and update display and reset the data.
    if (operator === '+') return add(num1, num2);
    else if (operator === '-') return substract(num1, num2);
    else if (operator === '*') return multiply(num1, num2);
    else if (operator === '/') return divide(num1, num2);
}

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return Math.round(num1 / num2);
}