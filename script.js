// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {

    reg.onupdatefound = () => {
      const newWorker = reg.installing;

      newWorker.onstatechange = () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          document.getElementById("update-banner").style.display = "block";

          window.updateApp = () => {
            newWorker.postMessage({ action: 'skipWaiting' });
          };
        }
      };
    };
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}

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