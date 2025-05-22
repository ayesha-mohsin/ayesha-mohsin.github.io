// =========================
//        script.js
// =========================

// ===== TYPEWRITER EFFECT ===== //
const targetText = "< AYESHA MOHSIN / >";
const textEl = document.querySelector('.text-content');
const cursorEl = document.querySelector('.cursor');

function typeWriterLoop() {
  let i = 0;
  const typingSpeed = 150;
  const deletingSpeed = 80;
  const pauseAfterTyping = 2500;
  const pauseBeforeTyping = 1200;

  function typeChar() {
    if (!textEl || !cursorEl) return;
    textEl.textContent = targetText.slice(0, i);
    cursorEl.style.opacity = '1';

    if (i < targetText.length) {
      i++;
      setTimeout(typeChar, typingSpeed);
    } else {
      setTimeout(deleteChar, pauseAfterTyping);
    }
  }

  function deleteChar() {
    if (!textEl || !cursorEl) return;
    textEl.textContent = targetText.slice(0, i);
    cursorEl.style.opacity = '1';

    if (i > 0) {
      i--;
      setTimeout(deleteChar, deletingSpeed);
    } else {
      setTimeout(typeChar, pauseBeforeTyping);
    }
  }

  typeChar();
}

document.addEventListener("DOMContentLoaded", typeWriterLoop);

// =========================
//    SMOOTH SCROLL
// =========================
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile nav
    const navList = document.querySelector('.nav-links ul');
    const menuToggle = document.getElementById('menu-toggle');
    navList?.classList.remove('show');
    document.body.classList.remove('no-scroll');
    menuToggle?.classList.remove('open');
  });
});

// =========================
//    PROJECT MODAL
// =========================
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalSkills = document.getElementById('modal-skills');

// Modal Close Button Event
const closeButton = document.querySelector('.close-button');
if (closeButton) {
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

// Close modal if user clicks outside modal content
window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Close modal on Escape key
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
});

// Project Data
const projectDetails = {
  1: {
    title: "LLM Prompt Bias Evaluator (Responsible AI)",
    description: "Designed a bias-auditing tool...",
    skills: ["LLMs", "Prompt Engineering", "LangChain", "RAG", "FAISS"]
  },
  2: {
    title: "Job Description Bias Analyzer Dashboard",
    description: "Built a dashboard to analyze...",
    skills: ["Web Scraping", "NLP", "Power BI"]
  },
  3: {
    title: "Exoplanet Detection using Kepler Data",
    description: "Trained a deep learning model...",
    skills: ["Deep Learning", "TensorFlow", "SHAP"]
  },
  4: {
    title: "Climate Trends Forecasting",
    description: "Forecasted temperature anomalies...",
    skills: ["Time Series", "Prophet", "Tableau"]
  },
  5: {
    title: "Symptom Checker Chatbot with PubMed",
    description: "Created a chatbot that retrieves...",
    skills: ["RAG", "LangChain", "PubMed API"]
  },
  6: {
    title: "Smart Energy Recommender",
    description: "Built a recommender system...",
    skills: ["ML Pipelines", "API Integration"]
  }
};

// Show modal with data
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-project');
    const data = projectDetails[id];

    if (data) {
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalSkills.innerHTML = data.skills.map(skill => `<span>${skill}</span>`).join('');
      modal.style.display = 'block';
    }
  });
});

// =========================
//     STARFIELD PARTICLES
// =========================
const canvas = document.getElementById('starfield');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const starCount = 200;
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.8,
      speed: Math.random() * 0.4 + 0.1
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 5);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(0, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      star.y += star.speed;
      if (star.y > canvas.height) star.y = 0;
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  initStars();
  drawStars();
}

// =========================
//   SLIDE-IN ANIMATIONS
// =========================
function slideInOnView(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  function handleScroll() {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('animate');
    } else {
      el.classList.remove('animate');
    }
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);
}

slideInOnView('.about-card');
slideInOnView('.research-card');
slideInOnView('.contact-card');

// Animate project cards
const projectCards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('animate'), index * 150);
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(card => observer.observe(card));

// =========================
//   HAMBURGER MENU TOGGLE
// =========================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navList = navLinks?.querySelector('ul');

menuToggle?.addEventListener('click', () => {
  const isOpen = navList?.classList.contains('show');
  navList?.classList.toggle('show');
  document.body.classList.toggle('no-scroll');
  menuToggle.classList.toggle('open');

  if (!isOpen) {
    window.scrollTo({ top: 0 });
  }
});

