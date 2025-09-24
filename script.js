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
    title: "ZomatoSmart – Intelligent Restaurant Recommendation Engine",
    description: "Built a hybrid recommendation system combining collaborative filtering, matrix factorization, clustering, and deep models, boosting CTR by 18% and conversions by 12%. Scaled preprocessing for 10M+ daily interactions with Pandas, NumPy, and SQL, while deploying Dockerized FastAPI microservices on AWS to handle 2M+ concurrent requests and cut time-to-order by 25%.",
    skills: ["Python", "PyTorch", "TensorFlow", "Pandas", "NumPy", "PostgreSQL", "XGBoost" , "KMeans", "FastAPI", "Docker", "AWS EC2"]
  },
  2: {
    title: "DeliveryOptima – Dynamic Delivery Time Prediction System",
    description: "Developed real-time ETA models using ARIMA, Prophet, LSTMs, and ensemble methods, improving accuracy by 32% (MAPE 25% → 17%). Integrated GPS, weather, and traffic signals through Kafka and Redis streams, enabling sub-second inference. Deployed with Docker, Flask, and MLflow pipelines to reduce late deliveries by 40% and raise CSAT by 0.8.",
    skills: ["Python", "ARIMA", "Prophet", "LSTM", "Random Forest", "XGBoost", "Apache Kafka", "Redis", "Flask", "Docker", "AWS", "MLflow"]
  },
  3: {
    title: "Exoplanet Detection using Kepler Data",
    description: "Trained a deep learning model on NASA’s Kepler dataset to identify potential exoplanets from light curve features. Engineered astrophysical signals like flux variation and orbital periodicity, and used SHAP to interpret model predictions.",
    skills: ["Machine Learning", "Deep Learning", "Feature Engineering", "SHAP", "Model Evaluation", "Python", "TensorFlow"]
  },
  4: {
    title: "MediRAG – AI-Powered Medical Query Assistant",
    description: "Designed a Retrieval-Augmented Generation pipeline with LangChain + FAISS, improving clinical query accuracy by 35%. Fine-tuned BioBERT/GPT on 20K+ notes, applied NER for structured symptom extraction, and integrated PubMed APIs. Delivered a Streamlit prototype with <1.2s latency, reducing clinician lookup time by 40%.",
    skills: ["Python", "LangChain", "FAISS", "Hugging Face", "Transformers", "BioBERT", "Prompt Engineering", "NER", "Streamlit", "PubMed API"]
  },
  5: {
    title: "FinGuard – AI-Powered Fraud & Risk Detection Platform",
    description: "Built ensemble fraud detection models combining statistical and ML approaches, raising fraud recall to 94% while reducing false positives by 21%. Leveraged graph features to identify fraud rings and deployed SQL + Kafka pipelines for real-time monitoring at scale. Delivered dashboards to streamline audits, cutting prep time by 35%.",
    skills: ["Python", "scikit-learn", "Logistic Regression", "Random Forest", "XGBoost", "KNN", "Graph Analytics", "SQL", "Apache Kafka", "Git", "GitHub"]
  },
  6: {
    title: "ThreatLens – AI-Powered Cyber Threat Intelligence Platform",
    description: "Processed 50M+ daily security logs with Spark ETL pipelines, cutting detection latency to <5 seconds. Trained classifiers and applied NLP for phishing detection and YOLO-based CV for malicious site analysis, achieving 96% accuracy. Deployed on AWS with Kubernetes and integrated MLOps tools to reduce MTTD by 38%.",
    skills: ["Python", "Apache Spark", "scikit-learn", "Logistic Regression", "Decision Trees", "KNN", "NLP", "Sentiment Analysis", "YOLO", "CNN", "Docker", "Kubernetes", "DVC", "Weights & Biases"]
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

