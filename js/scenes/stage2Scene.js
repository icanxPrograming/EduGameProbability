import { setMapTheme } from "../core/scrollManager.js";
import { initDialog } from "../ui/dialogBox.js";

export function initStage2(playerState, onComplete) {
  playerState.x = 20;
  setMapTheme("stage2");

  const dialogs = [
    { name: "JACKOWI", text: "Sekarang kita berada di wilayah Titik Sampel." },
    {
      name: "JACKOWI",
      text: "Titik Sampel adalah anggota-anggota dari Ruang Sampel.",
    },
    {
      name: "JACKOWI",
      text: "Jika koin tadi dilempar, maka 'Angka' adalah salah satu Titik Sampelnya.",
    },
    {
      name: "JACKOWI",
      text: "Perhatikan sekelilingmu, kumpulkan titik-titik sampel yang tepat!",
    },
  ];

  initDialog(dialogs, () => {
    document.getElementById("dialog-box").style.display = "none";
    if (onComplete) onComplete();
  });
}
