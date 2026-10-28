// Explore SA Events - external JavaScript
"use strict";

// Array of event objects (used by the upcoming-events cards and the cost calculator)
const events = [
 {
  "id": 1,
  "name": "Addo Elephant Dawn Safari Weekend",
  "date": "2026-11-14",
  "label": "Sat 14 Nov 2026",
  "time": "05:30",
  "place": "Addo Elephant National Park",
  "cat": "Wildlife",
  "local": 1450,
  "intl": 130,
  "img": "images/Addo elephants.jpg",
  "desc": "Guided dawn game drives to see elephant herds, buffalo and black rhino."
 },
 {
  "id": 2,
  "name": "Algoa Bay Penguin & Whale Cruise",
  "date": "2026-11-21",
  "label": "Sat 21 Nov 2026",
  "time": "09:00",
  "place": "Algoa Bay, Gqeberha",
  "cat": "Marine",
  "local": 650,
  "intl": 60,
  "img": "images/penguins.jpg",
  "desc": "Boat trip past Bird Island to see African penguins, dolphins and whales."
 },
 {
  "id": 3,
  "name": "Jeffreys Bay Surf Festival",
  "date": "2026-12-05",
  "label": "Sat 5 Dec 2026",
  "time": "08:00",
  "place": "Supertubes, Jeffreys Bay",
  "cat": "Sport",
  "local": 250,
  "intl": 25,
  "img": "images/Super-Tubes_1.webp",
  "desc": "Surf competition, live music and food stalls on the beachfront."
 },
 {
  "id": 4,
  "name": "Tsitsikamma Forest Trail Run",
  "date": "2027-01-16",
  "label": "Sat 16 Jan 2027",
  "time": "06:30",
  "place": "Storms River Mouth",
  "cat": "Sport",
  "local": 400,
  "intl": 40,
  "img": "images/1-tsitsikamma-hike-ocean-trail-adobe-1-1024x581.jpg",
  "desc": "10 km and 21 km trail runs through ancient Afromontane forest."
 },
 {
  "id": 5,
  "name": "Wild Coast Culture & Food Festival",
  "date": "2027-02-06",
  "label": "Sat 6 Feb 2027",
  "time": "10:00",
  "place": "Coffee Bay, Wild Coast",
  "cat": "Culture",
  "local": 550,
  "intl": 50,
  "img": "images/C0318909-Xhosa_Village_at_Wild_Coast.jpg",
  "desc": "Xhosa music, beadwork, storytelling and traditional food."
 },
 {
  "id": 6,
  "name": "Beach Clean-up & Conservation Day",
  "date": "2027-02-20",
  "label": "Sat 20 Feb 2027",
  "time": "08:30",
  "place": "Sardinia Bay, Gqeberha",
  "cat": "Conservation",
  "local": 50,
  "intl": 5,
  "img": "images/sardinia-beach.jpg",
  "desc": "Volunteer clean-up and talks on protecting penguins and shorebirds."
 },
//  {
//   "name": "Addo Elephant Dawn Safari Weekend",
//   "date": "2026-11-14",
//   "label": "Sat 14 Nov 2026",
//   "time": "07:00",
//   "place": "Addo Elephant National Park",
//   "cat": "Wildlife",
//   "local": 50,
//   "intl": 5,
//   "img": "images/Addo elephants.jpg",
//   "desc": "Elephant standing in Addo National Park"
// },
// {
//  "name": "Algoa Bay Penguin & Whale Cruise",
//  "date": "2026-11-21",
//  "label": "Sat 21 Nov 2026",
//  "time": "09:00",
//  "place": "Algoa Bay, Gqeberha",
//  "cat": "Marine",
//  "local": 650,
//  "intl": 60,
//  "img": "images/penguins.jpg",
//  "desc": "Boat trip past Bird Island to see African penguins, dolphins and whales."
// },
// {
//   "name": "Jeffreys Bay Surf Festival",
//   "date": "2026-12-05",
//   "label": "Sat 5 Dec 2026",
//   "time": "08:00",
//   "place": "Supertubes, Jeffreys Bay",
//   "cat": "Sport",
//   "local": 250,
//   "intl": 25,
//   "img": "images/Super-Tubes_1.jpg",
//   "desc": "Surf competition, live music and food stalls on the beachfront."
// }
];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const money = (n, intl) => (intl ? "US$" + n.toFixed(2) : "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

// Option E: current date and time
function updateClock() {
  const el = $("#datetime");
  if (el) el.textContent = new Date().toLocaleString("en-ZA", { dateStyle: "full", timeStyle: "medium" });
}
updateClock();
setInterval(updateClock, 1000);

// Option H: dark / light mode switch (remembers choice when storage is allowed)
(function theme() {
  const btn = $("#theme-toggle");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const apply = (mode) => {
    document.documentElement.setAttribute("data-theme", mode);
    btn.textContent = mode === "dark" ? "☀️ Light mode" : "🌙 Dark mode";
    btn.setAttribute("aria-pressed", mode === "dark");
    try { localStorage.setItem("theme", mode); } catch (e) {}
  };
  apply(saved || "light");
  btn.addEventListener("click", () => apply(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"));
})();

// Option A: welcome message on page load (home page)
(function welcome() {
  const box = $("#welcome");
  if (!box) return;
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  $("#welcome-text").textContent = greet + "! Welcome to Explore SA Events. Discover what's happening in the Eastern Cape.";
  box.hidden = false;
  $("#welcome-close").addEventListener("click", () => (box.hidden = true));
})();

// Option B: image slideshow
(function slideshow() {
  const slides = $$(".slide");
  if (slides.length === 0) return;
  const dotsBox = $("#dots");
  let index = 0, timer;
  slides.forEach((_, i) => {
    const d = document.createElement("span");
    d.addEventListener("click", () => { show(i); restart(); });
    dotsBox.appendChild(d);
  });
  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("active", n === index));
    Array.from(dotsBox.children).forEach((d, n) => d.classList.toggle("on", n === index));
  }
  function restart() { clearInterval(timer); timer = setInterval(() => show(index + 1), 5000); }
  $("#prev").addEventListener("click", () => { show(index - 1); restart(); });
  $("#next").addEventListener("click", () => { show(index + 1); restart(); });
  show(0); restart();
})();

// Option G: arrays and loops build the upcoming-events cards
(function upcoming() {
  const box = $("#upcoming");
  if (!box) return;
  const today = new Date();
  const next = events.filter((e) => new Date(e.date) >= today).slice(0, 3);
  for (const e of next) {
    const days = Math.ceil((new Date(e.date) - today) / 86400000);
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<img src="${e.img}" alt="${e.name}"><div class="body"><p class="tag">${e.cat}</p><h3>${e.name}</h3><p class="meta">${e.label} · ${e.place}</p><p>${e.desc}</p><p><strong>From ${money(e.local, false)} / ${money(e.intl, true).replace(".00", "")}</strong> <span class="meta">· in ${days} days</span></p><a class="btn small" href="events.html">Details</a></div>`;
    box.appendChild(card);
  }
})();

// Events page: category filter
(function filter() {
  const sel = $("#cat-filter");
  if (!sel) return;
  sel.addEventListener("change", () => {
    $$("#events-table tbody tr").forEach((r) => (r.style.display = sel.value === "all" || r.dataset.cat === sel.value ? "" : "none"));
  });
})();

// Option F: simple event cost calculator
(function calculator() {
  const form = $("#calc-form");
  if (!form) return;
  const select = $("#calc-event");
  events.forEach((e) => { const o = document.createElement("option"); o.value = e.id; o.textContent = e.name; select.appendChild(o); });
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const err = $("#calc-error"), out = $("#calc-result");
    const adults = parseInt($("#calc-adults").value, 10), kids = parseInt($("#calc-kids").value, 10);
    out.classList.remove("show");
    if (isNaN(adults) || isNaN(kids) || adults < 0 || kids < 0 || adults + kids === 0) {
      err.textContent = "Please enter at least one adult or child (numbers of 0 or more).";
      return;
    }
    err.textContent = "";
    const e = events.find((x) => x.id === parseInt(select.value, 10));
    const intl = form.visitor.value === "intl";
    const price = intl ? e.intl : e.local;
    const total = adults * price + kids * price * 0.5;
    out.textContent = `${e.name}: ${adults} adult(s) and ${kids} child(ren) = ${money(total, intl)}`;
    out.classList.add("show");
  });
})();

// Option D: show / hide answers (About page)
$$(".faq button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const open = answer.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    btn.querySelector("span").textContent = open ? "－" : "＋";
  });
});

// Option I: gallery lightbox (changes the image shown when a photo is clicked)
(function lightbox() {
  const box = $("#lightbox");
  if (!box) return;
  $$("#gallery figure").forEach((fig) => {
    fig.addEventListener("click", () => {
      const img = fig.querySelector("img");
      $("#lightbox-img").src = img.src;
      $("#lightbox-img").alt = img.alt;
      $("#lightbox-cap").textContent = img.alt;
      box.showModal();
    });
  });
  $("#lightbox-close").addEventListener("click", () => box.close());
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
})();

// Option C + Task 5: contact form validation with error messages, Option J: confirmation alert
(function contactForm() {
  const form = $("#contact-form");
  if (!form) return;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const rules = {
    name: (v) => (v.length < 2 ? "Please enter your name (at least 2 characters)." : ""),
    email: (v) => (v === "" ? "Email address is required." : !emailPattern.test(v) ? "Enter a valid email address, e.g. name@example.com." : ""),
    subject: (v) => (v.length < 3 ? "Please enter a subject." : ""),
    message: (v) => (v.length < 10 ? "Your message must be at least 10 characters." : "")
  };
  function check(field) {
    const input = form.elements[field];
    const msg = rules[field](input.value.trim());
    $("#" + field + "-err").textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return msg === "";
  }
  Object.keys(rules).forEach((f) => form.elements[f].addEventListener("blur", () => check(f)));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = Object.keys(rules).map(check);   // runs every check so all errors show
    if (results.includes(false)) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    const name = form.elements.name.value.trim();
    $("#form-success").textContent = `Thank you, ${name}. Your message has been sent and we will reply within one working day.`;
    $("#form-success").classList.add("show");
    alert("Message sent successfully!");
    form.reset();
  });
})();
