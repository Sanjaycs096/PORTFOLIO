/**
 * BMW PROTOCOL - M MODE SWITCHER
 */
let lastMKeyPressTime = 0;
const modeIndicator = document.getElementById('m-mode-indicator');

document.addEventListener('keydown', (e) => {
    if(e.key.toLowerCase() === 'm') {
        const currentTime = new Date().getTime();
        if(currentTime - lastMKeyPressTime < 500) {
            // Double press detected
            cycleMode();
        }
        lastMKeyPressTime = currentTime;
    }
});

function cycleMode() {
    const body = document.body;
    let newModeStr = "";
    let shortModeStr = "";
    
    if(ProtocolState.mode === 'comfort') {
        ProtocolState.mode = 'sport';
        body.classList.remove('comfort-mode');
        body.classList.add('sport-mode');
        document.documentElement.style.setProperty('--bmw-cyan', '#ff5f56'); // Change theme to red
        newModeStr = "SPORT MODE ENGAGED";
        shortModeStr = "SPORT MODE";
    } else if (ProtocolState.mode === 'sport') {
        ProtocolState.mode = 'track';
        body.classList.remove('sport-mode');
        body.classList.add('track-mode');
        document.documentElement.style.setProperty('--bmw-cyan', '#ffbd2e'); // Change theme to yellow
        newModeStr = "TRACK MODE ENGAGED - DSC OFF";
        shortModeStr = "TRACK MODE";
    } else {
        ProtocolState.mode = 'comfort';
        body.classList.remove('track-mode');
        body.classList.add('comfort-mode');
        document.documentElement.style.setProperty('--bmw-cyan', '#00f3ff'); // Back to cyan
        newModeStr = "COMFORT MODE ENGAGED";
        shortModeStr = "COMFORT MODE";
    }

    if(modeIndicator) {
        modeIndicator.textContent = newModeStr;
        modeIndicator.style.opacity = '1';
        setTimeout(() => { modeIndicator.style.opacity = '0'; }, 2000);
    }
    
    const navModeText = document.getElementById('nav-mode-text');
    if(navModeText) {
        navModeText.textContent = shortModeStr;
        navModeText.style.color = 'var(--bmw-cyan)';
        navModeText.style.borderColor = 'var(--bmw-cyan)';
    }
    
    if(typeof playSound === 'function') playSound('beep');
}
