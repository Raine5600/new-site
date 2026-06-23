// Capture UTM params for ad attribution (Meta / Google best practice)
(function captureUtm() {
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
  const data = {};
  keys.forEach(k => { if (params.get(k)) data[k] = params.get(k); });
  if (Object.keys(data).length) sessionStorage.setItem('bs_utm', JSON.stringify(data));
})();

// Mobile nav
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
  });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
    btn.setAttribute('aria-expanded', !wasOpen);
  });
});

// Shop filters
document.querySelectorAll('.filter-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.dataset.filter;
    document.querySelectorAll('[data-category]').forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.style.display = show ? '' : 'none';
    });
  });
});

// Quote form
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const utm = sessionStorage.getItem('bs_utm');
    console.log('Quote submitted', { utm: utm ? JSON.parse(utm) : null });
    quoteForm.innerHTML = `
      <div style="text-align:center;padding:40px 0;">
        <div style="font-size:3rem;margin-bottom:16px;">✓</div>
        <h2 style="font-size:1.4rem;font-weight:700;margin-bottom:8px;">Quote Request Sent!</h2>
        <p style="color:#52525b;line-height:1.6;">We'll get back to you within 24 hours with pricing and next steps.</p>
      </div>`;
  });
}