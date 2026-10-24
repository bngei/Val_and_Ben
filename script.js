// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => links.classList.remove("open"));
    });
  }

  // Live days / hours / minutes / seconds counter, started Jan 13, 2026
  const start = new Date(2026, 0, 13); // Jan 13, 2026, midnight local time

  const ctDays = document.getElementById("ct-days");
  const ctHours = document.getElementById("ct-hours");
  const ctMinutes = document.getElementById("ct-minutes");
  const ctSeconds = document.getElementById("ct-seconds");

  if (ctDays && ctHours && ctMinutes && ctSeconds) {
    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function tickCounter() {
      const now = new Date();
      let diff = Math.max(0, now - start); // ms

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);

      ctDays.textContent = days.toLocaleString();
      ctHours.textContent = pad(hours);
      ctMinutes.textContent = pad(minutes);
      ctSeconds.textContent = pad(seconds);
    }

    tickCounter();
    setInterval(tickCounter, 1000);
  }

  // Years / months / days breakdown in the About section
  const breakdownEls = {
    years: document.getElementById("bd-years"),
    months: document.getElementById("bd-months"),
    days: document.getElementById("bd-days"),
  };

  if (breakdownEls.years) {
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    breakdownEls.years.textContent = Math.max(0, years);
    breakdownEls.months.textContent = Math.max(0, months);
    breakdownEls.days.textContent = Math.max(0, days);
  }
});
