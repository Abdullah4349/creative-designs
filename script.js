// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
    gsap.from('header h1', { duration: 1.5, y: -50, opacity: 0, onComplete: () => {
        gsap.set('header h1', { clearProps: 'all' });
    }});
    gsap.from('header p', { duration: 1.5, y: 50, opacity: 0, delay: 0.5, onComplete: () => {
        gsap.set('header p', { clearProps: 'all' });
    }});
    gsap.from('nav ul li', { duration: 1, y: 20, opacity: 0, stagger: 0.2, delay: 1, onComplete: () => {
        gsap.set('nav ul li', { clearProps: 'all' });
    }});
    gsap.from('.portfolio-item', { duration: 1, y: 20, opacity: 0, stagger: 0.2, delay: 1.5, onComplete: () => {
        gsap.set('.portfolio-item', { clearProps: 'all' });
    }});

    // ScrollMagic for scroll animations
    const controller = new ScrollMagic.Controller();

    document.querySelectorAll('.portfolio-item, .skill, .testimonial').forEach((item) => {
        new ScrollMagic.Scene({
            triggerElement: item,
            triggerHook: 0.9,
            reverse: false
        })
        .setTween(gsap.from(item, { y: 50, opacity: 0, duration: 1, onComplete: () => {
            gsap.set(item, { clearProps: 'all' });
        }}))
        .addTo(controller);
    });

    // Log opacity changes
    const container = document.querySelector('.container');
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'style') {
                console.log('Container style changed:', container.style.opacity);
            }
        });
    });
    observer.observe(container, { attributes: true });
});
