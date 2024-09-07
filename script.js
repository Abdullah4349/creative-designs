document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animation
    gsap.from('header', {
        opacity: 0,
        y: -50,
        duration: 1
    });

    gsap.from('nav ul li', {
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.2
    });

    gsap.from('section', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3
    });

    // ScrollMagic
    const controller = new ScrollMagic.Controller();

    const portfolioAnimation = gsap.from('#portfolio h2', {
        opacity: 0,
        y: 50,
        duration: 1
    });

    new ScrollMagic.Scene({
        triggerElement: '#portfolio',
        triggerHook: 0.8
    })
    .setTween(portfolioAnimation)
    .addTo(controller);

    // Upload Form Handling
    const uploadForm = document.getElementById('uploadForm');
    const uploadStatus = document.getElementById('uploadStatus');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const file = document.getElementById('fileInput').files[0];

        if (file) {
            const storageRef = storage.ref(`images/${file.name}`);
            try {
                await storageRef.put(file);
                uploadStatus.textContent = 'File uploaded successfully!';
            } catch (error) {
                console.error('Error uploading file:', error);
                uploadStatus.textContent = 'Error uploading file. Please try again.';
            }
        }
    });
});
