
// Scroll Reveal Animation & Interactivity
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  const progressBar = document.getElementById('progressBar');
  const nav = document.getElementById('nav');

  // INTERSECTION OBSERVER FOR REVEAL
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger Stats Counter if the element is a stat card
        if (entry.target.classList.contains('stat-card')) {
          const numberEl = entry.target.querySelector('.stat-number');
          if (numberEl && !numberEl.classList.contains('counted')) {
            animateValue(numberEl, 0, parseInt(numberEl.dataset.target), 2000);
            numberEl.classList.add('counted');
          }
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // STATS COUNTER ANIMATION
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      let current = Math.floor(easeProgress * (end - start) + start);

      // Construct formatted string
      if (end >= 10000) {
        obj.innerHTML = current.toLocaleString() + "+";
      } else if (end === 3) {
        obj.innerHTML = current + "X";
      } else if (end === 500) {
        obj.innerHTML = current + "+";
      } else {
        obj.innerHTML = current;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // PROGRESS BAR & NAV SCROLL
  window.addEventListener('scroll', () => {
    // Nav Class
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Progress Bar Width
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.height = scrolled + "%";
    }
  });

  // SMOOTH SCROLL FOR ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
