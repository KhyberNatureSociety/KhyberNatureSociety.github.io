document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation Toggle
       ========================================================================== */
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       2. Sticky Header Scroll Effect (Home page only)
       ========================================================================== */
    const header = document.querySelector('.site-header');
    
    if (header) {
        const handleScrollHeader = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', handleScrollHeader);
        handleScrollHeader(); // trigger on load
    }

    /* ==========================================================================
       3. Interactive Core Actions Carousel (Home page only)
       ========================================================================== */
        /* ==========================================================================
       3. Interactive Core Actions Carousel (Home page only - Infinite Loop)
       ========================================================================== */
    const track = document.getElementById('actions-carousel-track');
    const prevBtn = document.getElementById('actions-prev');
    const nextBtn = document.getElementById('actions-next');

    if (track && prevBtn && nextBtn) {
        const originalCards = Array.from(track.querySelectorAll('.carousel-card'));
        const originalCount = originalCards.length;
        
        // Clone first 3 cards and append them for infinite wrapping
        const clonesToAppend = 3;
        for (let i = 0; i < clonesToAppend; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('carousel-clone');
            track.appendChild(clone);
        }

        let currentIndex = 0;
        let autoplayTimer = null;
        let isTransitioning = false;
        
        const getVisibleCards = () => {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        };

        const updateSliderPosition = (transition = true) => {
            const cards = track.querySelectorAll('.carousel-card');
            if (cards.length === 0) return;
            const cardWidth = originalCards[0].offsetWidth;
            const gap = 30; // matches css gap
            
            if (transition) {
                track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            } else {
                track.style.transition = 'none';
            }

            const amountToMove = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${amountToMove}px)`;

            prevBtn.disabled = false;
            nextBtn.disabled = false;
            prevBtn.style.opacity = '1';
            nextBtn.style.opacity = '1';
        };

        const handleNext = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            updateSliderPosition(true);
        };

        const handlePrev = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            if (currentIndex === 0) {
                // Snap to clone end instantly
                track.style.transition = 'none';
                currentIndex = originalCount;
                const cardWidth = originalCards[0].offsetWidth;
                const gap = 30;
                track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
                track.offsetHeight; // trigger reflow
                
                // Then animate to originalCount - 1
                currentIndex--;
                setTimeout(() => {
                    updateSliderPosition(true);
                }, 20);
            } else {
                currentIndex--;
                updateSliderPosition(true);
            }
        };

        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            // If we transitioned to the clone end, snap back to beginning
            if (currentIndex >= originalCount) {
                track.style.transition = 'none';
                currentIndex = 0;
                const cardWidth = originalCards[0].offsetWidth;
                const gap = 30;
                track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
                track.offsetHeight; // trigger reflow
            }
        });

        const startAutoplay = () => {
            stopAutoplay();
            autoplayTimer = setInterval(() => {
                handleNext();
            }, 2000);
        };

        const stopAutoplay = () => {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
            }
        };

        prevBtn.addEventListener('click', () => {
            handlePrev();
            startAutoplay();
        });

        nextBtn.addEventListener('click', () => {
            handleNext();
            startAutoplay();
        });

        const carouselContainer = track.closest('.carousel-container-outer');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoplay);
            carouselContainer.addEventListener('mouseleave', startAutoplay);
        }

        window.addEventListener('resize', () => {
            updateSliderPosition(false);
        });

        // Initial setup
        setTimeout(() => {
            updateSliderPosition(false);
            startAutoplay();
        }, 100);
    }

    /* ==========================================================================
       3.1 Interactive Biodiversity Carousel (Home page only - Infinite Loop)
       ========================================================================== */
    const bioTrack = document.getElementById('biodiversity-carousel-track');
    const bioPrevBtn = document.getElementById('bio-prev');
    const bioNextBtn = document.getElementById('bio-next');

    if (bioTrack && bioPrevBtn && bioNextBtn) {
        const originalBioCards = Array.from(bioTrack.querySelectorAll('.bio-carousel-card'));
        const originalBioCount = originalBioCards.length;
        
        // Clone first 3 cards and append them
        const clonesToAppend = 3;
        for (let i = 0; i < clonesToAppend; i++) {
            const clone = originalBioCards[i].cloneNode(true);
            clone.classList.add('bio-carousel-clone');
            bioTrack.appendChild(clone);
        }

        let bioIndex = 0;
        let bioAutoplayTimer = null;
        let bioTransitioning = false;
        
        const getBioVisibleCards = () => {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        };

        const updateBioSliderPosition = (transition = true) => {
            const cards = bioTrack.querySelectorAll('.bio-carousel-card');
            if (cards.length === 0) return;
            const cardWidth = originalBioCards[0].offsetWidth;
            const gap = 30; // matches css gap
            
            if (transition) {
                bioTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            } else {
                bioTrack.style.transition = 'none';
            }

            const amountToMove = bioIndex * (cardWidth + gap);
            bioTrack.style.transform = `translateX(-${amountToMove}px)`;

            bioPrevBtn.disabled = false;
            bioNextBtn.disabled = false;
            bioPrevBtn.style.opacity = '1';
            bioNextBtn.style.opacity = '1';
        };

        const handleBioNext = () => {
            if (bioTransitioning) return;
            bioTransitioning = true;
            bioIndex++;
            updateBioSliderPosition(true);
        };

        const handleBioPrev = () => {
            if (bioTransitioning) return;
            bioTransitioning = true;
            if (bioIndex === 0) {
                bioTrack.style.transition = 'none';
                bioIndex = originalBioCount;
                const cardWidth = originalBioCards[0].offsetWidth;
                const gap = 30;
                bioTrack.style.transform = `translateX(-${bioIndex * (cardWidth + gap)}px)`;
                bioTrack.offsetHeight;
                
                bioIndex--;
                setTimeout(() => {
                    updateBioSliderPosition(true);
                }, 20);
            } else {
                bioIndex--;
                updateBioSliderPosition(true);
            }
        };

        bioTrack.addEventListener('transitionend', () => {
            bioTransitioning = false;
            if (bioIndex >= originalBioCount) {
                bioTrack.style.transition = 'none';
                bioIndex = 0;
                const cardWidth = originalBioCards[0].offsetWidth;
                const gap = 30;
                bioTrack.style.transform = `translateX(-${bioIndex * (cardWidth + gap)}px)`;
                bioTrack.offsetHeight;
            }
        });

        const startBioAutoplay = () => {
            stopBioAutoplay();
            bioAutoplayTimer = setInterval(() => {
                handleBioNext();
            }, 2000);
        };

        const stopBioAutoplay = () => {
            if (bioAutoplayTimer) {
                clearInterval(bioAutoplayTimer);
            }
        };

        bioPrevBtn.addEventListener('click', () => {
            handleBioPrev();
            startBioAutoplay();
        });

        bioNextBtn.addEventListener('click', () => {
            handleBioNext();
            startBioAutoplay();
        });

        const bioContainer = bioTrack.closest('.carousel-container-outer');
        if (bioContainer) {
            bioContainer.addEventListener('mouseenter', stopBioAutoplay);
            bioContainer.addEventListener('mouseleave', startBioAutoplay);
        }

        window.addEventListener('resize', () => {
            updateBioSliderPosition(false);
        });

        setTimeout(() => {
            updateBioSliderPosition(false);
            startBioAutoplay();
        }, 120);
    }



    /* ==========================================================================
       5. Filter Tabs for Media Feed
       ========================================================================== */
    const mediaTabs = document.querySelectorAll('.filter-media-btn');
    const mediaCards = document.querySelectorAll('.media-card-item');

    if (mediaTabs.length > 0 && mediaCards.length > 0) {
        mediaTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                mediaTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const filterValue = tab.getAttribute('data-filter');

                mediaCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    /* ==========================================================================
       6. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.fade-in, .action-card, .mv-card, .team-profile-card, .initiative-card, .pub-card, .media-card-item, .opp-box');

    if (revealElements.length > 0) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target); // stop observing once shown
                }
            });
        };

        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        };

        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

        revealElements.forEach(el => {
            if (!el.classList.contains('fade-in')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            }
            
            el.addEventListener('transitionend', () => {
                el.style.transform = '';
                el.style.opacity = '';
            });
            
            revealObserver.observe(el);
        });
    }

    const styleSheet = document.styleSheets[0];
    if (styleSheet) {
        try {
            styleSheet.insertRule('.appear { opacity: 1 !important; transform: translateY(0) !important; }', styleSheet.cssRules.length);
        } catch (e) {
            console.warn("Could not insert CSS rule: ", e);
        }
    }

    /* ==========================================================================
       7. Form Validation - Contact Form
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                formFeedback.textContent = "Please fill in all required fields.";
                formFeedback.className = "form-feedback error";
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formFeedback.textContent = "Please enter a valid email address.";
                formFeedback.className = "form-feedback error";
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending Message...";
            formFeedback.textContent = "";
            formFeedback.className = "form-feedback";

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                formFeedback.textContent = `Thank you, ${name}! Your inquiry has been received. Our team will get back to you shortly.`;
                formFeedback.className = "form-feedback success";
                
                contactForm.reset();
            }, 1800);
        });
    }

    /* ==========================================================================
       8. Form Validation - Citizen Science Records Form
       ========================================================================== */
    const recordForm = document.getElementById('record-form');
    const recordFeedback = document.getElementById('record-feedback');

    if (recordForm && recordFeedback) {
        recordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('rec-name').value.trim();
            const contact = document.getElementById('rec-contact').value.trim();
            const type = document.getElementById('rec-type').value;
            const commonName = document.getElementById('rec-common').value.trim();
            const location = document.getElementById('rec-location').value.trim();
            const lat = document.getElementById('rec-lat').value.trim();
            const long = document.getElementById('rec-long').value.trim();
            const date = document.getElementById('rec-date').value;
            const notes = document.getElementById('rec-notes').value.trim();
            const consent = document.getElementById('rec-consent').checked;

            if (!name || !contact || !type || !commonName || !location || !lat || !long || !date || !notes || !consent) {
                recordFeedback.textContent = "Please fill in all required fields and accept the verification consent.";
                recordFeedback.className = "form-feedback error";
                return;
            }

            const submitBtn = recordForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting Record...";
            recordFeedback.textContent = "";
            recordFeedback.className = "form-feedback";

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                recordFeedback.textContent = `Thank you, ${name}! Your biodiversity record has been submitted successfully.`;
                recordFeedback.className = "form-feedback success";

                recordForm.reset();
            }, 1800);
        });
    }

    /* ==========================================================================
       9. Form Validation - Become a Member Form
       ========================================================================== */
    const memberForm = document.getElementById('member-form');
    const memberFeedback = document.getElementById('member-feedback');

    if (memberForm && memberFeedback) {
        memberForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('mem-name').value.trim();
            const contact = document.getElementById('mem-contact').value.trim();
            const city = document.getElementById('mem-city').value.trim();
            const type = document.getElementById('mem-type').value;
            const interest = document.getElementById('mem-interest').value;
            const msg = document.getElementById('mem-msg').value.trim();

            if (!name || !contact || !city || !type || !interest || !msg) {
                memberFeedback.textContent = "Please fill in all required fields.";
                memberFeedback.className = "form-feedback error";
                return;
            }

            const submitBtn = memberForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting Membership Request...";
            memberFeedback.textContent = "";
            memberFeedback.className = "form-feedback";

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;

                memberFeedback.textContent = `Thank you, ${name}! Your membership request has been submitted. The KNS team will contact you soon.`;
                memberFeedback.className = "form-feedback success";

                memberForm.reset();
            }, 1800);
        });
    }
});
