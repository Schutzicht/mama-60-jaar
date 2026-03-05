document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('envelope-wrapper');

    wrapper.addEventListener('click', () => {
        if (!wrapper.classList.contains('open')) {
            wrapper.classList.add('open');

            // Verberg welkomsttekst
            const welcomeText = document.getElementById('welcome-text');
            if (welcomeText) {
                welcomeText.style.opacity = '0';
                welcomeText.style.transform = 'translateY(-20px) translateX(-50%)';
            }

            // Trigger confetti knal na het openen van de envelop
            setTimeout(() => {
                fireConfetti();

                // Start subtiele, continue regen van confetti
                setInterval(() => {
                    confetti({
                        particleCount: 2,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#cba153', '#734380', '#d4af37'],
                        zIndex: 0
                    });
                    confetti({
                        particleCount: 2,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#cba153', '#734380', '#d4af37'],
                        zIndex: 0
                    });
                }, 400);
            }, 1200);
        }
    });

    function fireConfetti() {
        var count = 250;
        var defaults = {
            origin: { y: 0.6 }, /* Verlaag het startpunt voor de confessi zodat het uit de envelop lijkt te komen */
            zIndex: 100,
            colors: ['#cba153', '#734380', '#fdfafb', '#d4af37', '#a05c7b']
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }
});
