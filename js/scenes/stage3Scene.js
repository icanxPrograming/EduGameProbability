// js/scenes/stage3Scene.js
import { setMapTheme } from "../core/scrollManager.js";
import { initDialog } from "../ui/dialogBox.js";
import { ExpectedFrequencyGame } from "../minigames/expectedFreq.js";
import { setPlayerControl, updateSprite } from "./introScene.js";
import { toggleArrow } from "../ui/buttonUI.js";

export function initStage3(playerState, onComplete) {
  // 1. Reset Posisi & Visual
  playerState.x = 20;
  playerState.direction = "right";
  playerState.isMoving = false;
  playerState.speed = 2;

  const playerElem = document.getElementById("player");
  if (playerElem) {
    playerElem.style.left = playerState.x + "px";
    updateSprite();
  }

  // 2. Setup Lingkungan
  setMapTheme("stage3");
  toggleArrow(false); // Kunci jalan sampai target tercapai

  const dialogs = [
    {
      name: "JACKOWI",
      text: "Tantangan terakhir! Kita sampai di zona Frekuensi Harapan.",
    },
    {
      name: "JACKOWI",
      text: "Frekuensi Harapan adalah banyak kejadian yang diharapkan muncul dalam serangkaian percobaan.",
    },
    {
      name: "JACKOWI",
      text: "Rumusnya: Fh(A) = n × P(A). n adalah banyak percobaan.",
    },
    {
      name: "JACKOWI",
      text: "Ambil benda sesuai jumlah harapan yang kuminta. Jangan lebih, jangan kurang!",
    },
  ];

  // 3. Jalankan Dialog
  initDialog(dialogs, () => {
    document.getElementById("dialog-box").style.display = "none";

    // Aktifkan kontrol
    setPlayerControl(true);

    // 4. Inisialisasi Minigame
    const minigame = new ExpectedFrequencyGame(playerState);

    // Mulai Minigame
    minigame.start(() => {
      // Callback ini dipanggil saat semua level Fh selesai
      playerState.speed = 2;
      setPlayerControl(false);
      toggleArrow(true); // Panah muncul, jalan menuju Ending terbuka

      const finalDialog = [
        {
          name: "JACKOWI",
          text: "Luar biasa! Semua perhitungan tepat. Jalan pulang sudah terbuka di sebelah kanan! Ayo kita pulang!",
        },
      ];

      initDialog(finalDialog, () => {
        document.getElementById("dialog-box").style.display = "none";
        setPlayerControl(true);
        if (onComplete) onComplete();
      });
    });
  });
}
