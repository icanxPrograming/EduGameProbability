# Petualangan Probabilitas (V.3.0) 🎲

**Petualangan Probabilitas** adalah sebuah game edukasi berbasis web yang menggabungkan elemen eksplorasi _side-scrolling_ dengan materi matematika mengenai **Peluang**. Pemain berperan sebagai **Jackcobi**, seorang penjelajah yang terjebak di dimensi probabilitas matematika dan harus menyelesaikan berbagai tantangan untuk menemukan portal pulang.

## 📖 Narasi: Pelarian dari Dimensi Ketidakpastian

**Jackcobi** adalah seorang penjelajah dimensi yang sangat mengandalkan logika dan perhitungan matematis. Namun, dalam perjalanan terakhirnya, ia terhisap ke dalam sebuah anomali yang dikenal sebagai **"Lembah Probabilitas"**—sebuah tempat di mana realitas tidak ditentukan oleh hukum fisika biasa, melainkan oleh hukum peluang. Di sini, ia harus mengumpulkan data, memilih titik sampel yang tepat, dan menghitung frekuensi harapan untuk membuka portal menuju dunia nyata.

## 🚀 Fitur Utama

- **Educational Quest**: Mempelajari konsep Ruang Sampel, Titik Sampel, dan Frekuensi Harapan melalui gameplay interaktif.
- **Retro Sprite Engine**: Dikembangkan menggunakan modul ES6 dengan sistem pergerakan karakter yang ringan.
- **Dynamic Randomized Levels**: Sistem tantangan acak yang memastikan setiap permainan memberikan soal yang berbeda, meningkatkan nilai _replayability_.
- **Stamina System**: Manajemen nyawa berdasarkan ketepatan dalam menjawab tantangan; salah mengambil objek akan mengurangi energi Jackcobi.
- **Neo-Brutalism UI**: Desain antarmuka yang mencolok dengan font sistem yang dioptimalkan untuk perangkat mobile agar tetap terbaca jelas.

## 🎮 Mekanik Gameplay

1.  **Stage 1: Ruang Sampel**: Mengumpulkan seluruh anggota himpunan dari suatu percobaan (koin atau dadu) untuk melengkapi misi.
2.  **Stage 2: Titik Sampel**: Memilih anggota spesifik dari ruang sampel sesuai instruksi (misal: hanya angka genap) di tengah objek-objek lain yang berjatuhan.
3.  **Stage 3: Frekuensi Harapan**: Jackcobi harus mengumpulkan jumlah benda secara presisi sesuai hasil perhitungan $Fh = n \times P(A)$. Jika jumlahnya berlebih, stamina akan berkurang.

## 🛠️ Struktur Proyek

Sesuai dengan struktur direktori yang digunakan:

```text
├── assets/
│   ├── audio/      # SFX & Music
│   ├── fonts/      # Font pendukung
│   └── images/     # Sprite Jackcobi dan Map
├── css/
│   └── styles.css  # Layout & gaya Neo-Brutalism
├── js/
│   ├── core/       # scrollManager.js
│   ├── minigames/  # sampleSpace.js, samplePoint.js, expectedFreq.js
│   ├── scenes/     # introScene.js, stage1Scene.js, stage2Scene.js, stage3Scene.js, endingScene.js
│   ├── ui/         # buttonUI.js, dialogBox.js, popupInfo.js
│   └── main.js     # Entry point utama
├── index.html      # Struktur utama game
└── README.md       # Dokumentasi proyek
```

## 📋 Petunjuk Instalasi

1.  Simpan seluruh folder proyek ke direktori lokal Anda.
2.  Buka proyek menggunakan editor kode (seperti VS Code).
3.  Jalankan melalui **Live Server** pada port `5500`.
4.  Akses melalui browser di alamat `[http://127.0.0.1:5500](http://127.0.0.1:5500)`.

## 📄 Kontribusi

Proyek ini berafiliasi dibuat untuk pendidikan matematika yang menyenangkan ❤.
