/* ---------- CONFIG ---------- */
const CORRECT_PIN = "120323"; 

/* ---------- ELEMENTS ---------- */
const screens = document.querySelectorAll(".screen");
const greetingScreen = document.getElementById("screen-greeting");
const pinInput = document.getElementById("pin-input");
const unlockBtn = document.getElementById("unlock-btn");
const pinError = document.getElementById("pin-error");
const pinContent = document.querySelector(".pin-content");
const menuButtons = document.querySelectorAll(".menu-btn");
const backButtons = document.querySelectorAll(".back-btn");

/* ---------- SCREEN SWITCHING ---------- */
function showScreen(id) {
  screens.forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }
}

/* ---------- SCREEN 1 -> SCREEN 2 ---------- */
greetingScreen.addEventListener("click", () => {
  // THIS PLAYS THE MUSIC
  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0.4; // 0.4 means 40% volume. You can change this to 0.2 if it's too loud.
    music.play().catch(e => console.log("Audio play blocked by browser"));
  }

  // This switches the screen
  showScreen("screen-pin");
  setTimeout(() => pinInput.focus(), 300);
});

/* ---------- PIN LOGIC ---------- */
function tryUnlock() {
  const entered = pinInput.value.trim();

  if (entered === CORRECT_PIN) {
    pinError.textContent = "";
    pinInput.value = "";
    showScreen("screen-menu");
  } else {
    pinError.textContent = "That's not our date… try again.";
    pinInput.value = "";
    pinInput.focus();
    pinContent.classList.add("shake");
    setTimeout(() => pinContent.classList.remove("shake"), 400);
  }
}

unlockBtn.addEventListener("click", tryUnlock);

pinInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") tryUnlock();
});

pinInput.addEventListener("input", () => {
  pinInput.value = pinInput.value.replace(/\D/g, "").slice(0, 6);
});

/* ---------- SCREEN 3 -> SCREENS 4 & 5 ---------- */
menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.target);
  });
});

/* ---------- BACK BUTTONS ---------- */
backButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.target);
  });
});
