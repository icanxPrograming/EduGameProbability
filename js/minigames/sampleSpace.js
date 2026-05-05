// js/minigames/sampleSpace.js

export class SampleSpaceGame {
  constructor(player) {
    this.player = player;
    this.isActive = false;
    this.currentLevel = 0;
    this.score = 0;
    this.lives = 100; // Stamina awal
    this.collectedItems = new Set();
    this.items = [];
    this.spawnInterval = null;

    this.levels = [
      {
        title: "Koin Tunggal",
        target: ["ANGKA", "GAMBAR"],
        fallSpeed: 2,
        playerSpeed: 5,
        instruction: "Kumpulkan Ruang Sampel 1 Koin!",
      },
      {
        title: "Dadu Adil",
        target: ["1", "2", "3", "4", "5", "6"],
        fallSpeed: 3,
        playerSpeed: 6,
        instruction: "Kumpulkan Ruang Sampel 1 Dadu!",
      },
      {
        title: "Dua Koin",
        target: ["AA", "AG", "GA", "GG"],
        fallSpeed: 4,
        playerSpeed: 7,
        instruction: "Kumpulkan Ruang Sampel 2 Koin!",
      },
    ];

    // Inisialisasi Audio
    this.sounds = {
      correct: new Audio("assets/audio/correctItem.mp3"),
      wrong: new Audio("assets/audio/wrongItem.mp3"),
      win: new Audio("assets/audio/winGames.mp3"),
      lose: new Audio("assets/audio/loseGames.mp3"),
    };

    // Set volume agar tidak terlalu keras
    Object.values(this.sounds).forEach((s) => (s.volume = 0.4));
  }

  start(onComplete) {
    this.isActive = true;
    this.onComplete = onComplete;
    this.currentLevel = 0;
    this.score = 0;
    this.lives = 100;
    this.collectedItems.clear();

    this.createUI();
    this.nextLevel();
    this.gameLoop();
  }

  createUI() {
    const gameUI = document.getElementById("game");

    // Bersihkan UI lama jika ada (untuk retry)
    const oldUI = document.getElementById("minigame-ui-wrapper");
    if (oldUI) oldUI.remove();

    const uiWrapper = document.createElement("div");
    uiWrapper.id = "minigame-ui-wrapper";
    uiWrapper.innerHTML = `
      <div id="mission-info">
        <div class="mission-header">MISI: <span id="current-level-title"></span></div>
        <div id="target-list"></div>
      </div>
      <div class="stamina-container">
        <div class="stamina-label">STAMINA JACKOWI</div>
        <div class="stamina-bar-bg">
          <div id="stamina-fill"></div>
        </div>
      </div>
    `;
    gameUI.appendChild(uiWrapper);
  }

  updateMissionUI() {
    const level = this.levels[this.currentLevel];
    document.getElementById("current-level-title").textContent = level.title;

    const targetList = document.getElementById("target-list");
    targetList.innerHTML = level.target
      .map(
        (item) => `
      <span class="target-item ${this.collectedItems.has(item) ? "checked" : ""}">
        ${item}
      </span>
    `,
      )
      .join("");
  }

  nextLevel() {
    if (this.currentLevel < this.levels.length) {
      this.collectedItems.clear();
      const level = this.levels[this.currentLevel];
      this.player.speed = level.playerSpeed;

      this.updateMissionUI();
      this.startSpawning();
    } else {
      this.finishGame();
    }
  }

  startSpawning() {
    if (this.spawnInterval) clearInterval(this.spawnInterval);
    this.spawnInterval = setInterval(() => {
      if (!this.isActive) return;
      this.createFallingObject();
    }, 1500);
  }

  createFallingObject() {
    const level = this.levels[this.currentLevel];
    const trash = ["ZONK", "SALAH", "?", "X", "BAD"];
    const allPossible = [...level.target, ...trash];
    const text = allPossible[Math.floor(Math.random() * allPossible.length)];

    const obj = document.createElement("div");
    obj.className = "falling-item neo-brutal-item";
    obj.textContent = text;
    obj.style.left = `${Math.random() * 80 + 10}%`;
    obj.style.top = "-50px";

    document.getElementById("game").appendChild(obj);
    this.items.push({ element: obj, text: text, y: -50 });
  }

  gameLoop() {
    if (!this.isActive) return;

    const currentLevelData = this.levels[this.currentLevel];
    const currentFallSpeed = currentLevelData ? currentLevelData.fallSpeed : 3;

    this.items.forEach((item, index) => {
      item.y += currentFallSpeed;
      item.element.style.top = `${item.y}px`;

      const pRect = document.getElementById("player").getBoundingClientRect();
      const iRect = item.element.getBoundingClientRect();

      if (this.isColliding(pRect, iRect)) {
        this.handleCatch(item, index);
      }

      if (item.y > window.innerHeight) {
        item.element.remove();
        this.items.splice(index, 1);
      }
    });

    requestAnimationFrame(() => this.gameLoop());
  }

  isColliding(r1, r2) {
    return !(
      r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top
    );
  }

  handleCatch(item, index) {
    const level = this.levels[this.currentLevel];

    if (
      level.target.includes(item.text) &&
      !this.collectedItems.has(item.text)
    ) {
      // BENAR
      this.sounds.correct.currentTime = 0;
      this.sounds.correct.play();

      this.collectedItems.add(item.text);
      this.updateMissionUI();
      item.element.style.background = "#4caf50";

      if (this.collectedItems.size === level.target.length) {
        this.currentLevel++;
        setTimeout(() => this.nextLevel(), 1000);
      }
    } else {
      // SALAH
      this.sounds.wrong.currentTime = 0;
      this.sounds.wrong.play();

      this.lives -= 20; // Kurangi stamina
      this.updateStaminaUI();

      document.getElementById("game").classList.add("screen-shake");
      setTimeout(
        () => document.getElementById("game").classList.remove("screen-shake"),
        300,
      );

      if (this.lives <= 0) {
        this.gameOver();
      }
    }

    item.element.remove();
    this.items.splice(index, 1);
  }

  updateStaminaUI() {
    const fill = document.getElementById("stamina-fill");
    if (fill) fill.style.width = `${this.lives}%`;
  }

  gameOver() {
    this.isActive = false;
    clearInterval(this.spawnInterval);
    this.sounds.lose.play();

    const failOverlay = document.createElement("div");
    failOverlay.id = "minigame-fail-overlay";
    failOverlay.innerHTML = `
      <div class="fail-card">
        <h2>MISI GAGAL!</h2>
        <p>Jackowi kehabisan energi untuk berpikir...</p>
        <button id="btn-retry-minigame">COBA LAGI</button>
      </div>
    `;
    document.getElementById("game").appendChild(failOverlay);

    document.getElementById("btn-retry-minigame").onclick = () => {
      failOverlay.remove();
      this.start(this.onComplete);
    };
  }

  finishGame() {
    this.isActive = false;
    clearInterval(this.spawnInterval);
    this.sounds.win.play();

    this.items.forEach((item) => {
      item.element.style.transition = "opacity 0.5s ease";
      item.element.style.opacity = "0";
      setTimeout(() => {
        if (item.element.parentNode) item.element.remove();
      }, 500);
    });
    this.items = [];

    const ui = document.getElementById("minigame-ui-wrapper");
    if (ui) ui.remove();

    if (this.onComplete) this.onComplete();
  }
}
