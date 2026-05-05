import { setMapTheme } from "../core/scrollManager.js";
import { initDialog } from "../ui/dialogBox.js";

export function initStage1(playerState, onComplete) {
  playerState.x = 20;
  setMapTheme("stage1");

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

  initDialog(dialogs, () => {
    document.getElementById("dialog-box").style.display = "none";
    if (onComplete) onComplete();
  });
}
