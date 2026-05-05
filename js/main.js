// js/main.js
import { setMapTheme, adjustPlayerPosition } from "./core/scrollManager.js";
import { initDialog } from "./ui/dialogBox.js";
import { initPlayer, setPlayerControl } from "./scenes/introScene.js";
import { showIntroPopup } from "./ui/popupInfo.js";
import { toggleControlButtons, toggleArrow } from "./ui/buttonUI.js"; // Tambahkan initMenuSystem

const introDialogs = [
  "Setiap hari, kita dihadapkan pada berbagai kemungkinan.",
  "Melalui perjalanan ini, kamu akan mempelajari konsep peluang.",
  "Siap memulai perjalanan?",
];

const storyDialogs = [
  {
    name: "JACKCOBI",
    text: "Hai kawan, namaku Jackcobi, aku tersesat di dimensi probabilitas ini.",
  },
  { name: "JACKCOBI", text: "Aku tidak tahu jalan pulang ke rumah..." },
  { name: "JACKCOBI", text: "Maukah kamu membantuku kembali?" },
  {
    name: "JACKCOBI",
    text: "Kita harus memecahkan teka-teki Peluang untuk membuka jalan.",
  },
  { name: "JACKCOBI", text: "Ayo kita mulai perjalanannya!" },
];

const surpriseDialog = [
  { name: "JACKCOBI", text: "Waw! Portal apa itu tiba-tiba muncul?!" },
  {
    name: "JACKCOBI",
    text: "Sepertinya itu jalan menuju Hutan Ruang Sampel. Ayo kita masuk!",
  },
];

const bgMusic = new Audio("assets/audio/sfx.mp3");
bgMusic.loop = true; // Agar musik terus berulang
bgMusic.volume = 0.1;

// Fungsi untuk mengontrol audio secara global
export function toggleGlobalAudio(isOn) {
  if (isOn) {
    bgMusic.play().catch((err) => console.warn("Autoplay dicegah:", err));
  } else {
    bgMusic.pause();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Awal
  setMapTheme("intro");
  initPlayer();

  // Standar awal: kontrol mati
  setPlayerControl(false);
  toggleControlButtons(false);
  toggleArrow(false);

  const dialogBox = document.getElementById("dialog-box");

  // 2. Jalankan Dialog Intro (Filosofis)
  initDialog(introDialogs, () => {
    dialogBox.style.display = "none";

    toggleGlobalAudio(true);

    // 3. Munculkan Judul & Menu Utama (Start Overlay)
    showIntroPopup(() => {
      // Jalankan Fullscreen & Orientasi saat tombol Start diklik
      handleOrientation();

      // 4. Jalankan Dialog Cerita (Narasi JACKCOBI)
      initDialog(storyDialogs, () => {
        dialogBox.style.display = "none";

        // AKHIR: Aktifkan gameplay
        setPlayerControl(true);
        toggleControlButtons(true);
        toggleArrow(true);
        console.log("Game dimainkan: JACKCOBI siap berpetualang.");
      });
    });
  });

  // Di dalam main.js
  function handleOrientation() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element
        .requestFullscreen()
        .then(() => {
          // 1. Kunci Orientasi
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock("landscape").catch((err) => {
              console.warn(
                "Orientasi lock gagal, mungkin bukan di mobile:",
                err,
              );
            });
          }

          // 2. SOLUSI LAYOUT: Panggil ulang penyesuaian posisi setelah transisi
          // Gunakan sedikit delay agar browser selesai menghitung dimensi baru
          setTimeout(() => {
            adjustPlayerPosition();
            console.log("Layout dihitung ulang untuk Fullscreen.");
          }, 300);
        })
        .catch((err) => {
          console.warn("Fullscreen diblokir atau gagal:", err);
        });
    }
  }

  window.addEventListener("resize", adjustPlayerPosition);
});
