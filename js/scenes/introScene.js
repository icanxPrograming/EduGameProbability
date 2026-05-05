import { setMapTheme, adjustPlayerPosition } from "../core/scrollManager.js";
import { initDialog } from "../ui/dialogBox.js";
import { triggerEnding } from "./endingScene.js";
// Import Scene lainnya
import { initStage1 } from "./stage1Scene.js";
import { initStage2 } from "./stage2Scene.js";
import { initStage3 } from "./stage3Scene.js";

const player = document.getElementById("player");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

const config = {
  width: 96,
  height: 96,
  totalFrames: 3,
  animSpeed: 120,
  moveSpeed: 2,
};

let currentStage = "intro";
let state = {
  frame: 1,
  direction: "right",
  isMoving: false,
  x: 120,
  keys: {},
  canMove: false,
};

export function updateSprite() {
  const row = state.direction === "right" ? 2 : 1;
  const currentFrame = state.isMoving ? state.frame : 1;
  player.style.backgroundPosition = `-${currentFrame * config.width}px -${row * config.height}px`;
}

export function setPlayerControl(value) {
  state.canMove = value;
  if (!value) {
    state.isMoving = false;
    updateSprite();
  }
}

function handleStageTransition() {
  // Matikan kontrol agar tidak terjadi double-trigger saat transisi
  setPlayerControl(false);

  if (currentStage === "intro") {
    currentStage = "stage1";
    // Panggil initStage1 dan berikan callback untuk mengaktifkan kontrol kembali
    initStage1(state, () => setPlayerControl(true));
  } else if (currentStage === "stage1") {
    currentStage = "stage2";
    initStage2(state, () => setPlayerControl(true));
  } else if (currentStage === "stage2") {
    currentStage = "stage3";
    initStage3(state, () => setPlayerControl(true));
  } else if (currentStage === "stage3") {
    // Pemicu ending tidak butuh setPlayerControl karena karakter di-hide
    triggerEnding();
  }
}

export function initPlayer() {
  const setKeyState = (key, isDown) => {
    state.keys[key] = isDown;
    if (key === "a" || key === "A" || key === "ArrowLeft") {
      isDown
        ? btnLeft.classList.add("active")
        : btnLeft.classList.remove("active");
    }
    if (key === "d" || key === "D" || key === "ArrowRight") {
      isDown
        ? btnRight.classList.add("active")
        : btnRight.classList.remove("active");
    }
  };

  document.addEventListener("keydown", (e) => setKeyState(e.key, true));
  document.addEventListener("keyup", (e) => setKeyState(e.key, false));

  const handleTouch = (btn, key) => {
    btn.addEventListener("mousedown", () => setKeyState(key, true));
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      setKeyState(key, true);
    });
    window.addEventListener("mouseup", () => setKeyState(key, false));
    window.addEventListener("touchend", () => setKeyState(key, false));
  };

  handleTouch(btnLeft, "a");
  handleTouch(btnRight, "d");

  setInterval(() => {
    if (state.isMoving) {
      state.frame = (state.frame + 1) % config.totalFrames;
      updateSprite();
    }
  }, config.animSpeed);

  function gameLoop() {
    if (state.canMove) {
      let moving = false;
      // Ambil lebar layar terbaru setiap frame untuk responsivitas
      const screenWidth = window.innerWidth;

      // 1. Logika Gerak Kanan
      if (state.keys["d"] || state.keys["D"] || state.keys["ArrowRight"]) {
        state.direction = "right";
        state.x += config.moveSpeed;
        moving = true;

        // Jika hidung karakter keluar layar, pindah stage
        if (state.x > screenWidth) {
          handleStageTransition();
        }
      }
      // 2. Logika Gerak Kiri
      else if (state.keys["a"] || state.keys["A"] || state.keys["ArrowLeft"]) {
        state.direction = "left";
        state.x -= config.moveSpeed;
        moving = true;

        // Mentok layar kiri
        if (state.x < 0) {
          state.x = 0;
        }
      }

      // 3. Sinkronisasi Animasi & Posisi DOM
      if (moving !== state.isMoving) {
        state.isMoving = moving;
        updateSprite();
      }

      // Terapkan posisi ke elemen player
      player.style.left = state.x + "px";
    }

    // Jalankan loop terus menerus
    requestAnimationFrame(gameLoop);
  }

  updateSprite();
  gameLoop();
}
