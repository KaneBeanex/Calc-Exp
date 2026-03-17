// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registered!'))
            .catch(err => console.error('Service Worker Failed:', err));
    });
}

// Calculator Logic
const display = document.getElementById('display');

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        // Safe evaluation for standard math string
        display.value = eval(display.value) || '';
    } catch (e) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}
