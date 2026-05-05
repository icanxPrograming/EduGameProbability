import { setMapTheme } from "../core/scrollManager.js";
import { initDialog } from "../ui/dialogBox.js";

export function triggerEnding() {
  // 1. Ganti Map ke Ending
  setMapTheme("ending");

  // 2. Sembunyikan Player & Kontrol (Karena sudah sampai rumah)
  document.getElementById("player").style.display = "none";
  document.getElementById("controls").style.display = "none";

  const endDialogs = [
    "Lihat! Itu rumahku! Akhirnya aku sampai...",
    "Terima kasih banyak ya, berkat bantuanmu memahami peluang, aku bisa kembali dengan selamat.",
    "Sebagai tanda terima kasih, aku ingin memberikan sertifikat penghargaan untukmu.",
  ];

  initDialog(endDialogs, () => {
    document.getElementById("dialog-box").style.display = "none";
    showCertificateInput();
  });
}

function showCertificateInput() {
  // Munculkan overlay untuk input nama
  const overlay = document.getElementById("start-overlay");
  overlay.style.display = "flex";
  overlay.innerHTML = `
    <div class="overlay-content certificate-input">
      <h2 class="game-title">Selamat!</h2>
      <p style="color: white; margin-bottom: 15px;">Masukkan namamu untuk sertifikat:</p>
      <input type="text" id="player-name-input" placeholder="Nama Anda" maxlength="20">
      <button id="claim-cert-btn" class="main-start-btn" style="margin-top: 20px;">KLAIM SERTIFIKAT</button>
    </div>
  `;

  document.getElementById("claim-cert-btn").addEventListener("click", () => {
    const name =
      document.getElementById("player-name-input").value || "Penjelajah Setia";
    generateDigitalCertificate(name);
  });
}

function generateDigitalCertificate(name) {
  const overlay = document.getElementById("start-overlay");

  overlay.innerHTML = `
    <div class="overlay-content certificate-wrapper">
      <div id="certificate-to-print" class="certificate-card">
        <h3>SERTIFIKAT PENGHARGAAN</h3>
        <p class="cert-sub">Diberikan kepada:</p>
        <h2 class="cert-name">${name}</h2>
        <p class="cert-sub">Atas keberhasilannya menyandang gelar:</p>
        <div class="badge">PENJELAJAH PELUANG</div>
        <p class="cert-footer">Diberikan oleh: <strong>Developer Ulung dari FT.UNSUR</strong></p>
      </div>
      
      <div class="cert-actions">
        <button id="download-cert-btn" class="main-start-btn">UNDUH PNG</button>
        <button onclick="window.location.reload()" class="cert-retry-btn">MAIN LAGI</button>
      </div>
    </div>
  `;

  // Logika Download (Tetap sama seperti sebelumnya)
  document.getElementById("download-cert-btn").addEventListener("click", () => {
    const certElement = document.getElementById("certificate-to-print");
    html2canvas(certElement, {
      backgroundColor: "#ffffff",
      scale: 2,
    }).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Sertifikat_Peluang_${name}.png`;
      link.href = image;
      link.click();
    });
  });
}
