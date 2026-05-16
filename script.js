
const config = {
  cta: {
    text: "Contact Us",
    link: "contact.html"
  }
};

const navItems = [
  { name: "Home", link: "index.html" },
  { name: "About", link: "about.html" },
  { name: "Services", link: "service.html" },
  { name: "Projects", link: "projects.html" },
];

const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");

/* =========================
   BUILD NAV
========================= */
function buildNav() {
  let html = "";

  navItems.forEach(item => {
    html += `<a href="${item.link}" class="nav-item">${item.name}</a>`;
  });

  html += `<a href="${config.cta.link}" class="cta-btn">${config.cta.text}</a>`;

  navLinks.innerHTML = html;
}

buildNav();

/* =========================
   ACTIVE PAGE DETECTION (ROBUST)
========================= */
function setActivePage() {
  let current = window.location.pathname.split("/").pop();

  if (!current || current === "") {
    current = "index.html";
  }
  
const navItems = document.querySelectorAll(".nav-links a.nav-item");

let currentPage = window.location.pathname.split("/").pop();

if (!currentPage || currentPage === "/") {
  currentPage = "index.html";
}

navItems.forEach(link => {
  const href = link.getAttribute("href");

  if (href === currentPage) {
    link.classList.add("active");
  }
});

  document.querySelectorAll(".nav-item").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
}

setActivePage();

/* =========================
   MOBILE MENU
========================= */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});



const counters = document.querySelectorAll(".count");

const runCounter = (entry) => {
  if (!entry.isIntersecting) return;

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const step = target / 80;

    const update = () => {
      if (count < target) {
        count += step;
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(runCounter);
}, { threshold: 0.5 });

document.querySelectorAll(".stat-box").forEach(el => {
  observer.observe(el);
});



const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e) {

  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value;

  const whatsappMessage = `
*NEW CUSTOMER ENQUIRY*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}

*Service Needed:* ${service}

*Message:*
${message}
`;

  const whatsappURL =
`whatsapp://send?phone=233240925227&text=${encodeURIComponent(whatsappMessage)}`;

  window.location.href = whatsappURL;

});

