// js/ui/buttonUI.js

// export function createStartButton(containerId, onClick) {
//   const container = document.getElementById(containerId);
//   const btn = document.createElement("button");
//   btn.id = "start-game-btn";
//   btn.textContent = "MULAI PERJALANAN";
//   btn.className = "main-start-btn";

//   btn.addEventListener("click", () => {
//     if (onClick) onClick();
//   });

//   container.appendChild(btn);
//   return btn;
// }

export function toggleControlButtons(show) {
  const controls = document.getElementById("controls");
  controls.style.display = show ? "flex" : "none";
}

// FUNGSI BARU: Inisialisasi Menu Tambahan
// export function initMenuSystem() {
//   const modal = document.getElementById("info-modal");
//   const modalBody = document.getElementById("modal-body");
//   const closeModal = document.querySelector(".close-modal");
//   const btnAudio = document.getElementById("btn-audio");
//   const btnTutorial = document.getElementById("btn-tutorial");
//   const btnMateri = document.getElementById("btn-materi");

//   // 1. Logika Audio
//   let isAudioOn = true;
//   btnAudio.addEventListener("click", () => {
//     isAudioOn = !isAudioOn;
//     btnAudio.textContent = isAudioOn ? "🔊 Audio: ON" : "🔈 Audio: OFF";
//     // Jika ada musik: isAudioOn ? music.play() : music.pause();
//   });

//   // 2. Logika Tutorial
//   btnTutorial.addEventListener("click", () => {
//     modalBody.innerHTML = `
//       <h2 style="color: #4caf50; border-bottom: 2px solid #000;">📖 Tutorial</h2>
//       <ul style="text-align: left; list-style: none; padding: 0; line-height: 2;">
//         <li>🎮 <b>Bergerak:</b> Gunakan <b>A / D</b>, <b>Panah</b>, atau <b>Tombol UI</b>.</li>
//         <li>💬 <b>Dialog:</b> Klik <b>Lanjut</b> untuk membaca cerita Jackowi.</li>
//         <li>🧩 <b>Misi:</b> Lewati setiap stage dengan memahami konsep Peluang.</li>
//         <li>🏠 <b>Tujuan:</b> Bantu Jackowi pulang dan klaim Sertifikatmu!</li>
//       </ul>
//     `;
//     modal.style.display = "flex";
//   });

//   // 3. Logika Materi
//   btnMateri.addEventListener("click", () => {
//     modalBody.innerHTML = `
//       <h2 style="color: #2196f3; border-bottom: 2px solid #000;">🧠 Konsep Peluang</h2>
//       <div style="text-align: left; font-size: 0.9rem;">
//         <p><b>1. Ruang Sampel (S):</b> Himpunan semua hasil yang mungkin.</p>
//         <p><b>2. Titik Sampel:</b> Anggota-anggota dari Ruang Sampel.</p>
//         <p><b>3. Frekuensi Harapan:</b> Rumusnya $Fh(A) = P(A) \times n$</p>
//       </div>
//     `;
//     modal.style.display = "flex";
//   });

//   // Menutup Modal
//   if (closeModal) {
//     closeModal.onclick = () => (modal.style.display = "none");
//   }
//   window.onclick = (event) => {
//     if (event.target == modal) modal.style.display = "none";
//   };
// }
