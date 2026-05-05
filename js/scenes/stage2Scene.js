// js/scenes/stage2Scene.js
import { setMapTheme } from "../core/scrollManager.js";
import { initDialog } from "../ui/dialogBox.js";
import { SamplePointGame } from "../minigames/samplePoint.js";
import { setPlayerControl, updateSprite } from "./introScene.js";
import { toggleArrow } from "../ui/buttonUI.js";

export function initStage2(playerState, onComplete) {
  // 1. Reset Logika Posisi & Arah
  playerState.x = 20;
  playerState.direction = "right";
  playerState.isMoving = false;
  playerState.speed = 2; // Pastikan mulai dengan speed normal

  // 2. PAKSA UPDATE VISUAL DOM
  const playerElem = document.getElementById("player");
  if (playerElem) {
    playerElem.style.left = playerState.x + "px";
    updateSprite();
  }

  // 3. Setup Lingkungan
  setMapTheme("stage2");
  toggleArrow(false);

  const dialogs = [
    {
      name: "JACKOWI",
      text: "Wah, lingkungannya berubah lagi! Kita sekarang berada di wilayah Titik Sampel.",
    },
    {
      name: "JACKOWI",
      text: "Titik Sampel adalah anggota-anggota dari Ruang Sampel secara individu.",
    },
    {
      name: "JACKOWI",
      text: "Jika pada koin Ruang Sampelnya adalah {Angka, Gambar}, maka 'Angka' adalah salah satu Titik Sampelnya.",
    },
    {
      name: "JACKOWI",
      text: "Kali ini lebih sulit! Tangkap Titik Sampel yang spesifik sesuai instruksiku ya!",
    },
  ];

  // 4. Jalankan Dialog Pembuka
  initDialog(dialogs, () => {
    document.getElementById("dialog-box").style.display = "none";

    // Kecepatan diatur oleh class SamplePointGame melalui playerSpeed di tiap level
    setPlayerControl(true);

    // 5. Jalankan Minigame Titik Sampel
    const minigame = new SamplePointGame(playerState);
    minigame.start(() => {
      // --- CALLBACK SAAT MINIGAME SELESAI ---
      playerState.speed = 2; // Reset kecepatan ke normal
      setPlayerControl(false);
      toggleArrow(true); // Izinkan lanjut ke kanan

      const successDialog = [
        {
          name: "JACKOWI",
          text: "Analisis yang hebat! Kamu sudah bisa membedakan Ruang Sampel dan Titik Sampel.",
        },
        {
          name: "JACKOWI",
          text: "Ayo lanjut ke kanan, tantangan terakhir sudah menanti!",
        },
      ];

      initDialog(successDialog, () => {
        document.getElementById("dialog-box").style.display = "none";
        setPlayerControl(true);
        if (onComplete) onComplete();
      });
    });
  });
}
