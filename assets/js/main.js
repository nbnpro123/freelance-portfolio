document.addEventListener('DOMContentLoaded', () => {

  // Dynamic year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Close mobile menu on nav click
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const menuToggle = document.querySelector('.navbar-toggler');
  const menuCollapse = document.getElementById('navMenu');
  const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse) || new bootstrap.Collapse(menuCollapse, { toggle: false });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });

  // Scroll animations
  const animateElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // Count-up animation for stat numbers
  const statNumbers = document.querySelectorAll('.stat-card .stat-number');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();

        if (text.includes('+') || text.includes('k')) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }

        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    countObserver.observe(el);
  });
});
