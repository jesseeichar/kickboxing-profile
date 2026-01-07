// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebarNav = document.getElementById('sidebarNav');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    menuToggle.classList.add('active');
    sidebarNav.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    menuToggle.classList.remove('active');
    sidebarNav.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    if (sidebarNav.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when clicking a link
sidebarNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarNav.classList.contains('active')) {
        closeSidebar();
    }
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            // Get navbar height
            const navbarHeight = navbar.offsetHeight;
            // Get target position
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            // Scroll to position minus navbar height
            window.scrollTo({
                top: targetPosition - navbarHeight,
                behavior: 'smooth'
            });
            // Update URL hash without jumping
            history.pushState(null, null, href);
        }
    });
});

// Print button functionality (optional - can be triggered via Ctrl+P)
window.printPortfolio = () => {
    window.print();
};

// Timeline Zoom functionality
const timelineContainer = document.getElementById('timelineContainer');
const timelineZoomOut = document.getElementById('timelineZoomOut');
const timelineSectionAreas = document.querySelectorAll('.timeline-section-area');
const timelineSvg = document.querySelector('.timeline-svg');
const timelineNavPrev = document.getElementById('timelineNavPrev');
const timelineNavNext = document.getElementById('timelineNavNext');
let currentSection = 1;
const totalSections = 3;

// Check if mobile screen
function isMobile() {
    return window.innerWidth <= 768;
}

function updateNavButtons() {
    timelineNavPrev.disabled = currentSection <= 1;
    timelineNavNext.disabled = currentSection >= totalSections;
}

function zoomToSection(sectionNum) {
    currentSection = parseInt(sectionNum);
    timelineContainer.classList.remove('zoom-section-1', 'zoom-section-2', 'zoom-section-3');
    timelineContainer.classList.add('zoomed', `zoom-section-${sectionNum}`);
    updateNavButtons();
}

function zoomOut() {
    // On mobile, don't allow zoom out - keep one section visible
    if (isMobile()) {
        return;
    }
    timelineContainer.classList.remove('zoomed', 'zoom-section-1', 'zoom-section-2', 'zoom-section-3');
}

// Auto-zoom to section 1 on mobile
function initTimelineZoom() {
    if (isMobile()) {
        zoomToSection(1);
    }
}

// Initialize on load
initTimelineZoom();

// Re-initialize on resize
window.addEventListener('resize', () => {
    if (isMobile() && !timelineContainer.classList.contains('zoomed')) {
        zoomToSection(1);
    } else if (!isMobile() && timelineContainer.classList.contains('zoomed')) {
        // Optional: zoom out when switching to desktop
        // Uncomment the next line if you want this behavior
        // zoomOut();
    }
});

timelineSectionAreas.forEach(section => {
    section.addEventListener('click', (e) => {
        // On mobile, don't allow clicking sections to zoom (already zoomed)
        if (isMobile()) {
            return;
        }
        e.stopPropagation();
        const sectionNum = section.dataset.section;
        zoomToSection(sectionNum);
    });
});

timelineZoomOut.addEventListener('click', zoomOut);

// Navigation arrows
timelineNavPrev.addEventListener('click', () => {
    if (currentSection > 1) {
        zoomToSection(currentSection - 1);
    }
});

timelineNavNext.addEventListener('click', () => {
    if (currentSection < totalSections) {
        zoomToSection(currentSection + 1);
    }
});

// Click on SVG to zoom out when zoomed (disabled on mobile)
timelineSvg.addEventListener('click', (e) => {
    if (isMobile()) {
        return; // Don't allow zoom out on mobile
    }
    if (timelineContainer.classList.contains('zoomed') && !e.target.closest('.timeline-section-area')) {
        zoomOut();
    }
});

// Keyboard navigation for timeline
document.addEventListener('keydown', (e) => {
    if (!timelineContainer.classList.contains('zoomed')) return;

    if (e.key === 'Escape') {
        zoomOut();
    } else if (e.key === 'ArrowLeft' && currentSection > 1) {
        zoomToSection(currentSection - 1);
    } else if (e.key === 'ArrowRight' && currentSection < totalSections) {
        zoomToSection(currentSection + 1);
    }
});

// Achievement Modal functionality
const achievementModal = document.getElementById('achievementModal');
const modalClose = document.getElementById('modalClose');
const achievementCards = document.querySelectorAll('.achievement-card');

achievementCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        const title = card.dataset.title;
        const location = card.dataset.location;
        const result = card.dataset.result;
        const description = card.dataset.description;
        const quote = card.dataset.quote;

        document.getElementById('modalCategory').textContent = category;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalLocation').textContent = location;
        document.getElementById('modalResult').textContent = result;
        document.getElementById('modalDescription').textContent = description;

        const quoteEl = document.getElementById('modalQuote');
        if (quote) {
            quoteEl.textContent = '"' + quote + '"';
            quoteEl.style.display = 'block';
        } else {
            quoteEl.style.display = 'none';
        }

        achievementModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    achievementModal.classList.remove('active');
    document.body.style.overflow = '';
});

achievementModal.addEventListener('click', (e) => {
    if (e.target === achievementModal) {
        achievementModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && achievementModal.classList.contains('active')) {
        achievementModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Partner Card Modal
const partnerModal = document.getElementById('partnerModal');
const partnerModalContent = document.getElementById('partnerModalContent');
const partnerCards = document.querySelectorAll('.partner-card');
const partnerModalClose = document.querySelector('.partner-modal-close');

partnerCards.forEach(card => {
    card.addEventListener('click', () => {
        // Clone the card content
        const cardClone = card.cloneNode(true);
        partnerModalContent.innerHTML = '';
        partnerModalContent.appendChild(cardClone);

        partnerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

partnerModal.addEventListener('click', (e) => {
    if (e.target === partnerModal) {
        partnerModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

partnerModalContent.addEventListener('click', (e) => {
    e.stopPropagation();
});

partnerModalClose.addEventListener('click', (e) => {
    e.stopPropagation();
    partnerModal.classList.remove('active');
    document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && partnerModal.classList.contains('active')) {
        partnerModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
