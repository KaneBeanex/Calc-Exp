let newWorker;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {

        if (reg.waiting) {
            showUpdateUI(reg.waiting);
        }

        reg.onupdatefound = () => {
            newWorker = reg.installing;

            newWorker.onstatechange = () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showUpdateUI(newWorker);
                }
            };
        };
    });
}

function showUpdateUI(worker) {
    const banner = document.getElementById("update-banner");
    banner.style.display = "block";

    window.updateApp = () => {
        worker.postMessage("SKIP_WAITING");
    };
}

let refreshing = false;

navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
        refreshing = true;
        window.location.reload();
    }
});


// Calculator Logic
const display = document.getElementById('display');

function appendValue(val) {
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
        display.value = new Function('return ' + display.value)();
    } catch {
        display.value = "Error";
        setTimeout(clearDisplay, 1000);
    }
}