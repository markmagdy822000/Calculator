let screen = document.querySelector('.screen');
let buffer = "0";
let runningTotal = 0;
let previousOperator;

function buttonClick(value) {
    if (isNaN(value))
        handelSymbol(value);
    else
        handleNumber(value);
    rerender();
}

function handleNumber(value) {
    if (buffer === '0')
        buffer = value;
    else
        buffer += value;
}

function handelSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length == 1)
                buffer = "0";
            else
                buffer = buffer.substring(0, buffer.length - 1);
            break;
        case '=':
            if (previousOperator == null)
                return;
            flushOperation(parseInt(buffer));
            buffer = runningTotal;
            previousOperator = null;
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    if (runningTotal === 0)
        runningTotal = parseInt(buffer);
    else
        flushOperation(parseInt(buffer));
    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === '+')
        runningTotal += intBuffer;
    else if (previousOperator === '-')
        runningTotal -= intBuffer;
    else if (previousOperator === '×')
        runningTotal *= intBuffer;
    else
        runningTotal /= intBuffer;
}
function rerender() {
    screen.innerText = buffer;
}

function init() {
    document.querySelector('.btns').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });
}

init();