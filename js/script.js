/**
 * PERSONAL PORTFOLIO - M N M BASITH
 * Modern, Responsive Vanilla JavaScript
 * Zero external libraries or frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Theme Switcher (Dark / Light Mode) with LocalStorage
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('basith-portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (!prefersDark) {
    htmlRoot.setAttribute('data-theme', 'light');
  } else {
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('basith-portfolio-theme', newTheme);
      
      // Accessibility announcement
      themeToggleBtn.setAttribute('aria-label', `Switch to ${newTheme === 'light' ? 'dark' : 'light'} mode`);
    });
  }

  /* ==========================================================================
     2. Sticky Header & Back to Top Button
     ========================================================================== */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header sticky styling
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     3. Mobile Navigation Drawer & Hamburger Menu
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  let backdrop = document.querySelector('.nav-menu-backdrop');

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-menu-backdrop';
    document.body.appendChild(backdrop);
  }

  const toggleMobileMenu = (open) => {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.add('open');
      hamburgerBtn.classList.add('active');
      backdrop.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      backdrop.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => toggleMobileMenu());
    backdrop.addEventListener('click', () => toggleMobileMenu(false));

    // Close on navigation link click
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  }

  /* ==========================================================================
     4. Active Navigation Link on Scroll (Scrollspy)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  /* ==========================================================================
     5. Typing Text Animation (Hero Section)
     ========================================================================== */
  const typedTextElement = document.getElementById('typed-text');
  const roles = [
    'Frontend Developer',
    'Web Designer',
    'WordPress Specialist',
    'UI/UX Enthusiast',
    'Tech Explorer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  const typeEffect = () => {
    if (!typedTextElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  };

  if (typedTextElement) {
    setTimeout(typeEffect, 600);
  }

  /* ==========================================================================
     6. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     7. Animated Skill Progress Bars
     ========================================================================== */
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let skillsAnimated = false;

  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percent') || '85%';
      bar.style.width = percentage;
    });
  };

  if (skillSection && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
          animateSkillBars();
          skillsAnimated = true;
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillSection);
  } else {
    animateSkillBars();
  }

  /* ==========================================================================
     8. Stats Number Counter Animation
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const countUpStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = Math.ceil(target / 45);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = `${target}${suffix}`;
          clearInterval(timer);
        } else {
          stat.textContent = `${current}${suffix}`;
        }
      }, 35);
    });
  };

  const aboutSection = document.getElementById('about');
  if (aboutSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          countUpStats();
          statsCounted = true;
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(aboutSection);
  } else {
    countUpStats();
  }

  /* ==========================================================================
     9. Interactive Project Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     10. Contact Form Real-time Validation & Feedback
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const subjectInput = document.getElementById('user-subject');
  const messageInput = document.getElementById('user-message');
  const charCounter = document.getElementById('char-count');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  // Live Character Counter for Message
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len}/500`;
      if (len > 500) {
        charCounter.style.color = '#ef4444';
      } else {
        charCounter.style.color = '';
      }
    });
  }

  // Helper validation functions
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim());
  };

  const setFieldError = (input, errorElementId, message) => {
    const errEl = document.getElementById(errorElementId);
    input.classList.remove('success');
    input.classList.add('error');
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
    return false;
  };

  const clearFieldError = (input, errorElementId) => {
    const errEl = document.getElementById(errorElementId);
    input.classList.remove('error');
    input.classList.add('success');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
    return true;
  };

  // Real-time blur listeners
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      if (nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'name-error', 'Please enter your full name (minimum 2 characters).');
      } else {
        clearFieldError(nameInput, 'name-error');
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (!validateEmail(emailInput.value)) {
        setFieldError(emailInput, 'email-error', 'Please enter a valid email address (e.g., name@domain.com).');
      } else {
        clearFieldError(emailInput, 'email-error');
      }
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('blur', () => {
      if (subjectInput.value.trim().length < 3) {
        setFieldError(subjectInput, 'subject-error', 'Please provide a subject line (minimum 3 characters).');
      } else {
        clearFieldError(subjectInput, 'subject-error');
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      if (messageInput.value.trim().length < 15) {
        setFieldError(messageInput, 'message-error', 'Please write a message with at least 15 characters.');
      } else {
        clearFieldError(messageInput, 'message-error');
      }
    });
  }

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate all fields
      if (nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'name-error', 'Please enter your full name (minimum 2 characters).');
        isValid = false;
      } else {
        clearFieldError(nameInput, 'name-error');
      }

      if (!validateEmail(emailInput.value)) {
        setFieldError(emailInput, 'email-error', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearFieldError(emailInput, 'email-error');
      }

      if (subjectInput.value.trim().length < 3) {
        setFieldError(subjectInput, 'subject-error', 'Please enter a subject line.');
        isValid = false;
      } else {
        clearFieldError(subjectInput, 'subject-error');
      }

      if (messageInput.value.trim().length < 15) {
        setFieldError(messageInput, 'message-error', 'Please write a message with at least 15 characters.');
        isValid = false;
      } else {
        clearFieldError(messageInput, 'message-error');
      }

      if (!isValid) {
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>Please correct the errors highlighted above before submitting.</span>
          `;
          formAlert.style.display = 'flex';
        }
        return;
      }

      // Valid state: Simulate sending with realistic feedback
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Validating & Sending...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <div>
              <strong>Thank you, ${escapeHTML(nameInput.value.trim())}!</strong>
              <p style="margin-top: 4px; font-size: 0.85rem;">Your message passed all validation checks. (Client-side demonstration: Connect Formspree or EmailJS to receive emails directly at <code>basithmnm37@gmail.com</code>).</p>
            </div>
          `;
          formAlert.style.display = 'flex';
        }

        // Reset inputs
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0/500';
        [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
          inp.classList.remove('success', 'error');
        });
      }, 1000);
    });
  }

  // HTML sanitizer helper
  function escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }

  /* ==========================================================================
     11. Dynamic Copyright Year
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     12. Interactive Canvas Ambient Particles
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.alpha = Math.random() * 0.5 + 0.15;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        const isLight = htmlRoot.getAttribute('data-theme') === 'light';
        ctx.fillStyle = isLight
          ? `rgba(2, 132, 199, ${this.alpha * 0.6})`
          : `rgba(0, 242, 254, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 20000), 75);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const isLight = htmlRoot.getAttribute('data-theme') === 'light';
            const strokeAlpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = isLight
              ? `rgba(37, 99, 235, ${strokeAlpha})`
              : `rgba(0, 242, 254, ${strokeAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();
  }
});
