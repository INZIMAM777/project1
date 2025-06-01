//hero_section
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function () {
            const scrollPosition = window.pageYOffset;
            const heroVideo = document.getElementById('h_video');
            heroVideo.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });

        // navigation menu toggle for mobile
        // Toggle navigation menu on hamburger click
        const hamburger = document.getElementById('hamburger');
        const navUL = document.getElementById('nav_ul');
        const navLinks = document.querySelectorAll('#nav_ul a');

        hamburger.addEventListener('click', () => {
            navUL.classList.toggle('active');
        });

        // Close nav menu after clicking a link (on mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navUL.classList.remove('active');
                }
            });
        });



        //contact.............

        document.querySelectorAll('.input-group input, .input-group textarea, .input-group select').forEach(element => {
            element.addEventListener('focus', function () {
                this.parentNode.querySelector('label').classList.add('active');
                this.parentNode.querySelector('.bar').classList.add('active');
            });

            element.addEventListener('blur', function () {
                if (!this.value) {
                    this.parentNode.querySelector('label').classList.remove('active');
                }
                this.parentNode.querySelector('.bar').classList.remove('active');
            });

            // Initialize labels if fields are pre-filled
            if (element.value) {
                element.parentNode.querySelector('label').classList.add('active');
            }
        });

        // Form submission
        document.getElementById('contactDarkForm').addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your enquiry. Our diamond specialist will contact you shortly.');
            this.reset();
            document.querySelectorAll('.input-group label').forEach(label => {
                label.classList.remove('active');
            });
        });
// (CSS code removed; place this in a .css file instead)