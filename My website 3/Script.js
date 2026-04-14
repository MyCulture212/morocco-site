// ─── LOADER ───
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader')?.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1800);
});
document.body.style.overflow = 'hidden';

// ─── CUSTOM CURSOR ───
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring) {
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .highlight-card, .festival-card, .ticket-card, .review-card, .social-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

// ─── NAVIGATION ───
const navLinks = document.querySelectorAll('.nav-links a[data-page]');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active', 'page-enter');
    setTimeout(() => page.classList.remove('page-enter'), 500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  navLinks.forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
  // Close mobile menu
  navMenu?.classList.remove('open');
  hamburger?.classList.remove('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// Cross-page buttons
document.addEventListener('click', e => {
  const el = e.target.closest('[data-goto]');
  if (el) {
    e.preventDefault();
    showPage(el.dataset.goto);
  }
});

// Hamburger
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu?.classList.toggle('open');
});

// Navbar scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
initReveal();

// Re-observe after page switch
const observer = new MutationObserver(() => initReveal());
observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

// ─── TICKET BUY BUTTON ───
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-buy');
  if (btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Added to cart!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 2500);
  }
});

// ─── CONTACT FORM ───
document.addEventListener('submit', e => {
  if (e.target.classList.contains('contact-form')) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Message sent! شكراً';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    e.target.reset();
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }
});

// ─── COUNTER ANIMATION ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ─── STAR RATING HOVER ───
document.querySelectorAll('.stars-interactive').forEach(container => {
  const stars = container.querySelectorAll('.star');
  stars.forEach((star, i) => {
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, j) => s.classList.toggle('active', j <= i));
    });
    star.addEventListener('click', () => {
      container.dataset.rating = i + 1;
    });
  });
  container.addEventListener('mouseleave', () => {
    const rating = parseInt(container.dataset.rating || 0);
    stars.forEach((s, j) => s.classList.toggle('active', j < rating));
  });
});

// ─── INIT ───
showPage('home');