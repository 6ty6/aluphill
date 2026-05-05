
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

const slides = document.querySelector(".slides");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const projectSlides = document.querySelectorAll(".project-slide");

if (slides && nextBtn && prevBtn && projectSlides.length > 0) {
  const total = projectSlides.length;
  const slider = slides.closest(".projects-slider");
  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.className = "slider-indicators";
  const dots = [];
  let index = 0;

  projectSlides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `Go to project ${idx + 1}`);
    dot.addEventListener("click", () => {
      index = idx;
      update();
    });
    indicatorsContainer.appendChild(dot);
    dots.push(dot);
  });

  if (slider) {
    slider.appendChild(indicatorsContainer);
  }

  function update(){
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    update();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    update();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      index = (index + 1) % total;
      update();
    }
    if (event.key === "ArrowLeft") {
      index = (index - 1 + total) % total;
      update();
    }
  });

  // SWIPE FUNCTIONALITY FOR MOBILE
  let touchStartX = 0;
  let touchEndX = 0;

  slides.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, false);

  slides.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a valid swipe
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swiped left - show next project
        index = (index + 1) % total;
      } else {
        // Swiped right - show previous project
        index = (index - 1 + total) % total;
      }
      update();
    }
  }

  update();
}