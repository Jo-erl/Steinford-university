// SLIDESHOW FUNCTIONALITY
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(n) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

setInterval(nextSlide, 3000);

///////////////////////////////////////////////////////////////
// MOBILE NAV
const hamburger = document.querySelector(".hamburger");
const navItems = document.querySelector(".nav-items");
const closeBtn = document.querySelector(".close-btn");

hamburger.addEventListener("click", () => {
  navItems.classList.add("active");
  closeBtn.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  navItems.classList.remove("active");
  closeBtn.style.display = "none";
});

document.querySelectorAll(".nav-items a").forEach((n) =>
  n.addEventListener("click", () => {
    navItems.classList.remove("active");
    closeBtn.style.display = "none";
  })
);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeBtn.style.display = "none";
  }
});

///////////////////////////////////////////////////////////////
// STICKY NAV
let lastScrollTop = 0;
const nav = document.querySelector("nav");
const navPlaceholder = document.querySelector(".nav-placeholder");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    nav.style.transform = `translateY(-100%)`;
  } else {
    // Scrolling up
    nav.style.transform = `translateY(0)`;
    if (scrollTop > nav.offsetHeight) {
      nav.classList.add("sticky");
      navPlaceholder.style.height = `${nav.offsetHeight}px`;
    } else {
      nav.classList.remove("sticky");
      navPlaceholder.style.height = "0";
    }
  }

  lastScrollTop = scrollTop;
});

///////////////////////////////////////////////////////////////
const counters = document.querySelectorAll(".count");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statsItems = entry.target.querySelectorAll(".count");
        statsItems.forEach((counter) => {
          counter.innerText = "0";

          const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;

            const increment = target / 200;

            if (count < target) {
              counter.innerText = `${Math.ceil(count + increment)}`;
              setTimeout(updateCounter, 10);
            } else {
              counter.innerText = target;
            }
          };

          updateCounter();
        });

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

const statsSection = document.querySelector("#stats");
observer.observe(statsSection);

/////////////////////////////////////////////////////////////
// BACK TO TOP
const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/////////////////////////////////////////////////////////////
// VIDEO BANNER
document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("background-video");
  video.muted = true;
  video.play().catch(function (error) {
    console.log("Autoplay was prevented:", error);
  });
});
