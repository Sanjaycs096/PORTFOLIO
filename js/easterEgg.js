/**
 * BMW PROTOCOL - EASTER EGGS
 */

let typingBuffer = "";
const easterState = {
    m5: false,
    drift: false,
    turbo: false,
    ghost: false,
    nitro: false
};

const triggerWords = {
    "m5": () => { 
        easterState.m5 = !easterState.m5;
        document.body.style.filter = easterState.m5 ? 'sepia(0.5)' : 'none'; 
    },
    "drift": () => { 
        easterState.drift = !easterState.drift;
        if(easterState.drift) {
            document.body.classList.add('drift-mode'); 
        } else {
            document.body.classList.remove('drift-mode'); 
        }
    },
    "turbo": () => { 
        easterState.turbo = !easterState.turbo;
        if(easterState.turbo) {
            document.documentElement.style.setProperty('--bmw-cyan', '#ff00ff'); 
        } else {
            // Restore proper cyan or check current theme
            document.documentElement.style.setProperty('--bmw-cyan', '#00f3ff');
            // If they are in sport/track mode, cycleMode handles restoring proper colors when cycled again
        }
    },
    "hack": () => { document.getElementById('security-lab').scrollIntoView({behavior: 'smooth'}); },
    "engine": () => { if(typeof playSound === 'function') playSound('engine'); },
    "ghost": () => { 
        easterState.ghost = !easterState.ghost;
        document.querySelectorAll('.machine-card').forEach(c => {
            c.style.opacity = easterState.ghost ? '0.3' : '1';
        }); 
    },
    "nitro": () => { 
        easterState.nitro = !easterState.nitro;
        document.body.style.transform = easterState.nitro ? 'skewY(-2deg)' : 'none'; 
    }
};

document.addEventListener('keydown', (e) => {
    if(e.key.length === 1 && e.key.match(/[a-zA-Z0-9]/)) {
        typingBuffer += e.key.toLowerCase();
        
        // Keep buffer manageable
        if(typingBuffer.length > 20) {
            typingBuffer = typingBuffer.substring(1);
        }

        // Check triggers
        for(let word in triggerWords) {
            if(typingBuffer.endsWith(word)) {
                triggerWords[word]();
                typingBuffer = "";
                if(typeof playSound === 'function') playSound('beep');
            }
        }
    }
});
