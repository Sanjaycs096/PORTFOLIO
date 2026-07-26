/**
 * BMW PROTOCOL - GENERAL LOGIC & BOOT
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ECU BOOT SEQUENCE
    // ==========================================
    const bootScreen = document.getElementById('ecu-boot');
    const bootProgress = document.getElementById('boot-progress');
    const bootText = document.getElementById('boot-ready-text');
    
    if(bootScreen) {
        document.body.classList.add('booting');
        
        // Simple progress simulation
        setTimeout(() => { if(bootProgress) bootProgress.style.width = '20%'; }, 500);
        setTimeout(() => { if(bootProgress) bootProgress.style.width = '60%'; }, 1500);
        setTimeout(() => { if(bootProgress) bootProgress.style.width = '100%'; }, 2500);
        
        setTimeout(() => {
            if(bootText) bootText.style.opacity = '1';
        }, 2800);

        setTimeout(() => {
            bootScreen.style.opacity = '0';
            setTimeout(() => {
                bootScreen.style.display = 'none';
                document.body.classList.remove('booting');
                ProtocolState.booted = true;
                triggerReveals();
                if(typeof animateCockpit === 'function') animateCockpit();
            }, 1000);
        }, 4000);
    }

    // ==========================================
    // SCROLL REVEALS
    // ==========================================
    function triggerReveals() {
        if(!ProtocolState.booted) return;
        
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', triggerReveals);

    // ==========================================
    // MISSION CONTROL TRANSMISSION
    // ==========================================
    const form = document.getElementById('secure-contact-form');
    const statusDiv = document.getElementById('transmission-status');
    const btn = document.getElementById('btn-transmit');

    if(form && statusDiv && btn) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            btn.style.display = 'none';
            statusDiv.classList.remove('hidden');
            statusDiv.innerHTML = '<p class="status-text blink">Encrypting Payload...</p>';
            
            setTimeout(() => {
                statusDiv.innerHTML = '<p class="status-text blink bmw-cyan-text">Bypassing Firewall...</p>';
            }, 1500);

            setTimeout(() => {
                statusDiv.innerHTML = '<p class="status-text bmw-red-text">TRANSMISSION SENT SUCCESSFULLY.</p>';
                form.reset();
                setTimeout(() => {
                    statusDiv.classList.add('hidden');
                    btn.style.display = 'block';
                }, 3000);
            }, 3000);
        });
    }

    // ==========================================
    // SHORTCUTS MODAL
    // ==========================================
    const shortcutsBtn = document.getElementById('shortcuts-btn');
    const closeShortcutsBtn = document.getElementById('close-shortcuts');
    const shortcutsModal = document.getElementById('shortcuts-modal');

    if(shortcutsBtn && closeShortcutsBtn && shortcutsModal) {
        shortcutsBtn.addEventListener('click', () => {
            shortcutsModal.classList.remove('hidden');
        });
        closeShortcutsBtn.addEventListener('click', () => {
            shortcutsModal.classList.add('hidden');
        });
        // Close on outside click
        shortcutsModal.addEventListener('click', (e) => {
            if(e.target === shortcutsModal) {
                shortcutsModal.classList.add('hidden');
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && !shortcutsModal.classList.contains('hidden')) {
                shortcutsModal.classList.add('hidden');
            }
        });
    }
});
