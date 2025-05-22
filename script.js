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
//      SMOOTH SCROLL
// =========================
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offset = 100; // Adjust based on your navbar height
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });

    // Close mobile nav if open
    const navList = document.querySelector('.nav-links ul');
    const menuToggle = document.getElementById('menu-toggle');
    navList?.classList.remove('show');
    document.body.classList.remove('no-scroll');
    menuToggle?.classList.remove('open');
  });
});

// =========================
//        MODAL LOGIC
// =========================
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalSkills = document.getElementById('modal-skills');
const closeButton = document.querySelector('.close-button');

const projectDetails = {
  1: {
    title: "LLM Prompt Bias Evaluator (Responsible AI)",
    description: "Designed a bias-auditing tool...",
    skills: ["LLMs", "Prompt Engineering", "LangChain", "RAG", "FAISS", "OpenAI API", "Transformers", "Python", "AI Fairness"]
  },
  2: {
    title: "Job Description Bias Analyzer Dashboard",
    description: "Built a dashboard to analyze exclusionary language...",
    skills: ["Web Scraping", "Text Mining", "SQL", "Power BI", "Python", "DEI Analytics"]
  },
  3: {
    title: "Exoplanet Detection using Kepler Data",
    description: "Trained a deep learning model on NASA’s Kepler dataset...",
    skills: ["Machine Learning", "TensorFlow", "Feature Engineering"]
  },
  4: {
    title: "Climate Trends Forecasting with Berkeley Earth",
    description: "Forecasted global temperature anomalies...",
    skills: ["Time Series", "ARIMA", "Prophet", "Tableau", "Python"]
  },
  5: {
    title: "Symptom Checker Chatbot with PubMed",
    description: "Created a chatbot that retrieves evidence-based answers...",
    skills: ["NLP", "RAG", "Transformers", "OpenAI API"]
  },
  6: {
    title: "Smart Energy Recommender",
    description: "Built a recommender system for energy-saving actions...",
    skills: ["ML Pipelines", "Weather API", "Python"]
  }
};

// Show modal when project clicked
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-project');
    const project = projectDetails[id];
    if (project) {
      modalTitle.textContent = project.title;
      modalDescription.textContent = project.description;
      modalSkills.innerHTML = project.skills.map(skill => `<span>${skill}</span>`).join('');
      modal.style.display = 'block';
    }
  });
});

// Close modal events
closeButton?.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.style.display === 'block') modal.style.display = 'none';
});

// =========================
//     STARFIELD CANVAS
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
      const glow = star.radius * 5;
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glow);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(0,255,255,0.8)');
      gradient.addColorStop(1, 'rgba(0,255,255,0)');
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  initStars();
  drawStars();
}

// =========================
//   SLIDE-IN SECTIONS
// =========================
function slideInOnView(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  function onScroll() {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('animate');
    } else {
      el.classList.remove('animate');
    }
  }
  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);
}
slideInOnView('.about-card');
slideInOnView('.research-card');
slideInOnView('.contact-card');

// =========================
//     PROJECT CARD ENTRY
// =========================
const projectCards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('animate'), i * 150);
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(card => observer.observe(card));

// =========================
//     HAMBURGER MENU
// =========================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navList = navLinks?.querySelector('ul');

menuToggle?.addEventListener('click', () => {
  const open = navList?.classList.contains('show');
  navList?.classList.toggle('show');
  document.body.classList.toggle('no-scroll');
  menuToggle.classList.toggle('open');
  if (!open) {
    window.scrollTo({ top: 0 });
  }
});


