// 1. Service Worker Registration (Fixed)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
        reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    alert("New update available! Please close and reopen the app.");
                }
            };
        };
    });
}

// 2. Calculator Logic
const display = document.getElementById('display');

function appendValue(val) {
    // Prevent multiple operators in a row
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(lastChar) && operators.includes(val)) return;
    
    display.value += val;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        // Using Function() instead of eval() is slightly safer/cleaner
        display.value = new Function('return ' + display.value)();
    } catch (e) {
        display.value = "Error";
        setTimeout(clearDisplay, 1000);
    }
}
