// Initialize Bootstrap Carousel
// Only run hero carousel code if the element exists
const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
    const carouselInner = heroCarousel.querySelector('.carousel-inner');
    
    // Add carousel items
    const carouselItems = [
        {
            desktopImage: '/images/banner-slider/desktop/1.jpeg',
            mobileImage: '/images/banner-slider/mob/1.jpeg'
        },
        {
            desktopImage: '/images/banner-slider/desktop/2.jpeg',
            mobileImage: '/images/banner-slider/mob/2.jpeg'
        },
        {
            desktopImage: '/images/banner-slider/desktop/3.jpeg',
            mobileImage: '/images/banner-slider/mob/3.jpeg'
        }
    ];

    carouselItems.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <div class="carousel-image" style="cursor:pointer;">
                <img src="${item.desktopImage}" class="d-none d-md-block w-100" alt="Desktop Hero Image">
                <img src="${item.mobileImage}" class="d-md-none w-100 h-100 object-fit-cover" alt="Mobile Hero Image">
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    });

    // Add click event to redirect to contact page when banner is clicked
    // Attach to all .carousel-image elements inside the carousel
    carouselInner.querySelectorAll('.carousel-image').forEach(imageDiv => {
        imageDiv.addEventListener('click', function() {
            window.location.href = 'contact.html';
        });
    });

    // Initialize carousel
    new bootstrap.Carousel(heroCarousel, {
        interval: 5000,
        wrap: true
    });
}

// Services Data
const services = [
    {
        title: 'Russian Massage',
        duration: '60 Min',
        price: '₹ 2,000',
        tags: ['Muscle Relief', 'Performance Enhancing'],
        description: 'If you\'re looking for a massage that combines intensity with deep relaxation, our Russian Massage might be exactly what you need...',
        image: '/images/services/russian-massage.jpeg',
        page: 'russian-massage.html'
    },
    {
        title: 'Lymphatic Drainage Massage',
        duration: '60 Min',
        price: '₹ 2,000',
        tags: ['Detoxification', 'Therapeutic'],
        description: 'Feeling bloated, sluggish, or low on energy? A Lymphatic Drainage Massage might be just what your body is craving...',
        image: '/images/services/lymphatic-drainage.png',
        page: 'lymphatic-drainage.html'
    },
    {
        title: 'Deep Tissue Massage',
        duration: '90 Min',
        price: '₹ 3,000',
        tags: ['Restorative', 'Pain Relief'],
        description: 'Struggling with persistent muscle aches or stiffness? Discover how our Deep Tissue Massage can bring lasting relief and deep relaxation...',
        image: '/images/services/deep-tissue-massage.webp',
        page: 'deep-tissue-massage.html'
    },
    {
        title: 'Thai Massage',
        duration: '60 Min',
        price: '₹ 2,000',
        tags: ['Energy Flow', 'Enhanced Flexibility'],
        description: 'Looking to feel more flexible, energized, and centered? Discover the ancient healing powers of our authentic Thai Massage experience...',
        image: '/images/services/thai-massage.jpg',
        page: 'thai-massage.html'
    },
    {
        title: 'Shiatsu Massage',
        duration: '75 Min',
        price: '₹ 2,500',
        tags: ['Emotional Well-being', 'Recharge'],
        description: 'Craving a healing massage that aligns body and mind? Discover the powerful benefits of our authentic Shiatsu Massage therapy...',
        image: '/images/services/shiatsu-massage.jpg',
        page: 'shiatsu-massage.html'
    },
    {
        title: 'Aromatherapy Massage',
        duration: '60 Min',
        price: '₹ 2,000',
        tags: ['Body Nourishment', 'Stress Relief'],
        description: 'Need a calming escape for your senses and soul? Let our Aromatherapy Massage take you on a fragrant journey of relaxation...',
        image: '/images/services/aromatherapy-massage.webp',
        page: 'aromatherapy-massage.html'
    }
];

const servicesContainer = document.querySelector('.services-slider');
if (servicesContainer) {
    let currentPage = 0;
    function getCardsPerView() {
        return window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    }
    function getTotalPages() {
        return Math.ceil(services.length / getCardsPerView());
    }
    function renderServicesPage(page) {
        const cardsPerView = getCardsPerView();
        const start = page * cardsPerView;
        const end = start + cardsPerView;
        const visibleServices = services.slice(start, end);
        let html = '<div class="services-wrapper">';
        visibleServices.forEach(service => {
            html += `
                <div class="service-card">
                    <img src="${service.image}" alt="${service.title}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${service.title}</h5>
                        <p class="duration">${service.duration}</p>
                        <p class="price">Starting from ${service.price}</p>
                        <div class="tags">
                            ${service.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                        </div>
                        <p class="card-text">${service.description}</p>
                        <button class="btn btn-primary w-100 learn-more-btn" data-page="${service.page}">Learn more</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        servicesContainer.innerHTML = html;

        // Add event listeners for "Learn more" buttons
        servicesContainer.querySelectorAll('.learn-more-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const page = btn.getAttribute('data-page');
                if (page) {
                    window.location.href = page;
                }
            });
        });
    }
    function renderServicesDots() {
        let dotsHtml = '<div class="scroll-indicators">';
        const totalPages = getTotalPages();
        for (let i = 0; i < totalPages; i++) {
            dotsHtml += `<button class="scroll-dot${i === currentPage ? ' active' : ''}" data-page="${i}"></button>`;
        }
        dotsHtml += '</div>';
        servicesContainer.parentElement.querySelectorAll('.scroll-indicators').forEach(e => e.remove());
        servicesContainer.parentElement.appendChild(document.createRange().createContextualFragment(dotsHtml));
        // Add event listeners
        servicesContainer.parentElement.querySelectorAll('.scroll-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                currentPage = parseInt(dot.getAttribute('data-page'));
                renderServicesPage(currentPage);
                renderServicesDots();
            });
        });
    }
    function renderServicesSlider() {
        renderServicesPage(currentPage);
        renderServicesDots();
    }
    renderServicesSlider();
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    servicesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    servicesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        const totalPages = getTotalPages();
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPage < totalPages - 1) {
                currentPage++;
                renderServicesSlider();
            } else if (diff < 0 && currentPage > 0) {
                currentPage--;
                renderServicesSlider();
            }
        }
    }
    // Update on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reset to first page if current page is out of range
            const totalPages = getTotalPages();
            if (currentPage > totalPages - 1) currentPage = totalPages - 1;
            if (currentPage < 0) currentPage = 0;
            renderServicesSlider();
        }, 250);
    });
}

// FAQ Data
const faqs = [
    {
        question: 'What types of massages do you offer?',
        answer: 'We offer a wide range of therapies including Deep Tissue, Aromatherapy, Thai, Shiatsu, Lymphatic Drainage, and Russian Massage—all tailored to your individual needs.'
    },
    {
        question: 'Do I need to book an appointment in advance?',
        answer: 'While walk-ins are welcome, we recommend booking in advance to ensure your preferred time and therapist are available.'
    },
    {
        question: 'Are your therapists certified?',
        answer: 'Yes, all our therapists are internationally trained and certified, ensuring safe, professional, and effective treatments every time.'
    },
    {
        question: 'Do you have private facilities like showers and steam rooms?',
        answer: 'Absolutely. Each of our treatment suites includes a private steam and shower facility for your comfort and convenience.'
    },
    {
        question: 'What products do you use during treatments?',
        answer: 'We use only premium-grade, skin-safe, and ethically sourced products, including essential oils and herbal blends curated for holistic wellness.'
    }
];

// Render FAQs
const faqContainer = document.getElementById('faqAccordion');
if (faqContainer) {
    faqs.forEach((faq, index) => {
        const faqItem = `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
                        ${faq.question}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        ${faq.answer}
                    </div>
                </div>
            </div>
        `;
        faqContainer.innerHTML += faqItem;
    });
}

// Smooth Scroll for Navigation Links
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

// Add scroll event listener for header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Testimonial Slider Logic
const testimonials = [
    {
        name: 'Priya S.',
        subtitle: 'Eternal Touch Spa, Candolim',
        text: '“Absolutely the best spa experience I\'ve ever had. The ambiance is serene and the therapists are true professionals!”'
    },
    {
        name: 'Rahul M.',
        subtitle: 'Eternal Touch Spa, Candolim',
        text: '“The deep tissue massage was incredible. I left feeling completely rejuvenated. Highly recommend Eternal Touch!”'
    },
    {
        name: 'Sneha K.',
        subtitle: 'Eternal Touch Spa, Candolim',
        text: '“Impeccable hygiene and a truly relaxing environment. The aromatherapy session was just what I needed.”'
    }
];

let testimonialIndex = 0;
const testimonialSlide = document.querySelector('.testimonial-slide');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');

function renderTestimonial(idx) {
    const t = testimonials[idx];
    testimonialSlide.innerHTML = `
        <div class="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
            <div>
                <div style="font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--primary-color);font-weight:600;">${t.name}</div>
                <div style="font-size:1rem;color:#888;">${t.subtitle}</div>
                <div class="testimonial-text mt-3 mb-2">${t.text}</div>
            </div>
        </div>
    `;
}

if (testimonialSlide && testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener('click', function() {
        testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(testimonialIndex);
    });
    testimonialNext.addEventListener('click', function() {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        renderTestimonial(testimonialIndex);
    });
    renderTestimonial(testimonialIndex);
}

// Auto-scroll for gallery-slider (seamless infinite) + manual arrows
function autoScrollGallery() {
    const gallery = document.querySelector('.gallery-slider.auto-scroll');
    if (!gallery) return;
    // Duplicate gallery content for seamless scroll
    if (!gallery.dataset.duplicated) {
        gallery.innerHTML += gallery.innerHTML;
        gallery.dataset.duplicated = 'true';
    }
    let scrollAmount = 1;
    let isHovered = false;
    function scrollStep() {
        if (!isHovered) {
            // If we've scrolled past the original content, reset to start
            if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
                gallery.scrollLeft = 0;
            } else {
                gallery.scrollLeft += scrollAmount;
            }
        }
        requestAnimationFrame(scrollStep);
    }
    gallery.addEventListener('mouseenter', () => { isHovered = true; });
    gallery.addEventListener('mouseleave', () => { isHovered = false; });
    // Manual arrow scroll
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            gallery.scrollLeft -= gallery.offsetWidth * 0.7;
        });
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            gallery.scrollLeft += gallery.offsetWidth * 0.7;
        });
    }
    scrollStep();
}

// Initialize gallery immediately
autoScrollGallery();

// Gallery blocker logic for arrow buttons
const blocker = document.querySelector('.gallery-blocker');
const prevBtn = document.getElementById('galleryPrev');
const nextBtn = document.getElementById('galleryNext');
if (blocker && prevBtn && nextBtn) {
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => blocker.style.pointerEvents = 'none');
        btn.addEventListener('mouseleave', () => blocker.style.pointerEvents = 'all');
    });
}

// Navbar toggler icon swap
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarNav');
const burgerIcon = navbarToggler ? navbarToggler.querySelector('.navbar-toggler-icon') : null;
const closeIcon = navbarToggler ? navbarToggler.querySelector('.close-icon') : null;

function updateTogglerIcon() {
    if (!navbarCollapse) return;
    const isOpen = navbarCollapse.classList.contains('show');
    if (burgerIcon && closeIcon) {
        if (isOpen) {
            burgerIcon.classList.add('d-none');
            closeIcon.classList.remove('d-none');
        } else {
            burgerIcon.classList.remove('d-none');
            closeIcon.classList.add('d-none');
        }
    }
}

if (navbarToggler && navbarCollapse && burgerIcon && closeIcon) {
    navbarCollapse.addEventListener('shown.bs.collapse', updateTogglerIcon);
    navbarCollapse.addEventListener('hidden.bs.collapse', updateTogglerIcon);
    navbarCollapse.removeEventListener('show.bs.collapse', updateTogglerIcon);
    navbarCollapse.removeEventListener('hide.bs.collapse', updateTogglerIcon);
    updateTogglerIcon();
}

// Collapsible preheader logic
const preheader = document.getElementById('preheader');
const closeBtn = document.querySelector('.preheader-close');
if (preheader && closeBtn) {
    closeBtn.addEventListener('click', function() {
        preheader.classList.add('collapsed');
    });
}

// Therapists Slider Logic
const therapistsSlider = document.querySelector('.therapists-slider');
const therapistsPrev = document.getElementById('therapistsPrev');
const therapistsNext = document.getElementById('therapistsNext');

function getTherapistsScrollAmount() {
    return window.innerWidth >= 992 ? 3 : 1;
}
function getTherapistItemWidth() {
    const item = therapistsSlider ? therapistsSlider.querySelector('.therapist-item') : null;
    if (!item) return 300;
    const style = window.getComputedStyle(item);
    const width = item.offsetWidth;
    const marginRight = parseInt(style.marginRight) || 32;
    return width + marginRight;
}

function scrollTherapists(direction) {
    const scrollAmount = getTherapistsScrollAmount();
    const itemWidth = getTherapistItemWidth();
    const scrollByValue = itemWidth * scrollAmount * direction;
    therapistsSlider.scrollBy({
        left: scrollByValue,
        behavior: 'smooth'
    });
}

if (therapistsSlider && therapistsPrev && therapistsNext) {
    therapistsPrev.addEventListener('click', function() {
        scrollTherapists(-1);
    });
    therapistsNext.addEventListener('click', function() {
        scrollTherapists(1);
    });
    // Update scroll logic on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // No-op, but ensures scroll logic uses updated item width/amount
        }, 200);
    });
}

// Gallery Slider Logic for landing.html
const gallerySlider = document.querySelector('.gallery-slider');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');

if (gallerySlider && galleryPrev && galleryNext) {
    function getGalleryScrollAmount() {
        // Each item is 300px wide + 16px gap (approx)
        return window.innerWidth >= 992 ? 3 : 1;
    }
    function getGalleryItemWidth() {
        const item = gallerySlider.querySelector('.gallery-item');
        if (!item) return 300;
        const style = window.getComputedStyle(item);
        const width = item.offsetWidth;
        const marginRight = parseInt(style.marginRight) || 16;
        return width + marginRight;
    }
    galleryPrev.addEventListener('click', function() {
        const scrollAmount = getGalleryScrollAmount();
        const itemWidth = getGalleryItemWidth();
        const currentScroll = gallerySlider.scrollLeft;
        const newScroll = Math.max(0, currentScroll - (itemWidth * scrollAmount));
        gallerySlider.scrollTo({
            left: newScroll,
            behavior: 'smooth'
        });
    });
    galleryNext.addEventListener('click', function() {
        const scrollAmount = getGalleryScrollAmount();
        const itemWidth = getGalleryItemWidth();
        const currentScroll = gallerySlider.scrollLeft;
        const maxScroll = gallerySlider.scrollWidth - gallerySlider.clientWidth;
        const newScroll = Math.min(maxScroll, currentScroll + (itemWidth * scrollAmount));
        gallerySlider.scrollTo({
            left: newScroll,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
  // Landing Hero Slider Logic
  const landingHeroSlider = document.getElementById('landingHeroSlider');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');

  if (landingHeroSlider && heroPrev && heroNext) {
      const slides = landingHeroSlider.querySelectorAll('.hero-slide-img');
      console.log('Landing hero slider found:', slides.length, 'slides');
      let current = 0;
      
      // Hide all except the first
      slides.forEach((img, i) => img.style.display = i === 0 ? '' : 'none');
      
      function showSlide(index) {
          slides[current].style.display = 'none';
          current = index;
          slides[current].style.display = '';
          console.log('Switched to slide', current);
      }
      
      function nextSlide() {
          const next = (current + 1) % slides.length;
          showSlide(next);
      }
      
      function prevSlide() {
          const prev = (current - 1 + slides.length) % slides.length;
          showSlide(prev);
      }
      
      // Event listeners for manual navigation
      heroNext.addEventListener('click', nextSlide);
      heroPrev.addEventListener('click', prevSlide);
      
      // Optional: Add keyboard navigation
      document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') {
              prevSlide();
          } else if (e.key === 'ArrowRight') {
              nextSlide();
          }
      });
  } else {
      console.log('Landing hero slider or navigation buttons NOT found');
  }
});

// Testimonials Auto-Scroll Logic for landing.html
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    const testimonialSlides = testimonialSlider.querySelectorAll('.testimonial-slide');
    let currentTestimonial = 0;
    
    // Hide all testimonials except the first
    testimonialSlides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
    });
    
    // Auto-scroll testimonials
    setInterval(() => {
        testimonialSlides[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        testimonialSlides[currentTestimonial].style.display = 'block';
        console.log('Switched to testimonial', currentTestimonial + 1);
    }, 4000);
} 