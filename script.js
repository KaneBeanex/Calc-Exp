const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (value === 'C') {
            currentInput = '';
            display.innerText = '0';
        } else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            display.innerText = currentInput || '0';
        } else if (value === '=') {
            try {
                // Using Function instead of eval for a bit more security
                currentInput = Function('"use strict";return (' + currentInput + ')')();
                display.innerText = currentInput;
            } catch {
                display.innerText = "Error";
                currentInput = '';
            }
        } else {
            if (display.innerText === '0') currentInput = '';
            currentInput += value;
            display.innerText = currentInput;
        }
    });
});
