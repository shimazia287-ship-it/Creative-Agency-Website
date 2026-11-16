// ISrat Creative Agency — navigation, reveal, parallax and small interactions
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("open", !isOpen);
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal content as it enters the viewport.
  const revealTargets = document.querySelectorAll(
    ".trusted, .section-heading, .service-list, .service-feature, .number-item, .project-card, .manifesto-copy, .team-card, .journal-panel, .newsletter"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("is-visible"));
  }

  // Subtle parallax movement on larger screens.
  const parallaxItems = document.querySelectorAll(".parallax");
  let ticking = false;
  const updateParallax = () => {
    if (window.innerWidth > 650 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      parallaxItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const speed = Number(item.dataset.speed || 0.1);
        const offset = (rect.top - window.innerHeight / 2) * speed * -0.12;
        item.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    } else {
      parallaxItems.forEach(item => item.style.transform = "");
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", updateParallax);
  updateParallax();

  // Demo newsletter response (connect a mailing service to collect real signups).
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
      event.preventDefault();
      const message = newsletterForm.querySelector(".newsletter-message");
      message.textContent = "Thanks! The form is ready to connect to your email platform.";
      newsletterForm.reset();
    });
  }
});
