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

document.addEventListener("DOMContentLoaded", function () {
  shuffleGifts();

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