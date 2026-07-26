/**
 * BMW PROTOCOL - HUD CURSOR
 */
const cursorDot = document.getElementById('hud-cursor-dot');
const cursorTrail = document.getElementById('hud-cursor-trail');
const radarPulse = document.getElementById('hud-radar-pulse');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let trailX = mouseX;
let trailY = mouseY;

if (window.matchMedia("(pointer: fine)").matches) {
    // Add CSS dynamically for cursor
    const style = document.createElement('style');
    style.innerHTML = `
        #hud-cursor-dot { width: 4px; height: 4px; background: var(--bmw-cyan); position: fixed; border-radius: 50%; pointer-events: none; z-index: 10000; transform: translate(-50%, -50%); box-shadow: 0 0 8px var(--bmw-cyan); }
        #hud-cursor-trail { width: 30px; height: 30px; border: 1px solid rgba(0,243,255,0.4); position: fixed; border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s, background 0.2s; }
        #hud-radar-pulse { width: 30px; height: 30px; border: 1px dashed rgba(0,243,255,0.8); position: fixed; border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); opacity: 0; }
        .cursor-hover #hud-cursor-trail { width: 50px; height: 50px; background: rgba(0,243,255,0.1); border-color: var(--bmw-cyan); }
        .pulse-anim { animation: cursorRadar 1s ease-out; }
        @keyframes cursorRadar { 0% { width: 30px; height: 30px; opacity: 1; } 100% { width: 100px; height: 100px; opacity: 0; } }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if(cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    const animateCursor = () => {
        trailX += (mouseX - trailX) * 0.2;
        trailY += (mouseY - trailY) * 0.2;
        if(cursorTrail) {
            cursorTrail.style.left = `${trailX}px`;
            cursorTrail.style.top = `${trailY}px`;
        }
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    window.addEventListener('click', () => {
        if(radarPulse) {
            radarPulse.style.left = `${mouseX}px`;
            radarPulse.style.top = `${mouseY}px`;
            radarPulse.classList.remove('pulse-anim');
            void radarPulse.offsetWidth; // trigger reflow
            radarPulse.classList.add('pulse-anim');
        }
    });

    // Hover states
    document.querySelectorAll('a, button, .machine-card, .showroom-car-card').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}
