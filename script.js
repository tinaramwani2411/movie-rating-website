let selectedMovie = null;

const popup = document.getElementById("ratingPopup");
const stars = document.querySelectorAll(".stars span");

// ⭐ PAGE LOAD
window.onload = function () {

  // ⭐ LOAD RATINGS
  document.querySelectorAll(".movie-card").forEach(card => {
    let name = card.querySelector("h4").innerText;
    let saved = localStorage.getItem(name);

    if (saved) {
      card.querySelector(".rating").textContent = saved;
    }
  });

  // ❤️ LOAD FAVORITES
  let favs = JSON.parse(localStorage.getItem("favs")) || [];

  favs.forEach(name => {
    document.querySelectorAll(".movie-card").forEach(card => {
      if (card.querySelector("h4").innerText === name) {

        card.querySelector(".heart").textContent = "❤️";

        addToFav(card);
      }
    });
  });

  // 🔒 ALWAYS HIDE FAVORITES ON LOAD
  document.getElementById("favorites").classList.add("hidden");

  startHero();
};


// ⭐ OPEN POPUP
function openRating(card) {
  selectedMovie = card;
  popup.style.display = "block";
  resetStars();
}

// ⭐ CLOSE POPUP
function closePopup() {
  popup.style.display = "none";
}


// ⭐ STAR EVENTS
stars.forEach((star, index) => {

  star.addEventListener("mouseover", () => {
    stars.forEach((s, i) => {
      s.textContent = i <= index ? "⭐" : "☆";
    });
  });

  star.addEventListener("click", () => {

    let ratingDiv = selectedMovie.querySelector(".rating");
    let name = selectedMovie.querySelector("h4").innerText;

    let result = "";
    for (let i = 0; i <= index; i++) {
      result += "⭐";
    }

    ratingDiv.textContent = result;

    localStorage.setItem(name, result);

    closePopup();
  });

});


// ⭐ RESET STARS
function resetStars() {
  stars.forEach(star => {
    star.textContent = "☆";
  });
}


// ❤️ FAVORITE TOGGLE
function toggleFav(event, btn) {

  event.stopPropagation();

  let card = btn.closest(".movie-card");
  let name = card.querySelector("h4").innerText;

  let favs = JSON.parse(localStorage.getItem("favs")) || [];

  if (btn.textContent === "🤍") {

    btn.textContent = "❤️";

    if (!favs.includes(name)) {
      favs.push(name);
      localStorage.setItem("favs", JSON.stringify(favs));
    }

    addToFav(card);

  } else {

    btn.textContent = "🤍";

    favs = favs.filter(f => f !== name);
    localStorage.setItem("favs", JSON.stringify(favs));

    removeFromFav(name);
  }
}


// ➕ ADD TO FAVORITES (FIXED)
function addToFav(card) {

  let favContainer = document.getElementById("favorites");
  let name = card.querySelector("h4").innerText;

  // prevent duplicate
  let already = [...favContainer.children].some(c =>
    c.querySelector("h4").innerText === name
  );

  if (already) return;

  let clone = card.cloneNode(true);
  clone.removeAttribute("onclick");

  let heart = clone.querySelector(".heart");
  heart.textContent = "❤️";

  heart.onclick = function (e) {
    e.stopPropagation();
    removeFromFav(name);
  };

  favContainer.appendChild(clone);

  // 🔥 KEEP HIDDEN ALWAYS
  favContainer.classList.add("hidden");
}


// ❌ REMOVE FROM FAVORITES
function removeFromFav(name) {

  document.querySelectorAll("#favorites .movie-card").forEach(card => {
    if (card.querySelector("h4").innerText === name) {
      card.remove();
    }
  });

  document.querySelectorAll(".movie-card").forEach(card => {
    if (card.querySelector("h4").innerText === name) {
      card.querySelector(".heart").textContent = "🤍";
    }
  });

  let favs = JSON.parse(localStorage.getItem("favs")) || [];
  favs = favs.filter(f => f !== name);
  localStorage.setItem("favs", JSON.stringify(favs));
}


// 🔍 SEARCH
document.getElementById("search").addEventListener("input", function () {

  let value = this.value.toLowerCase();

  document.querySelectorAll(".movie-card").forEach(card => {

    let name = card.querySelector("h4").innerText.toLowerCase();

    card.style.display = name.includes(value) ? "inline-block" : "none";
  });

});


// 🌙 THEME
function toggleTheme() {

  document.body.classList.toggle("light");

  let btn = document.getElementById("themeBtn");

  btn.textContent = document.body.classList.contains("light") ? "☀" : "🌙";
}


// ❤️ SHOW FAVORITES ONLY ON CLICK
document.getElementById("favToggle").addEventListener("click", () => {
  document.getElementById("favorites").classList.toggle("hidden");
});


// 🎬 HERO SLIDER (SMOOTH)
const heroMovies = [
  "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  "https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
  "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg"
];

function startHero() {

  let i = 0;

  document.getElementById("heroImg").src = heroMovies[0];

  setInterval(() => {
    i = (i + 1) % heroMovies.length;
    document.getElementById("heroImg").src = heroMovies[i];
  }, 2500);
}