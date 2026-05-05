// js/minigames/expectedFrequency.js
import { SampleSpaceGame } from "./sampleSpace.js";

export class ExpectedFrequencyGame extends SampleSpaceGame {
  constructor(player) {
    super(player);
    this.heldItems = 0; // Jumlah benda yang sedang dibawa
    this.setupExpectedLevels();
  }

  setupExpectedLevels() {
    this.levels = [
      {
        title: "Harapan Mata Dadu 6",
        question: "Dadu dilempar 12x. Harapan muncul mata 6?",
        target: 2, // (1/6 * 12)
        // Tambahkan pool agar tidak error 'not iterable' saat spawning
        pool: ["1", "2", "3", "4", "5", "6"],
        fallSpeed: 2.5,
        playerSpeed: 4,
      },
      {
        title: "Harapan Koin Angka",
        question: "Koin dilempar 50x. Harapan muncul Angka?",
        target: 25, // (1/2 * 50)
        pool: ["ANGKA", "GAMBAR"],
        fallSpeed: 3.5,
        playerSpeed: 5,
      },
    ];
  }

  // OVERRIDE: Gunakan 'pool' untuk spawning agar tidak terjadi error pada level.target
  createFallingObject() {
    const level = this.levels[this.currentLevel];
    if (!level) return;

    // Pilih teks acak dari array pool
    const text = level.pool[Math.floor(Math.random() * level.pool.length)];

    const obj = document.createElement("div");
    obj.className = "falling-item neo-brutal-item";
    obj.textContent = text;
    obj.style.left = `${Math.random() * 80 + 10}%`;
    obj.style.top = "-50px";

    document.getElementById("game").appendChild(obj);
    this.items.push({ element: obj, text: text, y: -50 });
  }

  // Override createUI untuk menampilkan instruksi perhitungan
  updateMissionUI() {
    const level = this.levels[this.currentLevel];
    if (!level) return;

    document.getElementById("current-level-title").textContent = level.title;
    document.getElementById("target-list").innerHTML = `
      <div style="font-size: 0.8rem; margin-bottom: 5px; font-family: ui-monospace, monospace;">
        ${level.question}
      </div>
      <div class="counter-display" style="font-family: ui-monospace, monospace; font-weight: bold;">
        DIBAWA: <span id="held-count" style="font-size: 1.2rem; color: #ff5722;">${this.heldItems}</span> 
        / ${level.target}
      </div>
    `;
  }

  handleCatch(item, index) {
    const level = this.levels[this.currentLevel];
    if (!level) return;

    // Tambahkan jumlah benda yang dibawa
    this.heldItems++;
    this.sounds.correct.currentTime = 0;
    this.sounds.correct.play();
    this.updateMissionUI();

    // Logika Overload: Jika melebihi target
    if (this.heldItems > level.target) {
      this.sounds.wrong.play();
      this.lives -= 20;
      this.heldItems = 0; // Reset hitungan benda
      this.updateStaminaUI();
      this.updateMissionUI();

      document.getElementById("game").classList.add("screen-shake");
      setTimeout(() => {
        document.getElementById("game").classList.remove("screen-shake");
      }, 300);

      if (this.lives <= 0) this.gameOver();
    }

    // Cek jika jumlah sudah tepat
    if (this.heldItems === level.target) {
      document.getElementById("held-count").style.color = "#4caf50";

      // Jeda otomatis untuk naik level tanpa perlu berjalan ke ujung
      setTimeout(() => {
        // Pastikan pemain tidak menangkap benda lain saat jeda (masih tepat target)
        if (this.isActive && this.heldItems === level.target) {
          this.currentLevel++;
          this.heldItems = 0;
          this.nextLevel();
        }
      }, 1500);
    }

    item.element.remove();
    this.items.splice(index, 1);
  }
}
