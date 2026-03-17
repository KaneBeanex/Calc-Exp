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

// --- PWA INSTALLATION LOGIC ---
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default browser automatic prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Un-hide our custom install button
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the native install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('App installed successfully');
        }
        // We can only use the prompt once, so clear it
        deferredPrompt = null;
        // Hide the button again
        installBtn.style.display = 'none';
    }
});
                
