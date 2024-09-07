document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');

    // GSAP Animations
    gsap.from('header h1', {
        duration: 1.5,
        y: -50,
        opacity: 0,
        onComplete: () => {
            gsap.set('header h1', { clearProps: 'all' });
        }
    });

    gsap.from('header p', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.5,
        onComplete: () => {
            gsap.set('header p', { clearProps: 'all' });
        }
    });

    gsap.from('nav ul li', {
        duration: 1,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        delay: 1,
        onComplete: () => {
            gsap.set('nav ul li', { clearProps: 'all' });
        }
    });

    gsap.from('.portfolio-item', {
        duration: 1,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        delay: 1.5,
        onComplete: () => {
            gsap.set('.portfolio-item', { clearProps: 'all' });
        }
    });

    // ScrollMagic for Scroll Animations
    const controller = new ScrollMagic.Controller();

    document.querySelectorAll('.portfolio-item, .skill, .testimonial').forEach((item) => {
        new ScrollMagic.Scene({
            triggerElement: item,
            triggerHook: 0.9,
            reverse: false
        })
        .setTween(gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 1,
            onComplete: () => {
                gsap.set(item, { clearProps: 'all' });
            }
        }))
        .addTo(controller);
    });

    // Log Opacity Changes
    const container = document.querySelector('.container');
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'style') {
                console.log('Container style changed:', container.style.opacity);
            }
        });
    });
    observer.observe(container, { attributes: true });

    // Firebase Authentication
    const auth = firebase.auth();
    const adminUID = 'YOUR_ADMIN_UID';  // Replace with your actual admin UID

    // Check if the user is logged in and is the admin
    auth.onAuthStateChanged(user => {
        if (user && user.uid === adminUID) {
            document.getElementById('upload').style.display = 'block';
        }
    });

    // Upload Form Submission Logic
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`portfolio/${file.name}`);
        const uploadTask = fileRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.getElementById('uploadStatus').textContent = `Upload is ${progress}% done`;
            },
            (error) => {
                alert('Failed to upload image: ' + error.message);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    document.getElementById('uploadStatus').textContent = 'Upload successful!';
                    displayImage(downloadURL);
                });
            }
        );
    });

    function displayImage(url) {
        const portfolioItems = document.querySelector('.portfolio-items');
        const newPortfolioItem = document.createElement('div');
        newPortfolioItem.classList.add('portfolio-item');
        newPortfolioItem.innerHTML = `
            <img src="${url}" alt="New Project">
            <h3>New Project</h3>
        `;
        portfolioItems.appendChild(newPortfolioItem);
    }
});
