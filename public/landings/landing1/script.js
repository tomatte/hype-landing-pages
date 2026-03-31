document.addEventListener('DOMContentLoaded', () => {

  // === ELEMENTS ===
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  const mobileCta = document.getElementById('mobileCta');
  const heroSection = document.getElementById('hero');
  const contactForm = document.getElementById('contactForm');

  // === STICKY HEADER ===
  const handleHeaderScroll = () => {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('header--scrolled', scrolled);
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

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
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        mobileCta.classList.toggle('mobile-sticky-cta--visible', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    ctaObserver.observe(heroSection);
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // === FADE-IN ON SCROLL ===
  const fadeElements = document.querySelectorAll(
    '.problems__grid .card, .step, .features__grid .card, ' +
    '.comparison__table-wrapper, .comparison__mobile-card, ' +
    '.testimonials__grid .card, .faq__item, .cta-final__content'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(el => fadeObserver.observe(el));

  // === CONTACT FORM ===
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const phone = formData.get('phone');

      // Fallback: open WhatsApp with form data
      const message = encodeURIComponent(
        `Olá! Meu nome é ${name} e quero saber mais sobre o Hype para meus eventos.`
      );
      // TODO: trocar pelo número real de WhatsApp
      const whatsappUrl = `https://wa.me/5500000000000?text=${message}`;
      window.open(whatsappUrl, '_blank');

      contactForm.reset();
    });
  }

});
