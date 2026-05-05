import { setMapTheme } from "../core/scrollManager.js";
import { initDialog } from "../ui/dialogBox.js";

export function initStage3(playerState, onComplete) {
  playerState.x = 20;
  setMapTheme("stage3");

  const dialogs = [
    {
      name: "JACKOWI",
      text: "Tantangan terakhir! Kita sampai di zona Frekuensi Harapan.",
    },
    {
      name: "JACKOWI",
      text: "Frekuensi Harapan adalah banyak kejadian yang diharapkan muncul dalam serangkaian percobaan.",
    },
    { name: "JACKOWI", text: "Rumusnya: Fh(A) = P(A) × n (Banyak percobaan)." },
    { name: "JACKOWI", text: "Ayo selesaikan ini agar aku bisa pulang!" },
  ];

  initDialog(dialogs, () => {
    document.getElementById("dialog-box").style.display = "none";
    if (onComplete) onComplete();
  });
}
