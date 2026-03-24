/* ============================================
   AYUSH YADAV — ML ENGINEER PORTFOLIO
   script.js
   ============================================ */

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── SCROLL-TRIGGERED FADE-IN ── */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.dataset.delay = i % 5;
  fadeObserver.observe(el);
});

/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--accent)';
    }
  });
});

/* ── NAVBAR SHADOW ON SCROLL ── */
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

/* ── CERTIFICATE LIGHTBOX ── */
function openLightbox(imgSrc, title, issuer, date) {
  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightbox-img');
  const titleEl  = document.getElementById('lightbox-title');
  const issuerEl = document.getElementById('lightbox-issuer');
  const dateEl   = document.getElementById('lightbox-date');

  img.src         = imgSrc;
  img.alt         = title;
  titleEl.innerHTML  = title;
  issuerEl.textContent = issuer;
  dateEl.textContent   = date;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  // Close only if clicking backdrop or close button (not the image itself)
  if (event && event.target.id === 'lightbox-img') return;

  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';

  // Clear image after animation
  setTimeout(() => {
    document.getElementById('lightbox-img').src = '';
  }, 300);
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});