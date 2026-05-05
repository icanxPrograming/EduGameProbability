import { setMapTheme } from "../core/scrollManager.js";
import { initDialog } from "../ui/dialogBox.js";
import { SampleSpaceGame } from "../minigames/sampleSpace.js";
import { setPlayerControl, updateSprite } from "./introScene.js";
import { toggleArrow } from "../ui/buttonUI.js";

export function initStage1(playerState, onComplete) {
  // 1. Reset posisi player ke awal stage
  playerState.x = 20;
  playerState.direction = "right"; // Pastikan menghadap kanan
  playerState.isMoving = false; // Pastikan dalam keadaan diam

  const playerElem = document.getElementById("player");
  if (playerElem) {
    playerElem.style.left = playerState.x + "px"; // Update posisi DOM
    updateSprite(); // Update frame gambar agar tidak "berjalan di tempat"
  }

  setMapTheme("stage1");
  toggleArrow(false);

  const dialogs = [
    {
      name: "JACKOWI",
      text: "Wah, lingkungannya berubah! Sepertinya kita sampai di wilayah Ruang Sampel.",
    },
    {
      name: "JACKOWI",
      text: "Ruang Sampel (S) adalah himpunan dari semua hasil yang mungkin muncul dari suatu percobaan.",
    },
    {
      name: "JACKOWI",
      text: "Misalnya, jika kita melempar satu koin, Ruang Sampelnya adalah {Angka, Gambar}.",
    },
    {
      name: "JACKOWI",
      text: "Ayo bantu aku mengumpulkan semua Ruang Sampel di sini!",
    },
  ];

  // 3. Jalankan dialog pembuka stage
  initDialog(dialogs, () => {
    document.getElementById("dialog-box").style.display = "none";

    setPlayerControl(true);

    // 4. Inisialisasi dan Mulai Minigame
    const minigame = new SampleSpaceGame(playerState);

    minigame.start(() => {
      // Callback ini berjalan saat minigame SELESAI (Level 3 beres)
      playerState.speed = 2;
      setPlayerControl(false);
      toggleArrow(true);

      // Dialog penutup stage
      const successDialog = [
        {
          name: "JACKOWI",
          text: "Hebat! Kamu berhasil mengumpulkan semua Ruang Sampel.  Wilayah selanjutnya telah terbuka! Ayo kita lanjutkan perjalanan!",
        },
      ];

      initDialog(successDialog, () => {
        document.getElementById("dialog-box").style.display = "none";
        setPlayerControl(true);
        // Beritahu main.js bahwa stage 1 benar-benar selesai
        if (onComplete) onComplete();
      });
    });
  });
}
