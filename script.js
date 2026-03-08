document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('envelope-wrapper');
    const letter = document.getElementById('letter');
    const oystersContainer = document.getElementById('oysters-container');
    let oystersInterval;

    wrapper.addEventListener('click', (e) => {
        if (!wrapper.classList.contains('open')) {
            wrapper.classList.add('open');
            letter.classList.add('open');

            // Verberg welkomsttekst
            const welcomeText = document.getElementById('welcome-text');
            if (welcomeText) {
                welcomeText.style.opacity = '0';
                welcomeText.style.transform = 'translateY(-30px) translateX(-50%)';
            }

            // Trigger confetti en oesters na het openen van de envelop
            setTimeout(() => {
                fireConfetti();
                startOysters();

                // Start subtiele, continue regen van confetti
                setInterval(() => {
                    confetti({
                        particleCount: window.innerWidth < 500 ? 1 : 2,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#0284c7', '#94a3b8', '#d4af37'],
                        zIndex: 100
                    });
                    confetti({
                        particleCount: window.innerWidth < 500 ? 1 : 2,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#0284c7', '#94a3b8', '#d4af37'],
                        zIndex: 100
                    });
                }, 400);
            }, 1000);
        }
    });

    function startOysters() {
        if (oystersInterval) return;

        // Initial burst
        for (let i = 0; i < 5; i++) {
            spawnOyster();
        }

        // Continuous stream
        oystersInterval = setInterval(spawnOyster, 800);
    }

    function spawnOyster() {
        const oyster = document.createElement('div');
        oyster.classList.add('floating-oyster');
        oyster.innerText = '🦪';

        // Random horizontal start position start between 5% and 95%
        oyster.style.left = Math.random() * 90 + 5 + 'vw';

        // Random size variation
        const scale = Math.random() * 0.8 + 0.6;
        oyster.style.transform = `scale(${scale})`;

        // Random animation duration between 6s and 12s
        const duration = Math.random() * 6 + 6;
        oyster.style.animationDuration = duration + 's';

        oystersContainer.appendChild(oyster);

        // Remove after animation completes
        setTimeout(() => {
            if (oyster.parentNode) {
                oyster.parentNode.removeChild(oyster);
            }
        }, duration * 1000);
    }

    function fireConfetti() {
        var isMobile = window.innerWidth < 500;
        var count = isMobile ? 120 : 250;
        var defaults = {
            origin: { y: isMobile ? 0.75 : 0.6 },
            zIndex: 100,
            colors: ['#0ea5e9', '#e2e8f0', '#d4af37', '#38bdf8', '#cbd5e1']
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }
});
