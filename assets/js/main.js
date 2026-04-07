/* =============================================
   PORTFOLIO – main.js
   Delfin Marco Tumulak
   ============================================= */

/* ── PRELOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1600);
});

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower') || document.getElementById('cursor-follower');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  follower.style.left = e.clientX + 'px';
  follower.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('clicked'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicked'));

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
  toggleBackToTop();
});

/* ── ACTIVE NAV LINK ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ── MOBILE NAV ── */
function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
}
function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ── TYPED NAME EFFECT ── */
function typeWriter(element, text, speed = 100) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.classList.add('typed-cursor');
  cursor.textContent = '|';
  element.after(cursor);

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  // Wait for preloader to finish
  setTimeout(type, 1800);
}

const typedEl = document.querySelector('.typed-name');
if (typedEl) typeWriter(typedEl, 'Delfin Marco', 90);

/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '0,200,255' : '124,58,237';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,200,255,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', initParticles);

/* ── SCROLL FADE-IN ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.closest('.stat-card').querySelector('.label').textContent.includes('%') ? '+' : '+';
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current + suffix;
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.num[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) counterObserver.observe(statsSection);

/* ── BACK TO TOP ── */
const backToTopBtn = document.getElementById('backToTop');
function toggleBackToTop() {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const original = btn.innerHTML;

  // Loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Simulate sending
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  }, 1500);
}

/* ── TILT EFFECT ON CARDS ── */
document.querySelectorAll('.service-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── PROJECT FILTER ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
