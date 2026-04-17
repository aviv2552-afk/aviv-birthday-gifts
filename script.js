const SITE_EXPIRY_DATE = new Date(2026, 3, 12, 0, 0, 0);

function showIdError() {
  const input = document.getElementById("idInput");
  const error = document.getElementById("errorMessage");

  if (!input || !error) return;

  error.classList.add("show");
  input.classList.add("input-error");
}

function hideIdError() {
  const input = document.getElementById("idInput");
  const error = document.getElementById("errorMessage");

  if (!input || !error) return;

  error.classList.remove("show");
  input.classList.remove("input-error");
}

function goNext() {
  const input = document.getElementById("idInput");
  if (!input) return;

  const value = input.value.trim();

  if (value.length < 9) {
    showIdError();
    return;
  }

  hideIdError();
  window.location.href = "gifts.html";
}

function goToPage(url) {
  window.location.href = url;
}

function goBack() {
  window.location.href = "gifts.html";
}

function shuffleGifts() {
  const grid = document.querySelector(".grid");
  if (!grid) return;

  const gifts = Array.from(grid.querySelectorAll(".gift"));

  const priorityGifts = gifts.filter(gift => gift.dataset.priority === "true");
  const regularGifts = gifts.filter(gift => gift.dataset.priority !== "true");

  for (let i = regularGifts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [regularGifts[i], regularGifts[j]] = [regularGifts[j], regularGifts[i]];
  }

  grid.innerHTML = "";

  priorityGifts.forEach(gift => grid.appendChild(gift));
  regularGifts.forEach(gift => grid.appendChild(gift));
}

function filterGifts(category, event) {
  const gifts = document.querySelectorAll(".gift");
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach(tab => tab.classList.remove("active"));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  gifts.forEach(gift => {
    const categories = gift.getAttribute("data-category").split(" ");

    if (
      category === "all" ||
      categories.includes("all") ||
      categories.includes(category)
    ) {
      gift.style.display = "flex";
    } else {
      gift.style.display = "none";
    }
  });

  shuffleGifts();
}

function createCountdownWidget() {
  if (document.getElementById("countdownWidget")) return;

  const widget = document.createElement("div");
  widget.id = "countdownWidget";
  widget.className = "countdown-widget";

  const isLandingPage = document.body.classList.contains("landing-page");

  widget.innerHTML = `
    ${!isLandingPage ? `<button class="countdown-close" onclick="closeCountdown()" aria-label="סגור">×</button>` : ``}
    <p class="countdown-title" id="countdownTitle">האתר ישמיד את עצמו בעוד</p>
    <div class="countdown-time" id="countdownTime">
      <div class="countdown-box">
        <span class="countdown-value" id="countdownDays">00</span>
        <span class="countdown-label">ימים</span>
      </div>
      <div class="countdown-box">
        <span class="countdown-value" id="countdownHours">00</span>
        <span class="countdown-label">שעות</span>
      </div>
      <div class="countdown-box">
        <span class="countdown-value" id="countdownMinutes">00</span>
        <span class="countdown-label">דקות</span>
      </div>
      <div class="countdown-box">
        <span class="countdown-value" id="countdownSeconds">00</span>
        <span class="countdown-label">שניות</span>
      </div>
    </div>
  `;

  document.body.appendChild(widget);
}

function updateCountdownWidget() {
  const titleEl = document.getElementById("countdownTitle");
  const timeEl = document.getElementById("countdownTime");
  const daysEl = document.getElementById("countdownDays");
  const hoursEl = document.getElementById("countdownHours");
  const minutesEl = document.getElementById("countdownMinutes");
  const secondsEl = document.getElementById("countdownSeconds");

  if (!titleEl || !timeEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  let diff = SITE_EXPIRY_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    titleEl.textContent = "הזמן נגמר 😈";
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  titleEl.textContent = "האתר ישמיד את עצמו בעוד";

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  const days = Math.floor(diff / oneDay);
  const hours = Math.floor((diff % oneDay) / oneHour);
  const minutes = Math.floor((diff % oneHour) / oneMinute);
  const seconds = Math.floor((diff % oneMinute) / oneSecond);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

function startCountdownWidget() {
  createCountdownWidget();
  updateCountdownWidget();
  setInterval(updateCountdownWidget, 1000);
}

function closeCountdown() {
  const widget = document.getElementById("countdownWidget");
  if (widget) {
    widget.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  shuffleGifts();
  startCountdownWidget();

  const input = document.getElementById("idInput");

  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        goNext();
      }
    });

    input.addEventListener("input", function () {
      hideIdError();
    });
  }
});