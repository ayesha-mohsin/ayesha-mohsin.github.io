document.addEventListener('DOMContentLoaded', () => {
  // =========================
  //    TYPEWRITER EFFECT
  // =========================
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

  typeWriterLoop();

  // =========================
  //    SMOOTH SCROLL
  // =========================
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
      // Close mobile nav menu logic
      const navList = document.querySelector('.nav-links ul');
      const menuToggle = document.getElementById('menu-toggle');
      navList?.classList.remove('show');
      document.body.classList.remove('no-scroll');
      menuToggle?.classList.remove('open');
      // Let browser scroll to anchor natively with scroll-padding
    });
  });

  // =========================
  //    PROJECT MODAL
  // =========================
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalSkills = document.getElementById('modal-skills');
  const closeButton = document.querySelector('.close-button');

const projectDetails = {
  1: {
    title: "LLM Prompt Bias Evaluator (Responsible AI)",
    description: "Designed a bias-auditing tool to evaluate how LLMs respond to sensitive hiring and identity-based prompts. Used a RAG pipeline with LangChain, OpenAI, and FAISS to simulate realistic recruiting interactions and flag biased completions. Outputs were scored for fairness and visualized using heatmaps and demographic comparisons.",
    skills: ["LLMs", "Prompt Engineering", "LangChain", "RAG", "FAISS", "OpenAI API", "Transformers", "Python", "AI Fairness"]
  },
  2: {
    title: "Job Description Bias Analyzer Dashboard (Responsible AI / DEI Analytics)",
    description: "Built a dashboard to analyze exclusionary language in 1,000+ scraped job listings across industries. Used NLP to flag gender-coded terms, inflated requirements, and tone bias. Designed a Power BI dashboard with filters for industry, role level, and DEI KPIs to support inclusive hiring audits.",
    skills: ["Web Scraping", "Text Mining", "SQL", "Tableau / Power BI", "KPI Reporting", "Python", "DEI Analytics"]
  },
  3: {
    title: "Exoplanet Detection using Kepler Data",
    description: "Trained a deep learning model on NASA’s Kepler dataset to identify potential exoplanets from light curve features. Engineered astrophysical signals like flux variation and orbital periodicity, and used SHAP to interpret model predictions.",
    skills: ["Machine Learning", "Deep Learning", "Feature Engineering", "SHAP", "Model Evaluation", "Python", "TensorFlow"]
  },
  4: {
    title: "Climate Trends Forecasting with Berkeley Earth",
    description: "Forecasted global temperature anomalies using official Berkeley Earth data. Applied ARIMA and Prophet to decades of climate records, then visualized trend projections and regional risk zones via an interactive Tableau dashboard.",
    skills: ["Time Series Forecasting", "Statistical Modeling", "Data Visualization", "Tableau", "Python", "ETL Simulation"]
  },
  5: {
    title: "Symptom Checker Chatbot with PubMed (Healthcare NLP)",
    description: "Created a chatbot that retrieves evidence-based medical answers using real-time PubMed abstracts. Built a RAG pipeline with HuggingFace embeddings and LangChain to match symptom queries with relevant literature and return safe, clear LLM-generated responses.",
    skills: ["NLP", "RAG", "LangChain", "Transformers", "OpenAI API", "PubMed API", "Python", "Model Evaluation"]
  },
  6: {
    title: "Smart Energy Recommender (Sustainability)",
    description: "Built a recommender system that suggests energy-saving actions based on personal usage logs and live weather conditions. Integrated OpenWeatherMap API into ML pipelines to generate personalized insights and visualize them through optional dashboards.",
    skills: ["ML Pipelines", "Recommender Systems", "API Integration", "Feature Engineering", "Python", "Cloud Readiness"]
  }
};

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      const data = projectDetails[id];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalSkills.innerHTML = data.skills.map(skill => `<span>${skill}</span>`).join('');
      modal.style.display = 'block';
      document.body.classList.add('no-scroll');
    });
  });

  closeButton?.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  });

  // =========================
  //     STARFIELD BACKGROUND
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
  //   PROJECT CARD ENTRY
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
});
