const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setMenuState = (open) => {
  header.classList.toggle('menu-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  mobileMenu?.setAttribute('aria-hidden', String(!open));
};
menuToggle?.addEventListener('click', () => setMenuState(!header.classList.contains('menu-open')));
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
document.querySelectorAll('.reveal-up').forEach((element) => observer.observe(element));

const sections = [...document.querySelectorAll('main > section[id]')];
const dots = [...document.querySelectorAll('.side-dots a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = sections.indexOf(entry.target);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === Math.min(index, dots.length - 1)));
    }
  });
}, { threshold: 0.35 });
sections.forEach((section) => sectionObserver.observe(section));

const headerObserver = new IntersectionObserver(([entry]) => {
  header.classList.toggle('scrolled', !entry.isIntersecting);
}, { threshold: 0.02 });
const hero = document.querySelector('.hero');
if (hero) headerObserver.observe(hero);

if (!reducedMotion) {
  window.addEventListener('scroll', () => {
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const rect = el.parentElement.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const amount = Math.max(-18, Math.min(18, (progress - .5) * -28));
      el.style.transform = `scale(1.04) translate3d(0, ${amount}px, 0)`;
    });
  }, { passive: true });
}

document.querySelectorAll('.menu-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.menu;
    document.querySelectorAll('.menu-tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.menu-item').forEach((item) => {
      item.classList.toggle('is-hidden', category !== 'all' && item.dataset.category !== category);
    });
  });
});
