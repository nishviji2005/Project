/* =========================================================
   NISH BAKES — script.js
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- Active nav link based on current page ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Gallery filter (gallery.html) ---------- */
  const filterPills = document.querySelectorAll('.filter-pill');
  const galleryItems = document.querySelectorAll('.g-item');
  if (filterPills.length && galleryItems.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.filter;
        galleryItems.forEach(item => {
          const match = cat === 'all' || item.dataset.category === cat;
          item.style.display = match ? 'flex' : 'none';
        });
      });
    });
  }

  /* ---------- Lightbox (gallery.html) ---------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxEmoji = lightbox.querySelector('.big-emoji');
    const lightboxTitle = lightbox.querySelector('.lb-title');
    const lightboxDesc = lightbox.querySelector('.lb-desc');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        lightboxEmoji.textContent = item.textContent.trim();
        lightboxTitle.textContent = item.dataset.label || 'Nish Bakes Creation';
        lightboxDesc.textContent = item.dataset.desc || 'A little slice of joy, baked fresh in our kitchen.';
        lightbox.classList.add('open');
      });
    });
    const closeLightbox = () => lightbox.classList.remove('open');
    closeBtn?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ---------- Contact form validation (contact.html) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formStatus = document.getElementById('formStatus');

    const showError = (fieldId, message) => {
      const note = document.querySelector(`[data-note-for="${fieldId}"]`);
      if (note) { note.textContent = message; note.classList.add('error'); }
    };
    const clearError = (fieldId) => {
      const note = document.querySelector(`[data-note-for="${fieldId}"]`);
      if (note) { note.textContent = ''; note.classList.remove('error'); }
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!name.value.trim()) { showError('name', 'Please tell us your name.'); valid = false; }
      else clearError('name');

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) { showError('email', 'Please enter a valid email.'); valid = false; }
      else clearError('email');

      if (!message.value.trim() || message.value.trim().length < 10) {
        showError('message', 'Message should be at least 10 characters.');
        valid = false;
      } else clearError('message');

      if (!valid) {
        formStatus.classList.remove('show');
        return;
      }

      formStatus.textContent = `Thank you, ${name.value.trim().split(' ')[0]}! Your message has been received — we'll reply within 24 hours. 🩷`;
      formStatus.classList.add('show');
      contactForm.reset();
    });
  }

  /* ---------- Order button smooth-scroll / redirect helper ---------- */
  document.querySelectorAll('[data-order-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = 'contact.html#order-form';
    });
  });

});