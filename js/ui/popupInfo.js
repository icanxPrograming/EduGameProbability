// js/ui/popupInfo.js
import { toggleGlobalAudio } from "../main.js";

export function showIntroPopup(onConfirm) {
  const overlay = document.getElementById("start-overlay");
  if (!overlay) return;

  overlay.style.display = "flex";

  const startBtn = document.getElementById("start-game-btn");
  const modal = document.getElementById("info-modal");
  const modalBody = document.getElementById("modal-body");
  const closeModal = document.querySelector(".close-modal");

  const btnAudio = document.getElementById("btn-audio");
  const btnTutorial = document.getElementById("btn-tutorial");
  const btnMateri = document.getElementById("btn-materi");

  // --- 1. Logika Audio (Toggle) ---
  let isAudioOn = true;
  btnAudio.onclick = () => {
    isAudioOn = !isAudioOn;
    btnAudio.textContent = isAudioOn ? "🔊 Audio: ON" : "🔈 Audio: OFF";

    // Panggil fungsi kontrol global
    toggleGlobalAudio(isAudioOn);
  };

  // --- 2. Logika Tutorial ---
  btnTutorial.onclick = () => {
    modalBody.innerHTML = `
      <h2 style="color: #4caf50; border-bottom: 2px solid #000;">📖 Tutorial</h2>
      <ul style="text-align: left; list-style: none; padding: 0; line-height: 2;">
        <li>🎮 <b>Bergerak:</b> Gunakan <b>A / D</b> atau <b>Panah</b>.</li>
        <li>💬 <b>Dialog:</b> Klik <b>Lanjut</b> untuk menyimak cerita.</li>
        <li>🧩 <b>Misi:</b> Pahami konsep Peluang di setiap stage.</li>
        <li>🏠 <b>Tujuan:</b> Bantu Jackowi pulang ke rumah!</li>
      </ul>
    `;
    modal.style.display = "flex";
  };

  // --- 3. Logika Materi ---
  btnMateri.onclick = () => {
    modalBody.innerHTML = `
      <h2 style="color: #2196f3; border-bottom: 2px solid #000;">🧠 Konsep Peluang</h2>
      <div style="text-align: left; font-size: 0.9rem;">
        <p><b>1. Ruang Sampel (S):</b> Semua hasil yang mungkin terjadi.</p>
        <p><b>2. Titik Sampel:</b> Anggota dari Ruang Sampel.</p>
        <p><b>3. Frekuensi Harapan:</b> Rumus: $Fh(A) = P(A) \times n$</p>
      </div>
    `;
    modal.style.display = "flex";
  };

  // --- 4. Logika Tutup Modal ---
  if (closeModal) {
    closeModal.onclick = () => (modal.style.display = "none");
  }

  // Klik di luar modal untuk menutup
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // --- 5. Logika Mulai Game ---
  const startHandler = () => {
    overlay.style.display = "none";
    startBtn.removeEventListener("click", startHandler);
    if (onConfirm) onConfirm();
  };

  startBtn.addEventListener("click", startHandler);
}
