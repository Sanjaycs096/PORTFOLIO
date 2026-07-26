/**
 * BMW PROTOCOL - MAIN INITIALIZATION
 */
const ProtocolState = {
    isMuted: true,
    mode: 'comfort', // comfort, sport, track
    booted: false
};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (ProtocolState.isMuted) return;
    // We would trigger actual HTMLAudioElements here if src was provided.
    // As a fallback, we synthesize a small beep using Web Audio API for UI feedback.
    if(type === 'beep') {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioContext.currentTime);
        gain.gain.setValueAtTime(0.05, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        osc.start();
        osc.stop(audioContext.currentTime + 0.1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Mute Button Logic
    const muteBtn = document.getElementById('mute-btn');
    if(muteBtn) {
        muteBtn.addEventListener('click', () => {
            ProtocolState.isMuted = !ProtocolState.isMuted;
            if(audioContext.state === 'suspended' && !ProtocolState.isMuted) {
                audioContext.resume();
            }
            muteBtn.innerHTML = ProtocolState.isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            muteBtn.classList.toggle('active', !ProtocolState.isMuted);
            if(!ProtocolState.isMuted) playSound('beep');
        });
    }

    // Interactive Buttons
    document.querySelectorAll('.hud-btn, .nav-link').forEach(btn => {
        btn.addEventListener('mouseenter', () => playSound('beep'));
    });
});
