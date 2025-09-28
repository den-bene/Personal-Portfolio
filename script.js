// script.js
// ========== JavaScript for Portfolio Website ==========
// Features: Smooth scrolling, mobile menu, fade-in animations

// 1. Smooth anchor scrolling (generic)
const smoothScroll = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};

// 2. Horizontal scroll support for projects scroller
const horizontalScroll = () => {
  const scroller = document.getElementById('projects-scroller');
  if (!scroller) return;

  // Smooth wheel horizontal scroll
  // Disable wheel hijack for better natural page scroll; rely on grab-drag only
  // If you want to re-enable, prefer subtle deltas and only when hovering scroller

  // Touch drag support
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  scroller.addEventListener('pointerdown', (e) => {
    isDown = true;
    scroller.setPointerCapture(e.pointerId);
    startX = e.clientX;
    scrollLeft = scroller.scrollLeft;
    scroller.classList.add('dragging');
  });
  scroller.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    scroller.scrollLeft = scrollLeft - dx;
  });
  const end = () => { isDown = false; scroller.classList.remove('dragging'); };
  scroller.addEventListener('pointerup', end);
  scroller.addEventListener('pointercancel', end);
  scroller.addEventListener('pointerleave', end);

  // Optional: snap to nearest card after drag ends
  const snapToNearest = () => {
    const cards = Array.from(scroller.querySelectorAll('.project-card'));
    if (!cards.length) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const centerX = scrollerRect.left + scrollerRect.width / 2;
    let bestCard = null;
    let bestDistance = Infinity;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - centerX);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestCard = card;
      }
    });
    if (bestCard) {
      bestCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };
  scroller.addEventListener('pointerup', snapToNearest);
};

// 3. Fade-in Animations on Scroll
// -------------------------------
// Uses Intersection Observer to animate sections
const fadeInOnScroll = () => {
  const sections = document.querySelectorAll('main section, footer');
  const observer = new window.IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach(section => {
    section.classList.add('fade-init');
    observer.observe(section);
  });
};

// 4. Initialize All Features
// --------------------------
document.addEventListener('DOMContentLoaded', () => {
  smoothScroll();
  horizontalScroll();
  fadeInOnScroll();
});

// ========== CSS hooks used ==========
// .fade-init, .fade-in defined in styles.css
