(function() {
  const slides = [
    document.querySelector('#intro-word-1 span'),
    document.querySelector('#intro-word-2 span'),
    document.querySelector('#intro-word-3 span'),
  ];
  const typeEl = document.getElementById('intro-typewriter');
  const intro  = document.getElementById('intro');
  const name   = 'Lucas Gabriel';

  slides.forEach((el, i) => {
    setTimeout(() => { el.style.transform = 'translateY(0)'; }, 300 + i * 500);
  });

  const typeStart = 300 + slides.length * 500 + 200;
  setTimeout(() => {
    typeEl.style.opacity = '1';
    let i = 0;
    const typer = setInterval(() => {
      typeEl.textContent += name[i];
      i++;
      if (i >= name.length) clearInterval(typer);
    }, 90);
  }, typeStart);

  const fadeStart = typeStart + name.length * 90 + 1200;
  setTimeout(() => {
    intro.style.transition = 'opacity 0.9s ease';
    intro.style.opacity = '0';
    setTimeout(() => { intro.style.display = 'none'; document.body.style.overflow = ''; }, 900);
  }, fadeStart);

  document.body.style.overflow = 'hidden';
})();

  // Scroll-triggered fade in for cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 80) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // When cards become visible
  const style = document.createElement('style');
  style.textContent = '.card.visible, .stat.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // WhatsApp card click — show button and set message per card
  const WPP_NUMBER = '5561993999883';
  document.querySelectorAll('.services .card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.btn-wpp')) return;
      const isActive = this.classList.contains('card-active');
      document.querySelectorAll('.services .card').forEach(c => c.classList.remove('card-active'));
      if (!isActive) {
        this.classList.add('card-active');
        const msg = this.dataset.wppMsg || 'Olá Lucas! Gostaria de saber mais sobre seus serviços.';
        const link = this.querySelector('.btn-wpp');
        if (link) link.href = 'https://wa.me/' + WPP_NUMBER + '?text=' + encodeURIComponent(msg);
      }
    });
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.services .card')) {
      document.querySelectorAll('.services .card').forEach(c => c.classList.remove('card-active'));
    }
  });

  // Nav shrink on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 80) {
      nav.style.padding = '14px 80px';
      nav.style.borderBottomColor = 'rgba(223,74,3,0.15)';
    } else {
      nav.style.padding = '22px 80px';
      nav.style.borderBottomColor = 'rgba(255,255,255,0.07)';
    }
  });
