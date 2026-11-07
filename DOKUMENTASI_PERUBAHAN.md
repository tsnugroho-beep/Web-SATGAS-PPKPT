# Ringkasan Catatan Perubahan & Pembaruan (Changelog)
**Website Resmi Satgas PPKPT - Universitas Pelita Bangsa**

Dokumen ini mencatat seluruh rangkaian perubahan, pembaruan desain, restrukturisasi tata letak, dan peningkatan fungsionalitas yang telah diimplementasikan pada website Satgas Pencegahan dan Penanganan Kekerasan di Lingkungan Perguruan Tinggi (PPKPT) Universitas Pelita Bangsa.

---

## 📋 Ikhtisar Pembaruan Utama

| No | Area / Komponen | Sebelum Perubahan | Sesudah Perubahan |
|:---|:---|:---|:---|
| 1 | **Latar Belakang (Background Animation)** | Efek bola/blob berputar yang terasa berat dan buram. | Efek **Background Beams** (garis lengkung SVG halus beraura lembut warna Sage Green `#4A6B53`, Eucalyptus `#6B8E73`, dan aksen emas `#C29B38`) yang ringan dan modern. |
| 2 | **Navigasi Header** | Terdapat wadah/kapsul luar ganda; jarak antar menu berbeda; indikator aktif bergeser canggung. | Tampilan menu bersih tanpa wadah ganda, jarak antar menu proporsional dan responsif, chip aktif rapi di tengah teks. |
| 3 | **Halaman Default (Reload/Refresh)** | Sering tertahan di section Profil setelah browser dimuat ulang. | Setiap refresh atau kunjungan baru dipastikan langsung membuka halaman **Beranda**. |
| 4 | **Tombol Pelaporan (CTA)** | Muncul berulang di berbagai tempat (hero, body, header). | Tombol pelaporan di badan halaman dihapus agar lebih bersih; fokus pada tombol **Laporkan!** berwarna *soft warm red* (`#C85A5A`) di header tetap (*sticky*). |
| 5 | **Bentuk Kekerasan yang Dilarang** | Awalnya berada di dalam subtab edukasi, kemudian sempat terpecah menjadi 4 kartu terpisah di Beranda. | Dipindahkan ke Beranda dan disatukan ke dalam **1 kartu besar terpadu (`sage-card`)** dengan grid 2 kolom internal dan border aksen warna spesifik. |
| 6 | **Judul Showcase di Beranda** | Menggunakan nama *"Edukasi & Ruang Aman Kampus"*. | Diganti menjadi **"Edukasi dan Kegiatan"** agar selaras dengan menu utama. |
| 7 | **Modal Artikel Edukasi** | Mudah tertutup jika backdrop tertekan; ada ikon silang (✕) di sudut kanan atas. | Modal terkunci dari klik luar (hanya menutup saat tombol **"Tutup"** ditekan secara sadar); tanda silang (✕) dihilangkan. |

---

## 🛠️ Rincian Teknis Perubahan per File

### 1. `index.html`

- **Restrukturisasi Bagian Beranda**:
  - Menggabungkan 4 kartu terpisah kategori kekerasan (*Kekerasan Seksual*, *Perundungan/Bullying*, *Tindakan Intoleransi*, *Kekerasan Fisik & Psikis*) ke dalam satu container besar:
    ```html
    <div class="sage-card p-6 sm:p-8 bg-white/95 backdrop-blur-sm rounded-3xl border border-sage-200 shadow-sm space-y-6">
      <!-- Header Kartu -->
      <div class="border-b border-sage-100 pb-4">...</div>
      <!-- Grid Internal 2 Kolom -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">...</div>
    </div>
    ```
  - Mengubah heading showcase edukasi dari `<h3 ...>Edukasi &amp; Ruang Aman Kampus</h3>` menjadi `<h3 ...>Edukasi dan Kegiatan</h3>`.
  - Menghapus tombol redundan "Laporkan di sini" pada badan halaman beranda.

- **Penyempurnaan Navigasi Header**:
  - Menghilangkan kontainer luar pembungkus pill yang menumpuk.
  - Memastikan tautan navigasi (`#beranda`, `#profil`, `#edukasi-kegiatan`) terdistribusi merata dengan kelas fleksibel dan responsif di mobile maupun desktop.

- **Pembersihan Modal Edukasi (`#edukasi-detail-modal`)**:
  - Menghapus elemen tombol close tanda silang (✕) pada header modal.
  - Mempertahankan footer modal dengan tombol aksi eksplisit: `Tutup` dan `Laporkan Pelanggaran`.

- **Pembaruan Versi Asset (Cache-Busting)**:
  - Menyematkan parameter versi `?v=2.5` pada file CSS dan JavaScript untuk mencegah browser menampilkan versi cache lama.

---

### 2. `assets/css/style.css`

- **Gaya Navigasi Rapi & Responsif**:
  - Mengatur padding dan line-height untuk `.nav-link` agar teks berada persis di tengah visual.
  - Mengimplementasikan state `.nav-link.active` berupa chip sage halus (`background: #EAF0EC; border: 1px solid #C4D3C8; color: #2B3D31; border-radius: 9999px;`).
- **Gaya Tombol Pelaporan**:
  - `.btn-report-red`: Warna latar *soft warm red* (`#C85A5A`) dengan hover state (`#B54A4A`), memberikan penekanan penting tanpa kontras yang terlalu menusuk mata.
- **Background Beams**:
  - Menghilangkan styling orb lama dan menggantikannya dengan kanvas SVG responsif beranimasi *stroke-dashoffset* yang mulus dan elegan.

---

### 3. `assets/js/main.js`

- **Inisialisasi Navigasi & Default Beranda**:
  - Memastikan fungsi aktivasi tab (`switchPage('beranda')`) selalu dipanggil pertama kali saat halaman dimuat, menghapus hash sisa dari sesi sebelumnya agar selalu mendarat di **Beranda**.
- **Logika Modal Edukasi**:
  - Menghapus event listener klik pada overlay/backdrop luar modal.
  - Menghubungkan tombol "Tutup" (`#close-edukasi-modal-btn`) sebagai satu-satunya pemicu penutupan modal.
  - Mencegah *event bubbling* agar pembacaan artikel di gawai sentuh (mobile/tablet) tidak terputus tanpa sengaja.
- **Rendering Dinamis**:
  - Mempertahankan rendering dinamis data edukasi dan kegiatan ke dalam showcase Beranda (3 kartu terbaru) dan katalog edukasi penuh.

### 4. `admin.html` (React CMS Dashboard Ramah Pengguna Non-IT)

- **Antarmuka CMS Modern Tanpa Istilah Teknis**:
  - Dibangun dengan **React & TailwindCSS** menggunakan palet resmi *Sage Green* yang sejuk dan menenangkan.
  - Dirancang khusus untuk **staf non-IT** tanpa bahasa teknis (bebas dari istilah JSON, LocalStorage, atau kode pemrograman).
  - Menu sederhana berbahasa Indonesia: **"Beranda"**, **"Kelola Edukasi & Kegiatan"**, dan **"Pengaturan"**.
- **Integrasi Media Pintar (Smart Media Integration)**:
  - Pilihan tipe konten intuitif: 📝 **Artikel Teks**, 🎥 **Video YouTube**, dan 📸 **Postingan Instagram**.
  - **YouTube & Instagram Tanpa Kode Iframe**: Pengguna hanya perlu menempelkan link URL video atau postingan biasa. Sistem secara otomatis membaca URL dan menampilkan **pratinjau interaktif langsung (*Live Preview*)** di bawah kolom input.
  - **Editor Teks Kaya (WYSIWYG)**: Tombol pemformatan instan (Tebal, Miring, Sub-Judul, Poin, Angka, Catatan) untuk artikel teks.
- **Penyimpanan di Balik Layar (Seamless Sync)**:
  - Staf cukup mengklik tombol hijau **"Simpan"** dan melihat notifikasi sukses (*"Konten berhasil diterbitkan!"*).
  - Sinkronisasi instan ke website utama [`index.html`](file:///d:/website%20satgas%20ppkpt/index.html) sehingga artikel, video YouTube, dan postingan Instagram langsung tayang secara otomatis.

### 4. `admin.html` & `assets/js/main.js` (Dashboard CMS, Smart Media & Autentikasi Login Aman)

- **Sistem Autentikasi Login Aman (Secure Login Authentication)**:
  - **Halaman Login Terpusat (`/login` / `#login`)**: Tampilan kartu login elegan di tengah layar dengan nuansa palet *Sage Green* dan tombol aksi Soft Warm Red (`#C85A5A`) bertuliskan *"Masuk Dashboard"*.
  - **Sistem Tertutup (Closed Provisioning)**: Sesuai standar keamanan Satgas PPKPT, **TIDAK ADA link Registrasi, Sign Up, maupun Lupa Kata Sandi**. Akun dikelola secara tertutup oleh Administrator TI.
  - **Perlindungan Rute Otomatis (Route Guarding)**: Jika pengguna mencoba membuka halaman internal admin (`#beranda`, `#edukasi`, atau `#pengaturan`) tanpa sesi login, sistem secara otomatis mengunci rute dan mengalihkan layar ke halaman Login.
  - **Fungsi Keluar (Logout)**: Disediakan tombol **Keluar** (Logout) berwarna merah di bagian bawah sidebar, di header atas, dan di tab Pengaturan. Sekali klik, sesi dibersihkan dan pengguna langsung diarahkan kembali ke halaman Login.
  - **Kesiapan Integrasi Backend**: State autentikasi dikelola rapi di React dan disimpan dalam sesi lokal (`localStorage` / `sessionStorage`), telah disiapkan arsitekturnya agar dapat langsung dihubungkan dengan Firebase Auth atau Supabase Auth di masa depan.
- **Pembangunan Admin CMS Khusus Staf Non-IT**:
  - Dibuat menggunakan React 18 + TailwindCSS dalam bentuk Single-Page Application (SPA) yang bersih, intuitif layaknya WordPress / CMS modern tanpa istilah teknis.
  - Skema warna konsisten Sage Green (`#4A6B53`, `#6B8E73`, `#EAF0EC`, `#F4F7F5`) dan Soft Warm Red (`#C85A5A`).
- **Integrasi Smart Media (YouTube & Instagram)**:
  - Staf cukup memilih tipe konten: **Artikel Teks**, **Video YouTube**, atau **Postingan Instagram**.
  - Kolom input hanya meminta URL/link mentah dari browser atau aplikasi. Sistem secara otomatis mem-parsing ID video/postingan dan menampilkan **Live Preview** interaktif di formulir. Sama sekali tidak memerlukan kode embed `<iframe>` dari pengguna.
- **Pembersihan Elemen Teknis & Developer-Centric**:
  - Menghapus tombol *Salin JSON* & *Ekspor JSON* pada navbar atas.
  - Menghapus kartu *Status Sinkronisasi* dan tab *Data & Ekspor JSON*.
  - Menghapus tombol redundan *+ Tambah Materi Baru* dari Beranda; sekarang terpusat di menu *Kelola Edukasi*.
  - Menghapus kotak peringatan *Tindakan Pemulihan Data* dan *Rencana Integrasi Full-Stack* pada menu Pengaturan.
  - Menghapus kartu peringatan *Proteksi Input* di modal formulir.
- **Akses Rahasia Admin (Hidden Admin Route)**:
  - Tautan *• Portal Admin* pada footer `index.html` telah **dihapus sepenuhnya** dari pandangan publik.
  - Akses dashboard admin kini hanya dapat dibuka langsung oleh staf admin melalui:
    1. Membuka file/halaman: `admin.html`
    2. Atau menambahkan hash rahasia pada halaman publik: `index.html#admin` (otomatis redirect ke admin)
    3. Atau melalui URL rewrite server ke `/admin`.

- **Pratinjau Video (Video Preview Thumbnail) & Putar Interaktif (Click-to-Play)**:
  - Pada kartu materi publik di Beranda dan Katalog Edukasi, video YouTube kini otomatis menampilkan **gambar pratinjau resolusi tinggi (*High-Quality Thumbnail*)** langsung dari video yang disematkan.
  - Di tengah thumbnail terpasang tombol **Play (▶)** merah khas video modern dengan efek *hover pulse*.
  - **Click-to-Play Langsung di Kartu:** Begitu pengguna mengklik tombol Play atau thumbnail kartu, elemen pratinjau seketika berganti menjadi pemutar video aktif (`iframe` YouTube dengan `autoplay=1`) tanpa harus berpindah halaman.
  - Untuk konten media sosial Instagram, kartu kini dilengkapi banner visual bertema Instagram dengan tombol putar interaktif yang langsung memuat konten aktif.
  - **Penyesuaian Rasio Asli Konten (Native Aspect Ratio):**
    - **YouTube Standar:** Ditampilkan dalam rasio layar lebar **16:9** murni menggunakan *mqdefault* tanpa garis hitam (*letterboxing*).
    - **YouTube Shorts:** Otomatis dideteksi dan ditampilkan dalam rasio vertikal ponsel **9:16**.
    - **Instagram Post & Reels:** Menggunakan rasio potret resmi Instagram **4:5** (`aspect-[4/5]`) sehingga tampilan feed/reel tidak lagi tertekan (*squashed*) menjadi 16:9.
  - **Penyederhanaan Header Kartu & Ikon Vektor Resmi:**
    - Kotak ikon emoji terpisah dihilangkan. Bagian atas kartu kini **hanya memiliki satu baris terpadu**: Kategori & Tipe Konten di kiri, Tanggal di kanan.
    - Mengganti seluruh emoji Windows (`📸`, `🎥`) dengan **ikon vektor SVG resmi** untuk Instagram (logo kamera glyph resmi), YouTube (logo play resmi), dan Artikel Teks (dokumen outline).
  - **Penyederhanaan Tombol Keluar (Logout) & Navigasi**:
    - Menghapus baris *"Selesai bertugas atau ingin mengganti akun staf? [Keluar dari Akun Ini]"* pada kartu Profil Staf di menu Pengaturan untuk menghilangkan redundansi.
    - Menghapus emoji pintu (`🚪`) sepenuhnya, menghasilkan tombol pill teks **"Keluar"** yang bersih dan minimalis pada Header atas dan Sidebar bawah.
    - Mengganti teks dan ikon tautan header admin menjadi **"Lihat Website"** dengan ikon SVG tautan eksternal yang serasi.
    - Menghapus teks subtitle header atas *"Panel Pengelola Konten • Satgas Pencegahan & Penanganan Kekerasan"* agar tampilan navbar lebih lega dan bersih.
    - Menghapus badge *"PANEL PENGELOLA RESMI"*, kotak demo *"Akun Pengujian / Isi Otomatis"*, serta tautan bawah *"← Kembali ke Website Ruang Aman Publik"* pada halaman login ([`admin.html`](file:///d:/website%20satgas%20ppkpt/admin.html)) agar halaman login terisolasi murni sebagai gerbang masuk yang bersih, privat, dan tanpa distraksi.
    - Menghapus badge status *"Sesi Terhubung"* pada kartu Akun Pengelola di menu Pengaturan sehingga tata letak kartu profil menjadi lebih simpel dan tidak penuh ornamen.
    - **Animasi Latar Belakang Lembut (Soft Ambient Aurora) Khusus Halaman Login:** Latar belakang halaman login kini dilengkapi animasi pendaran aurora bernuansa Sage Green yang bergerak lembut (*floating orbs* 18s-26s dan *soft pulse glow* 12s) berpadu dengan pola grid titik halus (*dot-grid pattern*). Animasi ini **khusus aktif di layar login saja**, sedangkan kanvas dashboard admin tetap bersih dan tenang tanpa distraksi.
  - **Integrasi Akun Multi-User (13 Akun Resmi dari Excel `daftar akun.xlsx`) & Sistem Keterangan Penulis Konten (Author Tracking)**:
    - Seluruh **13 akun resmi Satgas PPKPT UPB** dari file `daftar akun.xlsx` telah diintegrasikan langsung ke sistem autentikasi tertutup [`admin.html`](file:///d:/website%20satgas%20ppkpt/admin.html) lengkap dengan nama, jabatan (Ketua, Sekretaris, Anggota), jenis anggota (Dosen, Tendik, Mahasiswa), dan nomor identitas (NUPTK/NIM/NIP).
    - **Pencatatan Otomatis Siapa yang Memposting Konten:** Setiap materi baru yang dibuat atau diedit di admin otomatis merekam identitas staf yang sedang login (`author: { name, role, category, email }`).
    - **Tabel Kelola Konten Admin:** Menambahkan kolom **"Diposting Oleh"** pada tabel admin ([`admin.html`](file:///d:/website%20satgas%20ppkpt/admin.html)) yang menampilkan avatar inisial, nama lengkap, dan jabatan pengunggah.
    - **Modal Tambah/Edit Konten:** Menampilkan badge konfirmasi transparan *"Diterbitkan oleh: [Nama Staf] ([Jabatan])"* agar staf yang bertugas mengetahui materi akan tayang atas nama mereka.
    - **Tampilan Website Publik ([`index.html`](file:///d:/website%20satgas%20ppkpt/index.html)):**
      - Pada footer kartu edukasi di Beranda dan Katalog: Menampilkan nama pengunggah di samping tombol baca (`[Ikon User] [Nama Pengunggah]`).
      - Pada Modal Detail Lengkap: Menampilkan nama staf pengunggah di samping tanggal publikasi (`[Nama Pengunggah] • [Tanggal]`).
  - **Dukungan Server Pengembangan Lokal (`npm run dev`)**:
    - Dibuatkan [`package.json`](file:///d:/website%20satgas%20ppkpt/package.json) dan [`server.js`](file:///d:/website%20satgas%20ppkpt/server.js) bawaan Node.js tanpa dependensi pihak ketiga (*zero dependencies*).
    - Cukup jalankan perintah `npm run dev` pada terminal untuk menyalakan server lokal secara instan pada port 3000 (`http://localhost:3000/` dan `http://localhost:3000/admin.html`).
  - **Proteksi Data Sensitif & Kredensial untuk Publikasi GitHub**:
    - Dibuatkan file [`.gitignore`](file:///d:/website%20satgas%20ppkpt/.gitignore) yang secara ketat mengecualikan file Excel asli `daftar akun.xlsx`, seluruh file `*.xlsx`/`*.xls`, kredensial `.env`, cache sistem, dan log, sehingga berkas rahasia kampus **tidak akan pernah terunggah ke repositori GitHub**.
    - Disediakan file panduan format bebas data sensitif [`daftar_akun.example.txt`](file:///d:/website%20satgas%20ppkpt/daftar_akun.example.txt) sebagai dokumentasi struktur tabel.
    - **Enkripsi Kredensial dengan Salted SHA-256 Hash pada Kode:** Seluruh kata sandi akun resmi di [`admin.html`](file:///d:/website%20satgas%20ppkpt/admin.html) telah diubah dari *plain text* menjadi *salted SHA-256 cryptographic hash* yang tidak dapat dibaca atau dibalikkan (*irreversible*).
    - **Sensor Nomor Identitas Pribadi (ID Masking):** Nomor NUPTK, NIM, dan NIP anggota resmi telah disensor sebagian (contoh: `1754****0132`) untuk melindungi privasi data sivitas akademika saat repositori bersifat publik.
    - **Fungsi Login Tetap Berjalan Normal:** Staf resmi tetap dapat masuk ke dashboard menggunakan kata sandi asli masing-masing karena browser otomatis menghitung hash masukan sebelum dicocokkan.
  - Pada dashboard admin [`admin.html`](file:///d:/website%20satgas%20ppkpt/admin.html), daftar tabel materi, ringkasan beranda, dan live preview modal kini juga mengikuti rasio asli masing-masing media serta menggunakan ikon vektor SVG resmi.

---

## 🎨 Panduan Identitas Visual yang Diterapkan

- **Warna Dasar Utama (Sage Green Palette)**:
  - Sage 900 (Teks Utama & Heading): `#233329` / `#2B3D31`
  - Sage 800 / 700 (Aksen & Tautan): `#3E5646` / `#4A6B53`
  - Sage 500 / 600 (Elemen Grafis): `#6B8E73`
  - Sage 100 / 200 (Background Card & Border): `#EAF0EC` / `#C4D3C8`
  - Sage 50 (Background Kanvas Halaman): `#F4F7F5`
- **Warna Aksen Tindakan (Action CTA)**:
  - Soft Warm Red: `#C85A5A` (Hover: `#B54A4A`)
- **Aksen Kategori Kekerasan**:
  - ⚠️ Kekerasan Seksual: Merah (`#EF4444`)
  - 🛑 Perundungan (Bullying): Amber / Oranye (`#F59E0B`)
  - ⚖️ Tindakan Intoleransi: Biru (`#3B82F6`)
  - 🛡️ Kekerasan Fisik & Psikis: Ungu (`#8B5CF6`)

---

*Terakhir diperbarui: 07 November 2026*
*Satgas PPKPT Universitas Pelita Bangsa*

