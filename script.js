// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Lightbox
let galleryItems = null;
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
let images = [];

// Initialize gallery lightbox
function initGalleryLightbox() {
    galleryItems = document.querySelectorAll('.gallery-item');
    images = Array.from(galleryItems).map(item => item.dataset.image);
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });
}

function openLightbox() {
    lightboxImage.src = images[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Add animation class
    lightboxImage.style.animation = 'none';
    setTimeout(() => {
        lightboxImage.style.animation = 'lightboxZoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }, 10);
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    lightboxImage.style.opacity = '0';
    lightboxImage.style.transform = 'translateX(50px) scale(0.9)';
    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex];
        lightboxImage.style.transform = 'translateX(-50px) scale(0.9)';
        setTimeout(() => {
            lightboxImage.style.opacity = '1';
            lightboxImage.style.transform = 'translateX(0) scale(1)';
        }, 50);
    }, 200);
}

function showPrevImage() {
    lightboxImage.style.opacity = '0';
    lightboxImage.style.transform = 'translateX(-50px) scale(0.9)';
    setTimeout(() => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex];
        lightboxImage.style.transform = 'translateX(50px) scale(0.9)';
        setTimeout(() => {
            lightboxImage.style.opacity = '1';
            lightboxImage.style.transform = 'translateX(0) scale(1)';
        }, 50);
    }, 200);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Video Modal
const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoClose = document.querySelector('.video-close');
const playButtons = document.querySelectorAll('.play-button');

videoCards.forEach((card, index) => {
    const playBtn = card.querySelector('.play-button');
    const video = card.querySelector('.video-thumbnail');
    
    // Set video thumbnail
    video.addEventListener('loadedmetadata', () => {
        video.currentTime = 1; // Show frame at 1 second as thumbnail
    });

    playBtn.addEventListener('click', () => {
        const sourceElement = video.querySelector('source');
        const videoSource = sourceElement ? sourceElement.src : video.src || video.currentSrc;
        if (videoSource) {
            modalVideo.src = videoSource;
            modalVideo.load();
            videoModal.classList.add('active');
            setTimeout(() => {
                modalVideo.play().catch(e => console.log('Video play failed:', e));
            }, 100);
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeVideoModal() {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
}

videoClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// Close video modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery and video items with enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    // Load wishes when DOM is ready
    loadWishes();
    
    // Initialize gallery lightbox
    initGalleryLightbox();
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const videoCards = document.querySelectorAll('.video-card');
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    
    // Animate gallery items with stagger effect
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9)';
        item.style.transition = `opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.15}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.15}s`;
        observer.observe(item);
    });

    // Animate video cards
    videoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.15}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Enhanced observer for better animations
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    galleryItems.forEach(item => enhancedObserver.observe(item));
    videoCards.forEach(card => enhancedObserver.observe(card));
    sectionTitles.forEach(title => enhancedObserver.observe(title));
    sectionSubtitles.forEach(subtitle => enhancedObserver.observe(subtitle));
    
    // Footer animation
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.3
        });
        footerObserver.observe(footerContent);
    }
    
    // Create floating emojis dynamically for better animation
    createFloatingEmojis();
});

// Create floating love and cake emojis
function createFloatingEmojis() {
    const emojiContainer = document.querySelector('.animated-emojis');
    if (!emojiContainer) return;
    
    const emojis = ['💖', '🎂', '💕', '🎂', '💖', '🎂'];
    const emojiCount = 30;
    
    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 20 + 's';
        emoji.style.animationDuration = (15 + Math.random() * 10) + 's';
        emojiContainer.appendChild(emoji);
    }
}

// Birthday Wishes Functionality
const wishForm = document.getElementById('wishForm');
const wishesContainer = document.getElementById('wishesContainer');
const wishImageInput = document.getElementById('wishImage');
const fileName = document.getElementById('fileName');

// Firebase Configuration
// IMPORTANT: Replace these with your Firebase config!
// Get your config from: https://console.firebase.google.com/
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let database = null;
try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        console.log('Firebase initialized successfully');
    } else {
        console.warn('Firebase not loaded. Using localStorage fallback.');
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// Fallback to localStorage if Firebase is not available
const STORAGE_KEY = 'birthdayWishes';
const USE_FIREBASE = database !== null;

// Load wishes from Firebase or localStorage
function loadWishes() {
    if (USE_FIREBASE && database) {
        // Load from Firebase (public database)
        const wishesRef = database.ref('wishes');
        
        wishesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const wishes = data ? Object.values(data) : [];
            console.log('Loaded wishes from Firebase:', wishes.length);
            displayWishes(wishes);
            
            // Trigger animations
            setTimeout(() => {
                const wishCards = document.querySelectorAll('.wish-card');
                wishCards.forEach((card, index) => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, 100);
        }, (error) => {
            console.error('Error loading wishes from Firebase:', error);
            wishesContainer.innerHTML = '<p class="no-wishes">Error loading wishes. Please try refreshing the page.</p>';
        });
    } else {
        // Fallback to localStorage
        try {
            const storedWishes = localStorage.getItem(STORAGE_KEY);
            const wishes = storedWishes ? JSON.parse(storedWishes) : [];
            console.log('Loaded wishes from localStorage:', wishes.length);
            displayWishes(wishes);
            
            // Trigger animations
            setTimeout(() => {
                const wishCards = document.querySelectorAll('.wish-card');
                wishCards.forEach((card, index) => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, 100);
        } catch (error) {
            console.error('Error loading wishes from storage:', error);
            wishesContainer.innerHTML = '<p class="no-wishes">Error loading wishes. Please try refreshing the page.</p>';
        }
    }
}

// Display wishes
function displayWishes(wishes) {
    if (!wishesContainer) return;
    
    // Update wish count
    const wishesCountEl = document.getElementById('wishesCount');
    if (wishesCountEl) {
        if (wishes.length > 0) {
            wishesCountEl.textContent = `${wishes.length} ${wishes.length === 1 ? 'wish' : 'wishes'} received 💖`;
            wishesCountEl.style.display = 'block';
        } else {
            wishesCountEl.style.display = 'none';
        }
    }
    
    if (wishes.length === 0) {
        wishesContainer.innerHTML = '<p class="no-wishes">No wishes yet. Be the first to send your birthday wishes! 💖</p>';
        return;
    }
    
    // Sort wishes by date (newest first)
    const sortedWishes = [...wishes].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    wishesContainer.innerHTML = sortedWishes.map((wish, index) => {
        const date = new Date(wish.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Format message with line breaks
        const message = escapeHtml(wish.message).replace(/\n/g, '<br>');
        
        return `
            <div class="wish-card" style="animation-delay: ${index * 0.1}s; opacity: 0; transform: translateY(30px);">
                <div class="wish-header">
                    <div class="wish-name">
                        <span class="wish-avatar">${wish.name.charAt(0).toUpperCase()}</span>
                        ${escapeHtml(wish.name)}
                    </div>
                    <div class="wish-date">${formattedDate}</div>
                </div>
                <div class="wish-message">${message}</div>
                ${wish.image ? `<div class="wish-image-container"><img src="${wish.image}" alt="Wish image" loading="lazy"></div>` : ''}
            </div>
        `;
    }).join('');
    
    // Animate wish cards on display
    requestAnimationFrame(() => {
        const wishCards = wishesContainer.querySelectorAll('.wish-card');
        wishCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Convert image file to base64
function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Handle file input change
if (wishImageInput) {
    wishImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
        } else {
            fileName.textContent = '';
        }
    });
}

// Handle form submission
if (wishForm) {
    wishForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = wishForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Get form values
        const name = document.getElementById('wisherName').value.trim();
        const message = document.getElementById('wishMessage').value.trim();
        const imageFile = wishImageInput.files[0];
        
        // Validate
        if (!name || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
        
        try {
            let imageBase64 = null;
            if (imageFile) {
                imageBase64 = await imageToBase64(imageFile);
            }
            
            // Create wish object
            const wish = {
                name: name,
                message: message,
                image: imageBase64,
                date: new Date().toISOString(),
                id: Date.now().toString() // Unique ID
            };
            
            // Save to Firebase (public) or localStorage (fallback)
            if (USE_FIREBASE && database) {
                // Save to Firebase - everyone can see it!
                const wishesRef = database.ref('wishes');
                await wishesRef.push(wish);
                console.log('Wish saved to Firebase successfully!');
                // Wishes will automatically update via real-time listener
            } else {
                // Fallback to localStorage
                let wishes = [];
                try {
                    const storedWishes = localStorage.getItem(STORAGE_KEY);
                    wishes = storedWishes ? JSON.parse(storedWishes) : [];
                } catch (error) {
                    console.error('Error reading from storage:', error);
                    wishes = [];
                }
                
                wishes.push(wish);
                
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
                    console.log('Wish saved to localStorage. Total wishes:', wishes.length);
                    displayWishes(wishes);
                } catch (error) {
                    console.error('Error saving to storage:', error);
                    if (error.name === 'QuotaExceededError') {
                        alert('Storage limit reached. Please set up Firebase for unlimited storage.');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        return;
                    }
                    throw error;
                }
            }
            
            // Reset form
            wishForm.reset();
            fileName.textContent = '';
            
            // Show success animation
            submitBtn.innerHTML = '<span class="btn-text">Sent! 💖</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                
                // Scroll to wishes
                wishesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 2000);
            
        } catch (error) {
            console.error('Error saving wish:', error);
            alert('An error occurred. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
            
        } catch (error) {
            console.error('Error saving wish:', error);
            alert('An error occurred. Please try again.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Initialize wishes when DOM is ready (will be called from existing DOMContentLoaded)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWishes);
} else {
    loadWishes();
}

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        const particles = hero.querySelector('.particles');
        if (heroContent) {
            const opacity = Math.max(0, 1 - scrolled / 600);
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = opacity;
        }
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// Add floating animation to particles
document.addEventListener('DOMContentLoaded', () => {
    const particles = document.querySelector('.particles');
    if (particles) {
        setInterval(() => {
            particles.style.animation = 'none';
            setTimeout(() => {
                particles.style.animation = 'float 25s infinite ease-in-out';
            }, 10);
        }, 25000);
    }
});

