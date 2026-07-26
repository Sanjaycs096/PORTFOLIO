/**
 * BMW PROTOCOL - SECURITY LAB TERMINAL
 */

const termLines = [
    "> Initializing Transformer WAF...",
    "> Neural Engine Online.",
    "> Analyzing incoming packet streams...",
    "> Status: SECURE",
    "> Loading WebSense Toolkit...",
    "> Penetration Testing Module Ready.",
    "> Monitoring Threat Vectors..."
];

const termBody = document.getElementById('soc-term-body');

if(termBody) {
    let lineIdx = 0;
    function printTermLine() {
        if(lineIdx < termLines.length) {
            const p = document.createElement('p');
            p.textContent = termLines[lineIdx];
            termBody.appendChild(p);
            lineIdx++;
            if(typeof playSound === 'function') playSound('beep');
            setTimeout(printTermLine, Math.random() * 1000 + 500);
        } else {
            // Loop with dummy traffic
            setInterval(() => {
                const p = document.createElement('p');
                p.textContent = `> Packet dropped from IP: ${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.x.x`;
                termBody.appendChild(p);
                if(termBody.childElementCount > 10) {
                    termBody.removeChild(termBody.firstChild);
                }
            }, 3000);
        }
    }
    
    // Start terminal after 5 seconds to simulate boot
    setTimeout(printTermLine, 5000);
}

// Radar Packet Count
const packetCount = document.getElementById('packet-count');
if(packetCount) {
    setInterval(() => {
        let base = 14205;
        packetCount.textContent = (base + Math.floor(Math.random() * 500)).toLocaleString();
    }, 1000);
}
