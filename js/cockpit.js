/**
 * BMW PROTOCOL - COCKPIT ANIMATIONS
 */

function animateCockpit() {
    // RPM Dial
    const rpmFill = document.getElementById('rpm-fill');
    const rpmVal = document.getElementById('rpm-val');
    if(rpmFill && rpmVal) {
        setInterval(() => {
            const base = ProtocolState.mode === 'track' ? 6.5 : (ProtocolState.mode === 'sport' ? 4.0 : 1.2);
            const variance = Math.random() * 0.4 - 0.2;
            const currentRPM = (base + variance).toFixed(1);
            rpmVal.textContent = currentRPM;
            
            // stroke-dasharray is 125. 125 offset = 0%, 0 offset = 100%
            const pct = Math.min((currentRPM / 8) * 100, 100);
            const offset = 125 - (125 * pct / 100);
            rpmFill.style.strokeDashoffset = offset;
        }, 1000);
    }

    // Speed Dial
    const speedFill = document.getElementById('speed-fill');
    const speedVal = document.getElementById('speed-val');
    if(speedFill && speedVal) {
        setInterval(() => {
            const base = ProtocolState.mode === 'track' ? 245 : (ProtocolState.mode === 'sport' ? 140 : 85);
            const variance = Math.floor(Math.random() * 5 - 2);
            const currentSpeed = base + variance;
            speedVal.textContent = currentSpeed;
            
            const pct = Math.min((currentSpeed / 300) * 100, 100);
            const offset = 125 - (125 * pct / 100);
            speedFill.style.strokeDashoffset = offset;
        }, 500);
    }

    // Stats Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / 200;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        // wait for reveal
        setTimeout(updateCount, 2000);
    });

    // Bio Typewriter
    const bioText = "Architecting high-performance systems with precision.";
    const bioEl = document.getElementById('typewriter-bio');
    let i = 0;
    if(bioEl) {
        function typeWriter() {
            if (i < bioText.length) {
                bioEl.innerHTML += bioText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 1500);
    }
}
