// js/minigames/samplePoint.js
import { SampleSpaceGame } from "./sampleSpace.js";

export class SamplePointGame extends SampleSpaceGame {
  constructor(player) {
    super(player);
    this.setupRandomLevels();
  }

  setupRandomLevels() {
    // 1. Acak misi untuk Koin (Angka atau Gambar)
    const coinOptions = [
      { target: ["ANGKA"], instruction: "Tangkap titik sampel 'ANGKA'!" },
      { target: ["GAMBAR"], instruction: "Tangkap titik sampel 'GAMBAR'!" },
    ];
    const chosenCoin =
      coinOptions[Math.floor(Math.random() * coinOptions.length)];

    // 2. Acak misi untuk Dadu (Genap, Ganjil, atau Prima)
    const diceOptions = [
      { target: ["2", "4", "6"], instruction: "Tangkap angka GENAP!" },
      { target: ["1", "3", "5"], instruction: "Tangkap angka GANJIL!" },
      { target: ["3", "6"], instruction: "Tangkap angka KELIPATAN 3!" },
      { target: ["4", "5", "6"], instruction: "Tangkap angka LEBIH DARI 3!" },
    ];
    const chosenDice =
      diceOptions[Math.floor(Math.random() * diceOptions.length)];

    // 3. Acak misi untuk Dua Koin (Kembar, Beda, atau Minimal 1 Angka)
    const doubleCoinOptions = [
      { target: ["AA", "GG"], instruction: "Tangkap hasil yang KEMBAR!" },
      { target: ["AG", "GA"], instruction: "Tangkap hasil yang BERBEDA!" },
      {
        target: ["AA", "AG", "GA"],
        instruction: "Tangkap hasil MINIMAL 1 ANGKA!",
      },
    ];
    const chosenDouble =
      doubleCoinOptions[Math.floor(Math.random() * doubleCoinOptions.length)];

    this.levels = [
      {
        title: "Titik Sampel Koin",
        target: chosenCoin.target,
        instruction: chosenCoin.instruction,
        allPoints: ["ANGKA", "GAMBAR"],
        fallSpeed: 2.5,
        playerSpeed: 3.5,
      },
      {
        title: "Titik Sampel Dadu",
        target: chosenDice.target,
        instruction: chosenDice.instruction,
        allPoints: ["1", "2", "3", "4", "5", "6"],
        fallSpeed: 3.5,
        playerSpeed: 4.5,
      },
      {
        title: "Kombinasi 2 Koin",
        target: chosenDouble.target,
        instruction: chosenDouble.instruction,
        allPoints: ["AA", "AG", "GA", "GG"],
        fallSpeed: 4.5,
        playerSpeed: 5.5,
      },
    ];
  }

  // Tetap gunakan override createFallingObject agar semua opsi muncul
  createFallingObject() {
    const level = this.levels[this.currentLevel];
    const pool = [...level.allPoints, "ZONK"];
    const text = pool[Math.floor(Math.random() * pool.length)];

    const obj = document.createElement("div");
    obj.className = "falling-item neo-brutal-item";
    obj.textContent = text;
    obj.style.left = `${Math.random() * 80 + 10}%`;
    obj.style.top = "-50px";

    document.getElementById("game").appendChild(obj);
    this.items.push({ element: obj, text: text, y: -50 });
  }

  handleCatch(item, index) {
    const level = this.levels[this.currentLevel];

    if (level.target.includes(item.text)) {
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
      this.sounds.wrong.currentTime = 0;
      this.sounds.wrong.play();

      this.lives -= 20;
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
}
