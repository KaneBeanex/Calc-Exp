let newWorker;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        // Check if the new worker has finished installing
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Show the update banner to the user
          document.getElementById('update-banner').style.display = 'block';
        }
      });
    });
  });
}

// Function called by the button in the banner
function updateApp() {
  if (newWorker) {
    newWorker.postMessage('SKIP_WAITING');
  }
}

// Reload the page once the new Service Worker has taken control
navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});
