// js/ui/dialogBox.js

let isTyping = false;
let currentText = "";
let typingTimeout;

// Inisialisasi Audio
const typeSound = new Audio("assets/audio/typewritter.mp3");
typeSound.volume = 0.05; // Sesuaikan volume agar tidak terlalu berisik

export function initDialog(dialogList, onComplete) {
  let dialogIndex = 0;
  const dialogBox = document.getElementById("dialog-box");
  const dialogText = document.getElementById("dialog-text");
  const dialogHeader = document.getElementById("dialog-header");
  const nextBtn = document.getElementById("next-btn");

  dialogBox.style.display = "flex";

  // Fungsi Animasi Typewriter
  function typeWriter(content, index = 0) {
    // Cek apakah content berupa string atau objek { text, name }
    const text = typeof content === "string" ? content : content.text;
    const name = typeof content === "object" ? content.name : null;

    if (index === 0) {
      isTyping = true;
      currentText = text;
      dialogText.textContent = "";

      // Update Header Nama
      if (name) {
        dialogHeader.textContent = name;
        dialogHeader.style.display = "block";
      } else {
        dialogHeader.style.display = "none";
      }
    }

    if (index < text.length) {
      dialogText.textContent += text.charAt(index);
      playTypeSound();
      typingTimeout = setTimeout(() => typeWriter(content, index + 1), 35);
    } else {
      finishTyping();
    }
  }

  function playTypeSound() {
    // Reset posisi ke 0 agar suara bisa dimainkan berulang dengan cepat
    typeSound.currentTime = 0;
    typeSound.play().catch(() => {
      // Browser sering memblokir autoplay jika belum ada interaksi user
      console.warn("Audio diblokir oleh browser sampai ada interaksi.");
    });
  }

  function stopTypeSound() {
    typeSound.pause();
    typeSound.currentTime = 0;
  }

  function finishTyping() {
    clearTimeout(typingTimeout);
    stopTypeSound(); // Hentikan suara segera setelah teks selesai/di-skip
    dialogText.textContent = currentText;
    isTyping = false;
    dialogText.classList.add("done-typing");
  }

  // Mulai dialog pertama
  typeWriter(dialogList[dialogIndex]);

  const handleNext = () => {
    // JIKA SEDANG MENGETIK: Langsung tampilkan semua teks & HENTIKAN SUARA
    if (isTyping) {
      finishTyping();
      return;
    }

    // JIKA SUDAH SELESAI MENGETIK: Lanjut ke dialog berikutnya
    dialogIndex++;
    if (dialogIndex < dialogList.length) {
      typeWriter(dialogList[dialogIndex]);
    } else {
      // Dialog Habis
      stopTypeSound();
      nextBtn.removeEventListener("click", handleNext);
      if (onComplete) onComplete();
    }
  };

  // Bersihkan listener lama (anti-double trigger)
  const newNextBtn = nextBtn.cloneNode(true);
  nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
  newNextBtn.addEventListener("click", handleNext);
}
