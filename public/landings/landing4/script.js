document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  const mobileCta = document.getElementById('mobileCta');
  const heroSection = document.getElementById('hero');
  const contactForm = document.getElementById('contactForm');

  // === STICKY HEADER ===

  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // === MOBILE MENU ===

  const openMenu = () => {
    mobileMenu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    mobileMenu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openMenu);
  mobileMenuClose.addEventListener('click', closeMenu);
  mobileMenuLinks.forEach(link => link.addEventListener('click', closeMenu));

  // === MOBILE STICKY CTA ===

  if (heroSection && mobileCta) {
    const ctaObs = new IntersectionObserver(
      ([e]) => mobileCta.classList.toggle('mobile-sticky-cta--visible', !e.isIntersecting),
      { threshold: 0 }
    );
    ctaObs.observe(heroSection);
  }

  // === SMOOTH SCROLL ===

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // === SCROLL REVEAL WITH STAGGER ===

  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const parent = el.parentElement;
        const siblings = parent ? [...parent.querySelectorAll('[data-reveal]')] : [el];
        const index = siblings.indexOf(el);
        const delay = index * 80;

        setTimeout(() => el.classList.add('revealed'), delay);
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // === ANIMATED COUNTERS ===

  const statNumbers = document.querySelectorAll('.stats__number');
  let countersAnimated = false;

  const animateCounter = (el) => {
    const staticVal = el.dataset.static;
    if (staticVal) {
      el.textContent = staticVal + (el.dataset.suffix || '');
      return;
    }

    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      el.textContent = prefix + current + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          statNumbers.forEach(el => animateCounter(el));
          statsObs.unobserve(statsSection);
        }
      },
      { threshold: 0.5 }
    );
    statsObs.observe(statsSection);
  }

  // === TIMELINE PROGRESS ===

  const timelineFill = document.getElementById('timelineFill');
  const timelineSteps = document.querySelectorAll('.timeline__step');

  if (timelineFill && timelineSteps.length > 0) {
    const timelineObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
          }
        });
        updateTimelineFill();
      },
      { threshold: 0.4 }
    );

    timelineSteps.forEach(step => timelineObs.observe(step));

    const updateTimelineFill = () => {
      const activeSteps = document.querySelectorAll('.timeline__step.is-active');
      if (activeSteps.length === 0) {
        timelineFill.style.height = '0%';
        return;
      }
      const pct = (activeSteps.length / timelineSteps.length) * 100;
      timelineFill.style.height = pct + '%';
    };
  }

  // === CONTACT FORM → WHATSAPP FALLBACK ===

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name');
      const msg = encodeURIComponent(
        `Olá! Meu nome é ${name} e quero saber mais sobre o Hype para meus eventos.`
      );
      // TODO: trocar pelo número real
      window.open(`https://wa.me/5500000000000?text=${msg}`, '_blank');
      contactForm.reset();
    });
  }

});
