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

    // Firebase Image Upload
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const uploadStatus = document.getElementById('uploadStatus');

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (file) {
            const storageRef = firebase.storage().ref('images/' + file.name);
            const uploadTask = storageRef.put(file);

            uploadTask.on('state_changed',
                function(snapshot) {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadStatus.innerHTML = 'Upload is ' + progress + '% done';
                },
                function(error) {
                    console.error('Upload failed:', error);
                    uploadStatus.innerHTML = 'Upload failed: ' + error.message;
                },
                function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        uploadStatus.innerHTML = 'File available at <a href="' + downloadURL + '">' + downloadURL + '</a>';
                    });
                }
            );
        } else {
            uploadStatus.innerHTML = 'No file selected';
        }
    });
});
