const ASSETS = {
  hero: 'assets/5tleMu0a7OVnWWmJ1N3Xsh-image-1.webp',
  story: 'assets/5tleMu0a7OVnWWmJ1N3Xsh-image-2.webp',
  special: 'assets/5tleMu0a7OVnWWmJ1N3Xsh-image-3.webp',
  interior: 'assets/5tleMu0a7OVnWWmJ1N3Xsh-image-4.webp',
  breakfast: 'assets/gSItUlEc9j8IaB0Pddh8rE-image-1.webp',
  fire: 'assets/gSItUlEc9j8IaB0Pddh8rE-image-2.webp',
  vegetarian: 'assets/gSItUlEc9j8IaB0Pddh8rE-image-3.webp',
  dessert: 'assets/gSItUlEc9j8IaB0Pddh8rE-image-4.webp',
  event: 'assets/gSItUlEc9j8IaB0Pddh8rE-image-5.webp',
  chef: 'assets/5tleMu0a7OVnWWmJ1N3Xsh-image-2.webp',
  cocktail: 'assets/gSItUlEc9j8IaB0Pddh8rE-image-5.webp',
  exterior: 'assets/5tleMu0a7OVnWWmJ1N3Xsh-image-4.webp',
  table: 'assets/5tleMu0a7OVnWWmJ1N3Xsh-image-3.webp',
  spices: 'assets/gSItUlEc9j8IaB0Pddh8rE-image-3.webp'
};
const assetBase = new URL('./', document.querySelector('script[src*="app.js"]')?.src || document.baseURI);
Object.keys(ASSETS).forEach((key) => { ASSETS[key] = new URL(ASSETS[key], assetBase).href; });
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
const scrollTasks = [];
let scrollFrame = 0;
const registerScrollTask = (task) => scrollTasks.push(task);
window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0;
    scrollTasks.forEach((task) => task());
  });
}, { passive: true });

const setMenuState = (open) => {
  header?.classList.toggle('menu-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  mobileMenu?.setAttribute('aria-hidden', String(!open));
};
menuToggle?.addEventListener('click', () => setMenuState(!header.classList.contains('menu-open')));
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));

const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a');
navLinks.forEach((link) => {
  if (link.getAttribute('href') === currentPath) link.setAttribute('aria-current', 'page');
});

const pageBanner = (eyebrow, title, italic, image = ASSETS.interior) => `
  <section class="inner-banner section-dark" aria-labelledby="page-title">
    <div class="inner-banner-image" style="--image: url('${image}')"></div><div class="inner-banner-overlay"></div>
    <div class="container inner-banner-content"><span class="eyebrow reveal-up">${eyebrow}</span><h1 id="page-title" class="display display-small reveal-up" style="--delay:100ms">${title}<br /><em>${italic}</em></h1><span class="banner-scroll reveal-up" style="--delay:180ms">Wilton / continue ↓</span></div>
  </section>`;
const sectionHeading = (number, label, title, italic) => `<div class="route-heading reveal-up"><div><span class="section-number">${number}</span><span class="eyebrow">${label}</span></div><h2 class="display display-small">${title}<br /><em>${italic}</em></h2></div>`;
const routeCta = (title, italic, text, href = '/reserve', label = 'Reserve a table') => `<section class="route-cta section-burgundy"><div class="container route-cta-grid"><div><span class="eyebrow">A good next step</span><h2 class="display display-small">${title}<br /><em>${italic}</em></h2></div><div><p class="lede light-lede">${text}</p><a class="button button-light" href="${href}">${label} <span>↗</span></a></div></div></section>`;
const imageFigure = (src, alt, caption, className = '') => `<figure class="route-image ${className}"><img src="${src}" alt="${alt}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;

const categoryData = [
  {slug:'breakfast', title:'Breakfast', italic:'with time.', kicker:'Morning plates', image:ASSETS.breakfast, intro:'For mornings that do not need to be rushed.', items:['Appam with vegetable stew','Puttu, kadala curry, banana','Ghee roast, coconut chutney','Egg roast, Malabar paratha']},
  {slug:'fire', title:'From the fire', italic:'char & smoke.', kicker:'Grill and tandoor', image:ASSETS.fire, intro:'High heat, slow marinades, a little smoke in the air.', items:['Pepper chicken, charred onion','Claypot fish with curry leaf','Wilton lamb seekh, mint','Fire-roasted vegetables, sesame']},
  {slug:'coastal', title:'Coastal', italic:'salt & story.', kicker:'From the shore', image:ASSETS.special, intro:'Coconut, tamarind, green chilli, and the memory of a shoreline.', items:['Kerala prawn moilee','Malabar fish curry','Crab with roasted coconut','Tamarind-glazed sea bass']},
  {slug:'vegetarian', title:'Vegetarian', italic:'green things.', kicker:'From the garden', image:ASSETS.vegetarian, intro:'Bright plates for the table, built around what is growing now.', items:['Smoked beetroot kebab','Pumpkin erissery, toasted coconut','Charred okra, sesame','Seasonal thali for one']},
  {slug:'desserts', title:'Desserts', italic:'sweet finish.', kicker:'After the plate', image:ASSETS.dessert, intro:'Rose, cardamom, jaggery, and just enough salt.', items:['Cardamom milk cake','Tender coconut pudding','Saffron ice cream, pistachio','Hot gulab jamun, chilled rabadi']},
  {slug:'beverages', title:'Beverages', italic:'stay a while.', kicker:'Something to pour', image:ASSETS.interior, intro:'Bright coolers, slow pours, and a few late-night signatures.', items:['Green mango cooler','Rose and basil spritz','Wilton old fashioned','Filter coffee, after dinner']}
];
const newsData = [
  {slug:'long-lunch', date:'12.08.24', tag:'Notes from the kitchen', title:'Why we keep the good stuff on the table.', image:ASSETS.special, intro:'A note on abundance, conversation, and the kind of meal that makes the clock behave differently.'},
  {slug:'spice-market', date:'04.07.24', tag:'Field notes', title:'A morning at the spice market.', image:ASSETS.breakfast, intro:'We went looking for black pepper and came back with a new menu in our heads.'},
  {slug:'table-for-many', date:'22.06.24', tag:'Good company', title:'In praise of a long lunch.', image:ASSETS.event, intro:'There is a particular joy in a table that refuses to be hurried.'},
  {slug:'first-rains', date:'18.05.24', tag:'Seasonal', title:'The first rains are on the menu.', image:ASSETS.vegetarian, intro:'A brighter, greener chapter for the kitchen, with young gourds and fresh coconut.'}
];
const locations = [
  {slug:'fort', name:'Wilton, Fort', address:'14 Harbour Road, Fort\nMumbai 400001', phone:'+91 22 4000 0000', hours:'Tue — Thu 12:00 — 23:00\nFri — Sun 12:00 — 00:00', image:ASSETS.interior},
  {slug:'bandra', name:'Wilton, Bandra', address:'18 Chapel Road, Bandra West\nMumbai 400050', phone:'+91 22 4000 0018', hours:'Tue — Sun 12:00 — 00:00', image:ASSETS.event},
  {slug:'kochi', name:'Wilton, Kochi', address:'7 River Walk, Panampilly Nagar\nKochi 682036', phone:'+91 484 400 0040', hours:'Wed — Sun 12:00 — 23:00', image:ASSETS.story}
];

const pageTemplates = {
  '/about': () => `${pageBanner('The Wilton story', 'A house for', 'good feeling.', ASSETS.story)}
    <section class="route-section section-cream"><div class="container two-col-story">${sectionHeading('01','The beginning','Rooted in memory.','Made for now.')}<div class="route-prose reveal-up"><p class="lede">Wilton began with a simple question: what would happen if a restaurant felt a little more like the best table in your house?</p><p>We grew up around generous cooking, strong opinions about chutney, and the kind of hospitality that notices when you need another glass of water before you ask. We carry that instinct into every plate.</p><p>Our menu moves through the Indian coast and city, taking familiar flavours somewhere slightly unexpected. Not to make them strange — to make us look again.</p><a class="text-link burgundy-link" href="/history">Read our history <span>↗</span></a></div></div></section>
    <section class="route-section section-cream"><div class="container editorial-pair">${imageFigure(ASSETS.story,'Chef hands finishing a dish at the pass','Made in small, considered gestures.','route-image-tall')}<div class="values-stack reveal-up"><span class="eyebrow">What we believe</span><div class="value-row"><strong>01</strong><div><h3>Warmth before theatre.</h3><p>We want you to feel looked after before you feel impressed.</p></div></div><div class="value-row"><strong>02</strong><div><h3>Curiosity over certainty.</h3><p>Our recipes have roots, but they are not afraid of a new branch.</p></div></div><div class="value-row"><strong>03</strong><div><h3>Nothing precious, everything cared for.</h3><p>From a humble curry leaf to a special-occasion table, details count.</p></div></div></div></div></section>
    ${routeCta('Come as you are.','Stay for the story.','Find a table, take a seat, and let the evening take its own shape.','/locations','Find a location')}`,
  '/history': () => `${pageBanner('A few chapters', 'The long', 'way here.', ASSETS.interior)}
    <section class="route-section section-cream"><div class="container history-intro"><span class="eyebrow reveal-up">1986 — today</span><p class="lede reveal-up">Wilton is not a nostalgia project. It is a living thing, built by people who believe the best traditions are the ones you keep cooking.</p></div><div class="container timeline"><article class="timeline-item reveal-up"><span class="timeline-year">1986</span><div><h2>Start with a good table.</h2><p>A small dining room, a borrowed copper pot, and a family recipe for fish curry that everyone wanted to take home.</p></div></article><article class="timeline-item reveal-up" style="--delay:90ms"><span class="timeline-year">2004</span><div><h2>Make room for the city.</h2><p>Wilton found its voice in the meeting point between coastal kitchens, late-night streets, and a new generation of diners.</p></div></article><article class="timeline-item reveal-up" style="--delay:180ms"><span class="timeline-year">2018</span><div><h2>Follow the ingredients.</h2><p>Our kitchen began working directly with growers, fishers, millers, and makers who care as much about the source as we do.</p></div></article><article class="timeline-item reveal-up" style="--delay:270ms"><span class="timeline-year">Today</span><div><h2>Keep the door open.</h2><p>There is always another plate to learn from, another story to hear, and another seat waiting at the table.</p></div></article></div></section>
    <section class="history-proof section-dark"><div class="container history-proof-grid"><div><span class="eyebrow">The present chapter</span><h2 class="display display-small">Still learning.<br /><em>Still hungry.</em></h2></div><div class="route-prose light-prose"><p>We cook across three rooms, with one shared belief: the details of a meal are what make it memorable.</p><a class="text-link light-link" href="/our-kitchen">Meet the kitchen <span>↗</span></a></div></div></section>`,
  '/menu': () => `${pageBanner('A menu in motion', 'Find your', 'favourite corner.', ASSETS.fire)}
    <section class="route-section section-cream"><div class="container menu-route-intro"><div>${sectionHeading('01','Explore by mood','Start somewhere.','Stay curious.')}</div><p class="lede reveal-up">A menu built to be crossed, shared, and returned to. Browse by the part of the meal you are thinking about.</p></div><div class="container archive-category-grid">${categoryData.map((category, index) => `<a class="archive-category-card reveal-up" style="--delay:${index * 70}ms" href="/menu/${category.slug}"><img src="${category.image}" alt="${category.title} category at Wilton" loading="lazy" /><div><span class="eyebrow">${category.kicker}</span><h2>${category.title}<br /><em>${category.italic}</em></h2><p>${category.intro}</p><span class="text-link burgundy-link">Explore category <span>↗</span></span></div></a>`).join('')}</div></section>
    <section class="dietary-band section-burgundy"><div class="container dietary-grid"><div><span class="eyebrow">Need a little clarity?</span><h2 class="display display-small">Ask us<br /><em>anything.</em></h2></div><div><p class="lede light-lede">Our team can talk you through allergens, vegetarian choices, spice levels, and what is best tonight.</p><a class="button button-light" href="/allergens">See the allergen guide <span>↗</span></a></div></div></section>`,
  '/specials': () => `${pageBanner('The board changes often', 'Tonight’s', 'good idea.', ASSETS.special)}
    <section class="route-section section-cream"><div class="container feature-route"><div class="feature-route-copy">${sectionHeading('01','Wilton special','The dish everyone','talks about.')}<p class="lede reveal-up">Sea, smoke, and a generous squeeze of lime. Our signature curry is a slow conversation between the coast and the city.</p><p class="body-copy reveal-up">Ask what is in the clay pot tonight — we will tell you where it came from, how we cooked it, and what to order alongside.</p><a class="text-link burgundy-link reveal-up" href="/reserve">Book your table <span>↗</span></a></div>${imageFigure(ASSETS.special,'Signature seafood curry with charred lime','03 / signature · slow-cooked, always worth it','route-image-special')}</div></section>
    <section class="seasonal-list section-dark"><div class="container seasonal-grid"><div><span class="eyebrow">On rotation</span><h2 class="display display-small">A few more<br /><em>reasons to visit.</em></h2></div><div class="seasonal-items"><div><span>01</span><h3>Green mango rasam</h3><p>Bright, peppery, and gone before the rains.</p></div><div><span>02</span><h3>Charred okra chaat</h3><p>Crunch, tang, and a little heat.</p></div><div><span>03</span><h3>Jaggery caramel custard</h3><p>Soft, smoky, with a pinch of salt.</p></div></div></div></section>`,
  '/our-kitchen': () => `${pageBanner('Behind the plate', 'The quiet', 'craft.', ASSETS.story)}
    <section class="route-section section-cream"><div class="container two-col-story">${sectionHeading('01','Meet the kitchen','Cook with','curiosity.')}<div class="route-prose reveal-up"><p class="lede">The kitchen is a place for questions. What happens if we leave the spice whole? What if the richest thing on the plate is the simplest?</p><p>Our cooks follow the ingredient, keep the ego out of the way, and let time do some of the talking. Every service is a conversation between prep, fire, pass, and table.</p><p>We work with small farms, coastal suppliers, and makers who understand that good food begins long before it reaches the room.</p><a class="text-link burgundy-link" href="/about">Read the Wilton story <span>↗</span></a></div></div></section>
    <section class="route-section section-cream"><div class="container kitchen-gallery"><div class="kitchen-card kitchen-card-large"><img src="${ASSETS.interior}" alt="Wilton dining room at dusk" loading="lazy" /><span>01 / the room</span></div><div class="kitchen-card"><img src="${ASSETS.chef}" alt="Wilton chef in the open kitchen" loading="lazy" /><span>02 / the people</span></div><div class="kitchen-card"><img src="${ASSETS.spices}" alt="Spices and ingredients prepared for service" loading="lazy" /><span>03 / the season</span></div></div></section>`,
  '/latest-news': () => `${pageBanner('From the journal', 'Notes from', 'around the table.', ASSETS.event)}
    <section class="route-section section-cream"><div class="container archive-head">${sectionHeading('01','The archive','Small stories.','Good reasons.')}<p class="lede reveal-up">Kitchen notes, field trips, new plates, and the people who make Wilton feel like Wilton.</p></div><div class="container news-grid">${newsData.map((news, index) => `<a class="news-card reveal-up" style="--delay:${index * 80}ms" href="/latest-news/${news.slug}"><div class="news-image"><img src="${news.image}" alt="${news.title}" loading="lazy" /><span class="news-date">${news.date}</span></div><div class="news-card-copy"><span class="eyebrow">${news.tag}</span><h2>${news.title}</h2><span class="text-link burgundy-link">Read note <span>↗</span></span></div></a>`).join('')}</div></section>`,
  '/promotions-events': () => `${pageBanner('Good things on the calendar', 'Make an', 'occasion of it.', ASSETS.event)}
    <section class="route-section section-cream"><div class="container archive-head">${sectionHeading('01','What’s happening','A little more','to look forward to.')}<p class="lede reveal-up">Seasonal dinners, guest tables, and the occasional reason to dress up.</p></div><div class="container news-grid event-grid"><a class="news-card reveal-up" href="/promotions-events/supper-club"><div class="news-image"><img src="${ASSETS.event}" alt="Long table prepared for a Wilton supper club" loading="lazy" /><span class="news-date">18.10.24</span></div><div class="news-card-copy"><span class="eyebrow">Supper club</span><h2>One table, many stories.</h2><p>Join us for a family-style dinner with a menu written just for the night.</p><span class="text-link burgundy-link">See the details <span>↗</span></span></div></a><a class="news-card reveal-up" style="--delay:100ms" href="/promotions-events/harvest-table"><div class="news-image"><img src="${ASSETS.vegetarian}" alt="Seasonal vegetarian plates for a harvest table" loading="lazy" /><span class="news-date">02.11.24</span></div><div class="news-card-copy"><span class="eyebrow">Seasonal table</span><h2>The harvest table.</h2><p>A generous vegetarian menu, served slowly, with the growers who made it possible.</p><span class="text-link burgundy-link">See the details <span>↗</span></span></div></a></div></section>`,
  '/locations': () => `${pageBanner('Find your way here', 'There’s room', 'at our table.', ASSETS.interior)}
    <section class="route-section section-cream"><div class="container archive-head">${sectionHeading('01','Our rooms','Come by,','stay awhile.')}<p class="lede reveal-up">Three neighbourhoods, one Wilton feeling. Choose a room, then choose what you are hungry for.</p></div><div class="container locations-grid">${locations.map((location, index) => `<article class="location-card reveal-up" style="--delay:${index * 90}ms"><img src="${location.image}" alt="${location.name} dining room" loading="lazy" /><div class="location-copy"><span class="eyebrow">${location.name}</span><p>${location.address.replace(/\n/g,'<br />')}</p><div class="location-meta"><span>${location.hours.replace(/\n/g,'<br />')}</span><a href="tel:${location.phone.replace(/\s/g,'')}">${location.phone}</a></div><div class="location-actions"><a class="text-link burgundy-link" href="/locations/${location.slug}">View location <span>↗</span></a><a class="text-link burgundy-link" href="tel:${location.phone.replace(/\s/g,'')}">Call <span>↗</span></a></div></div></article>`).join('')}</div></section>`,
  '/contact': () => `${pageBanner('Say hello', 'Let’s make', 'a plan.', ASSETS.interior)}
    <section class="route-section section-cream"><div class="container contact-layout"><div><span class="eyebrow reveal-up">The useful bits</span><h2 class="display display-small reveal-up">Questions are<br /><em>welcome here.</em></h2><p class="lede reveal-up">For reservations, private dining, feedback, or just a little help choosing what to order, send a note.</p><div class="contact-details reveal-up"><a href="tel:+912240000000">+91 22 4000 0000</a><a href="mailto:hello@wilton.house">hello@wilton.house</a><p>14 Harbour Road<br />Fort, Mumbai 400001</p></div></div><form class="wilton-form reveal-up" data-form="contact"><label>First name<input required name="firstName" autocomplete="given-name" /></label><label>Email address<input required type="email" name="email" autocomplete="email" /></label><label>What can we help with?<select name="topic"><option>Reserve a table</option><option>Private dining</option><option>Feedback</option><option>Press enquiries</option></select></label><label>Your message<textarea required name="message" rows="5"></textarea></label><button class="button button-burgundy" type="submit">Send enquiry <span>↗</span></button><p class="form-status" aria-live="polite"></p></form></div></section>`,
  '/feedback': () => `${pageBanner('Tell us everything', 'A good meal', 'keeps listening.', ASSETS.story)}
    <section class="route-section section-cream"><div class="container contact-layout"><div>${sectionHeading('01','Guest feedback','How was','your table?')}<p class="lede reveal-up">Your notes help us keep the room warm, the menu curious, and the little things in the right place.</p></div><form class="wilton-form reveal-up" data-form="feedback"><label>Your name<input required name="name" /></label><label>Email address<input required type="email" name="email" /></label><label>Which room did you visit?<select name="location"><option>Wilton, Fort</option><option>Wilton, Bandra</option><option>Wilton, Kochi</option></select></label><label>Tell us about it<textarea required name="message" rows="6"></textarea></label><button class="button button-burgundy" type="submit">Send feedback <span>↗</span></button><p class="form-status" aria-live="polite"></p></form></div></section>`,
  '/reserve': () => `${pageBanner('Save a seat', 'Make an', 'evening of it.', ASSETS.interior)}
    <section class="route-section section-cream"><div class="container contact-layout"><div>${sectionHeading('01','Reservations','A table for','the curious.')}<p class="lede reveal-up">Tell us when you would like to come by. We will take it from there.</p><p class="body-copy reveal-up">For groups of eight or more, call us directly so we can make the room feel just right.</p><a class="text-link burgundy-link reveal-up" href="tel:+912240000000">Call +91 22 4000 0000 <span>↗</span></a></div><form class="wilton-form reveal-up" data-form="reserve"><label>Choose a room<select name="location"><option>Wilton, Fort</option><option>Wilton, Bandra</option><option>Wilton, Kochi</option></select></label><label>Date<input required type="date" name="date" /></label><label>Time<select name="time"><option>12:30</option><option>19:00</option><option>20:30</option><option>21:30</option></select></label><label>Guests<select name="guests"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label><label>Your name<input required name="name" /></label><label>Phone<input required type="tel" name="phone" /></label><button class="button button-burgundy" type="submit">Request a table <span>↗</span></button><p class="form-status" aria-live="polite"></p></form></div></section>`,
  '/order-online': () => `${pageBanner('Take Wilton with you', 'Good food,', 'wherever you are.', ASSETS.special)}<section class="route-section section-cream"><div class="container order-grid"><div>${sectionHeading('01','Choose your pace','Pick up,','or stay in.')}<p class="lede reveal-up">Our online menu is built for the nights you want the Wilton feeling, even when the table is your own sofa.</p></div><div class="order-options"><a class="order-option reveal-up" href="/menu"><span>01</span><div><h3>Browse the menu</h3><p>See what is cooking today.</p></div><b>↗</b></a><a class="order-option reveal-up" style="--delay:100ms" href="/locations"><span>02</span><div><h3>Choose your room</h3><p>Find a Wilton near you.</p></div><b>↗</b></a><a class="order-option reveal-up" style="--delay:200ms" href="tel:+912240000000"><span>03</span><div><h3>Call the kitchen</h3><p>We are happy to help.</p></div><b>↗</b></a></div></div></section>`,
  '/allergens': () => `${pageBanner('A clear table', 'Know what’s', 'on your plate.', ASSETS.vegetarian)}<section class="route-section section-cream"><div class="container two-col-story">${sectionHeading('01','Dietary guide','Ask us,','always.')}<div class="route-prose reveal-up"><p class="lede">We are happy to talk through ingredients, allergens, spice, and substitutions before you order.</p><p>Our kitchen handles nuts, dairy, gluten, shellfish, and other common allergens. While we take care, we cannot promise a completely allergen-free environment. Please tell your server what you need.</p><div class="allergen-list"><span><i>V</i> Vegetarian options</span><span><i>VG</i> Vegan options</span><span><i>🌶</i> Spice can be adjusted</span></div><a class="text-link burgundy-link" href="/contact">Ask a question <span>↗</span></a></div></div></section>`,
  '/privacy': () => policyPage('Privacy', 'A short note on trust.', 'We collect only what helps us answer your message, manage your reservation, improve the room, or keep Wilton running. We do not sell personal information. For questions, email hello@wilton.house.'),
  '/terms': () => policyPage('Terms', 'The house rules.', 'Reservations, event details, menu availability, and opening hours may change as the season moves. We will always do our best to give you clear information at the point of booking.'),
  '/accessibility': () => policyPage('Accessibility', 'A table for everyone.', 'We are working to make Wilton’s website and rooms easier to use for everyone. If something gets in the way, please email hello@wilton.house and tell us what would help.'),
  '/locations/fort': () => locationDetail(locations[0]),
  '/locations/bandra': () => locationDetail(locations[1]),
  '/locations/kochi': () => locationDetail(locations[2]),
  '/latest-news/long-lunch': () => articlePage(newsData[0]),
  '/latest-news/spice-market': () => articlePage(newsData[1]),
  '/latest-news/table-for-many': () => articlePage(newsData[2]),
  '/latest-news/first-rains': () => articlePage(newsData[3]),
  '/promotions-events/supper-club': () => eventDetail('One table, many stories.','A family-style supper club with a menu written just for the night.', '18 October 2024 · Wilton, Fort', ASSETS.event),
  '/promotions-events/harvest-table': () => eventDetail('The harvest table.','A generous vegetarian menu, served slowly, with the growers who made it possible.', '02 November 2024 · Wilton, Bandra', ASSETS.vegetarian)
};

function policyPage(label, title, text) {
  return `${pageBanner(label, title.split(' ').slice(0,-1).join(' '), title.split(' ').slice(-1)[0], ASSETS.interior)}<section class="route-section section-cream"><div class="container legal-copy"><span class="eyebrow">Last updated · 2024</span><h2>${title}</h2><p class="lede">${text}</p><p>Wilton House · 14 Harbour Road · Fort, Mumbai 400001</p><a class="text-link burgundy-link" href="/contact">Contact Wilton <span>↗</span></a></div></section>`;
}
function locationDetail(location) {
  return `${pageBanner(location.name, 'A room', 'for your evening.', location.image)}<section class="route-section section-cream"><div class="container location-detail"><div>${sectionHeading('01','Find us',location.name,'')}</div><div class="location-detail-copy"><p class="lede">${location.address.replace(/\n/g,'<br />')}</p><p>${location.hours.replace(/\n/g,'<br />')}</p><a class="button button-burgundy" href="tel:${location.phone.replace(/\s/g,'')}">Call ${location.phone} <span>↗</span></a><a class="text-link burgundy-link" href="/reserve">Reserve this room <span>↗</span></a></div></div></section><section class="location-detail-band section-dark"><div class="container"><span class="eyebrow">A little context</span><h2 class="display display-small">Come for the<br /><em>food. Stay for us.</em></h2></div></section>`;
}
function articlePage(article) {
  return `${pageBanner(article.tag, article.title.split(' ').slice(0,2).join(' '), article.title.split(' ').slice(2).join(' '), article.image)}<article class="article-page section-cream"><div class="container article-layout"><div class="article-meta"><span>${article.date}</span><span>${article.tag}</span></div><div class="article-copy"><p class="lede">${article.intro}</p><p>There are ingredients you measure, and ingredients you listen to. Around here, the second kind tends to stay on the menu longer.</p><p>We came back from the market with full bags, muddy shoes, and the kind of excitement that makes prep feel like a party. The new plates are bright, patient, and built to be shared.</p><p>Come by and tell us what you think. We are still learning.</p><a class="text-link burgundy-link" href="/latest-news">Back to the journal <span>↗</span></a></div></div></article>`;
}
function eventDetail(title, intro, meta, image) {
  return `${pageBanner('On the calendar', title.split(' ').slice(0,2).join(' '), title.split(' ').slice(2).join(' '), image)}<article class="article-page section-cream"><div class="container article-layout"><div class="article-meta"><span>${meta}</span><span>Wilton events</span></div><div class="article-copy"><p class="lede">${intro}</p><p>One long table, a menu that only exists for one night, and enough time to meet the person sitting beside you. Come hungry; leave with a new favourite.</p><p>Places are limited. Call the room or use the reservation form to save yours.</p><a class="button button-burgundy" href="/reserve">Reserve a place <span>↗</span></a></div></div></article>`;
}
function categoryPage(category) {
  const data = categoryData.find((item) => item.slug === category) || categoryData[0];
  return `${pageBanner(data.kicker, data.title, data.italic, data.image)}<section class="route-section section-cream"><div class="container archive-head"><div><span class="eyebrow">${data.kicker}</span><h2 class="display display-small">${data.title}<br /><em>${data.italic}</em></h2></div><p class="lede reveal-up">${data.intro}</p></div><div class="container dish-grid">${data.items.concat(['Seasonal plate, ask your server']).map((item, index) => `<article class="dish-card reveal-up" style="--delay:${index * 60}ms"><div class="dish-card-art" style="--dish-image:url('${data.image}')"><span>${String(index + 1).padStart(2,'0')}</span><i>${index % 3 === 0 ? 'V' : ''}</i></div><div><h3>${item}</h3><p>${index % 2 === 0 ? 'A Wilton plate, made for the middle of the table.' : 'Ask us what is best from the kitchen tonight.'}</p><span class="dish-tag">${index % 3 === 0 ? 'vegetarian option' : 'chef’s note'}</span></div></article>`).join('')}</div></section><section class="dietary-band section-burgundy"><div class="container dietary-grid"><div><span class="eyebrow">Not sure where to begin?</span><h2 class="display display-small">Let us<br /><em>choose.</em></h2></div><div><p class="lede light-lede">Tell us what you like and how hungry you are. The kitchen will take it from there.</p><a class="button button-light" href="/reserve">Reserve a table <span>↗</span></a></div></div></section>`;
}

function renderRoute() {
  const main = document.querySelector('main');
  if (!main || currentPath === '/') return false;
  let markup = pageTemplates[currentPath]?.();
  if (!markup && currentPath.startsWith('/menu/')) markup = categoryPage(currentPath.split('/')[2]);
  if (!markup) markup = pageTemplates['/about']();
  main.innerHTML = markup;
  main.classList.add('route-main');
  document.title = `Wilton — ${document.querySelector('#page-title')?.textContent || 'A table for the curious'}`;
  header?.classList.add('scrolled');
  return true;
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
}, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });
const observeReveals = () => document.querySelectorAll('.reveal-up').forEach((element) => revealObserver.observe(element));

function setupHomeCarousel() {
  const hero = document.querySelector('.hero');
  const heroImage = hero?.querySelector('.hero-image');
  const title = hero?.querySelector('#hero-title');
  const intro = hero?.querySelector('.hero-intro');
  const index = hero?.querySelector('.hero-index');
  if (!hero || !heroImage || !title || !intro || !index) return;
  const slides = [
    {image:ASSETS.hero, title:'A table', italic:'for the curious.', intro:'A little fire. A little nostalgia. A generous table set for the stories we bring with us.', kicker:'Modern Indian dining · Est. 1986'},
    {image:ASSETS.breakfast, title:'Start with', italic:'something warm.', intro:'Morning plates, strong coffee, and enough time for one more story.', kicker:'Breakfast · served slowly'},
    {image:ASSETS.fire, title:'Follow the', italic:'smoke home.', intro:'From the fire, with charred edges, bright herbs, and a little theatre.', kicker:'Tandoor · grill · roast'},
    {image:ASSETS.special, title:'Taste the', italic:'coast at dusk.', intro:'Coconut, curry leaf, tamarind, and the memory of a shoreline.', kicker:'Coastal · seasonal · generous'},
    {image:ASSETS.event, title:'Stay for', italic:'one more glass.', intro:'An evening that takes its own shape, at a table that is already yours.', kicker:'Good company · always welcome'},
    {image:ASSETS.chef, title:'Meet the', italic:'quiet hands.', intro:'The people behind the plate know when to turn up the heat — and when to let it rest.', kicker:'The kitchen · behind the plate'}
  ];
  let active = 0;
  hero.insertAdjacentHTML('beforeend', `<div class="hero-carousel-controls" aria-label="Hero slides"><div class="hero-slide-dots">${slides.map((_,i)=>`<button class="hero-dot${i===0?' active':''}" data-hero-slide="${i}" aria-label="Go to slide ${i+1}" aria-current="${i===0}"></button>`).join('')}</div></div>`);
  const dots = [...hero.querySelectorAll('[data-hero-slide]')];
  const renderSlide = (next) => {
    active = (next + slides.length) % slides.length;
    const slide = slides[active];
    heroImage.classList.add('is-switching');
    title.classList.add('is-switching');
    window.setTimeout(() => {
      heroImage.style.setProperty('--image', `url('${slide.image}')`);
      title.innerHTML = `${slide.title}<br /><em>${slide.italic}</em>`;
      title.dataset.fontReady = 'false';
      prepareFontElement(title);
      title.classList.remove('font-in-view');
      window.requestAnimationFrame(() => title.classList.add('font-in-view'));
      intro.textContent = slide.intro;
      index.innerHTML = `${String(active + 1).padStart(2,'0')} <span>/</span> 0${slides.length}`;
      hero.querySelector('.hero-kicker span:last-child').textContent = slide.kicker;
      heroImage.classList.remove('is-switching');
      title.classList.remove('is-switching');
    }, reducedMotion ? 0 : 260);
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === active); dot.setAttribute('aria-current', String(i === active)); });
  };
  dots.forEach((dot) => dot.addEventListener('click', () => renderSlide(Number(dot.dataset.heroSlide))));
  let timer;
  const start = () => { window.clearInterval(timer); timer = window.setInterval(() => renderSlide(active + 1), 2000); };
  start();
}

function prepareFontElement(element) {
  if (!element || element.dataset.fontReady === 'true') return;
  const label = element.textContent.replace(/\s+/g, ' ').trim();
  element.setAttribute('aria-label', label);
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  let wordIndex = 0;
  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/\s+/.test(part)) fragment.appendChild(document.createTextNode(part));
      else {
        const word = document.createElement('span');
        word.className = 'font-word';
        word.setAttribute('aria-hidden', 'true');
        word.style.setProperty('--word-index', wordIndex++);
        word.textContent = part;
        fragment.appendChild(word);
      }
    });
    node.replaceWith(fragment);
  });
  element.classList.add('font-motion');
  element.dataset.fontReady = 'true';
}

function setupFontMotion() {
  const targets = document.querySelectorAll('.display, .route-heading h2, .section-head .eyebrow, .route-prose .lede, .hero-intro');
  targets.forEach(prepareFontElement);
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('font-in-view', entry.isIntersecting)), { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  targets.forEach((target) => observer.observe(target));
  const headlines = document.querySelectorAll('.font-motion');
  if (!reducedMotion) registerScrollTask(() => headlines.forEach((headline) => {
    const rect = headline.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    headline.style.setProperty('--headline-y', `${Math.max(-8, Math.min(8, (progress - .5) * -14))}px`);
    headline.style.setProperty('--headline-x', `${Math.max(-12, Math.min(12, (progress - .5) * 20))}px`);
  }));
}

function setupScroll() {
  const sections = [...document.querySelectorAll('main > section[id], .route-main > section')];
  const dots = [...document.querySelectorAll('.side-dots a')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && dots.length) {
        const index = sections.indexOf(entry.target);
        dots.forEach((dot, i) => dot.classList.toggle('active', i === Math.min(Math.max(index, 0), dots.length - 1)));
      }
    });
  }, { threshold: 0.3 });
  sections.forEach((section) => sectionObserver.observe(section));
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!reducedMotion) registerScrollTask(() => parallaxElements.forEach((el) => {
    const rect = el.parentElement.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const amount = Math.max(-18, Math.min(18, (progress - .5) * -28));
    el.style.transform = `scale(1.04) translate3d(0, ${amount}px, 0)`;
  }));
  const hero = document.querySelector('.hero');
  if (hero) new IntersectionObserver(([entry]) => header?.classList.toggle('scrolled', !entry.isIntersecting), { threshold: 0.02 }).observe(hero);
}

function setupForms() {
  document.querySelectorAll('[data-form]').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    if (!status) return;
    status.textContent = form.dataset.form === 'reserve' ? 'Thanks — your table request is with the Wilton team. We will be in touch shortly.' : 'Thanks for writing. Your note is on its way to the Wilton team.';
    status.classList.add('is-success');
    form.querySelector('button')?.setAttribute('disabled', 'true');
  }));
}

function setupMediaHints() {
  document.querySelectorAll('img').forEach((image) => {
    image.decoding = 'async';
    if (!image.loading && !image.closest('.hero')) image.loading = 'lazy';
  });
}

function decorateImageSections() {
  const sectionImages = [ASSETS.story, ASSETS.special, ASSETS.interior, ASSETS.vegetarian, ASSETS.breakfast];
  const variants = ['mosaic', 'split', 'paper', 'poster', 'gallery'];
  document.querySelectorAll('.section-cream').forEach((section, index) => {
    if (section.classList.contains('inner-banner') || section.dataset.noImage) return;
    section.classList.add('image-section');
    section.classList.add(`image-variant-${variants[index % variants.length]}`);
    section.dataset.imageSection = 'true';
    section.style.setProperty('--section-image', `url('${sectionImages[index % sectionImages.length]}')`);
    if (!section.querySelector('.fixed-media-grid')) section.insertAdjacentHTML('afterbegin', `<div class="fixed-media-grid" aria-hidden="true"><img src="${sectionImages[index % sectionImages.length]}" alt="" loading="lazy" decoding="async" /><img src="${sectionImages[(index + 1) % sectionImages.length]}" alt="" loading="lazy" decoding="async" /><img src="${sectionImages[(index + 2) % sectionImages.length]}" alt="" loading="lazy" decoding="async" /></div>`);
  });
  document.querySelectorAll('.section-dark:not(.hero):not(.inner-banner):not(.site-footer), .section-burgundy').forEach((section, index) => {
    section.classList.add('image-dark-section');
    section.classList.add(`image-variant-${variants[(index + 2) % variants.length]}`);
    section.dataset.imageSection = 'true';
    section.style.setProperty('--section-image', `url('${sectionImages[(index + 2) % sectionImages.length]}')`);
    if (!section.querySelector('.fixed-media-grid')) section.insertAdjacentHTML('afterbegin', `<div class="fixed-media-grid" aria-hidden="true"><img src="${sectionImages[(index + 2) % sectionImages.length]}" alt="" loading="lazy" decoding="async" /><img src="${sectionImages[(index + 3) % sectionImages.length]}" alt="" loading="lazy" decoding="async" /><img src="${sectionImages[(index + 4) % sectionImages.length]}" alt="" loading="lazy" decoding="async" /></div>`);
  });
  const imageSections = document.querySelectorAll('[data-image-section]');
  if (!imageSections.length) return;
  const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('section-in-view', entry.isIntersecting)), { threshold: 0.18 });
  imageSections.forEach((section) => sectionObserver.observe(section));
  if (!reducedMotion) registerScrollTask(() => imageSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    section.style.setProperty('--section-shift', `${Math.round((progress - .5) * -7)}%`);
  }));
}

function setupMotionLayer() {
  const wipe = document.createElement('div');
  wipe.className = 'page-transition';
  document.body.prepend(wipe);
  document.querySelectorAll('a[href^="/"]').forEach((link) => link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === currentPath || href.startsWith('/#') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (!reducedMotion) {
      wipe.classList.add('is-active');
      window.setTimeout(() => window.location.assign(href), 300);
    } else {
      window.location.assign(href);
    }
  }));
  const scenes = document.querySelectorAll('.story-scene');
  if (scenes.length) {
    const sceneObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting)), { threshold: 0.55 });
    scenes.forEach((scene) => sceneObserver.observe(scene));
  }
  const ribbon = document.querySelector('[data-ribbon]');
  if (ribbon && !reducedMotion && window.matchMedia('(min-width: 901px)').matches) {
    let raf;
    let paused = false;
    const drift = () => {
      if (!paused) {
        ribbon.scrollLeft += 0.22;
        if (ribbon.scrollLeft >= ribbon.scrollWidth - ribbon.clientWidth - 1) ribbon.scrollLeft = 0;
      }
      raf = window.requestAnimationFrame(drift);
    };
    ribbon.addEventListener('mouseenter', () => { paused = true; });
    ribbon.addEventListener('mouseleave', () => { paused = false; });
    ribbon.addEventListener('focusin', () => { paused = true; });
    ribbon.addEventListener('focusout', () => { paused = false; });
    raf = window.requestAnimationFrame(drift);
    window.addEventListener('pagehide', () => window.cancelAnimationFrame(raf), { once: true });
  }
}

const routeRendered = renderRoute();
setupHomeCarousel();
setupMediaHints();
decorateImageSections();
setupFontMotion();
observeReveals();
setupScroll();
setupForms();
setupMotionLayer();

if (routeRendered) window.scrollTo({ top: 0, behavior: 'auto' });

document.querySelectorAll('a[href^="/"]').forEach((link) => link.addEventListener('click', () => setMenuState(false)));
