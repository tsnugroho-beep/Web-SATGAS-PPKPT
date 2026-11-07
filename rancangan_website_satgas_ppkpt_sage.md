# <span style="color: #4A6B53;">Usulan Arsitektur & Tampilan Website Satgas PPKPT</span>
**Universitas Pelita Bangsa**

Website Satgas PPKPT (Pencegahan dan Penanganan Kekerasan, Perundungan, dan Tindakan Intoleransi) berfungsi sebagai pusat informasi, edukasi, dan portal pelaporan resmi di lingkungan Universitas Pelita Bangsa. Desain difokuskan pada aksesibilitas, kerahasiaan pelapor, dan navigasi yang intuitif dengan sentuhan warna yang menenangkan (*Sage Green*).

---

## <span style="color: #6B8E73;">1. Struktur Menu yang Diperlukan (Sitemap)</span>

| Menu Utama | Sub-Menu (Dropdown) | Fungsi / Konten |
| :--- | :--- | :--- |
| **Beranda (Home)** | - | Halaman muka berisi ringkasan, kontak darurat, dan tombol aksi "Lapor Sekarang". |
| **Tentang Satgas** | • Profil & Latar Belakang<br>• Visi & Misi<br>• Struktur Organisasi<br>• Dasar Hukum & Pedoman | Membangun kredibilitas dan memberikan informasi resmi terkait legalitas Satgas. |
| **Layanan & Laporan** | • Alur Penanganan Kasus<br>• **Formulir Pelaporan (Aman)**<br>• Jaminan Kerahasiaan<br>• Layanan Pemulihan | Menu inti. Berisi SOP penanganan, form laporan terenkripsi, dan perlindungan pelapor. |
| **Edukasi & Publikasi**| • Artikel & Berita<br>• Infografis PPKPT<br>• Dokumen Unduhan (SOP) | Materi kampanye anti-kekerasan, panduan pencegahan, dan update kegiatan Satgas. |
| **Bantuan (FAQ)** | - | Tanya jawab umum (contoh: "Apa yang termasuk pelecehan?", "Apakah identitas saya aman?"). |

---

## <span style="color: #6B8E73;">2. Visualisasi Mockup Tampilan Website (Tema Sage Green)</span>

*Catatan: Blok di bawah ini menggunakan HTML sebaris untuk memvisualisasikan tata letak (mockup) antarmuka website secara langsung di dalam dokumen Markdown.*

<div style="border: 2px solid #A3B8A8; border-radius: 8px; overflow: hidden; font-family: sans-serif; max-width: 900px; margin-top: 20px;">
    <!-- Browser Header -->
    <div style="background: #D8E2DC; padding: 10px 15px; display: flex; gap: 8px; border-bottom: 1px solid #A3B8A8;">
        <div style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444;"></div>
        <div style="width: 12px; height: 12px; border-radius: 50%; background: #eab308;"></div>
        <div style="width: 12px; height: 12px; border-radius: 50%; background: #22c55e;"></div>
    </div>
    
    <!-- Website Navigation (Sage Green) -->
    <div style="background: #6B8E73; color: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
        <div style="font-weight: bold; font-size: 16px; letter-spacing: 0.5px;">SATGAS PPKPT PELITA BANGSA</div>
        <div style="display: flex; gap: 18px; font-size: 14px; font-weight: 500; align-items: center;">
            <span style="border-bottom: 2px solid #F4F9F5; padding-bottom: 2px;">Beranda</span>
            <span>Tentang Satgas</span>
            <span>Edukasi</span>
            <span>FAQ</span>
            <span style="background: #4A6B53; padding: 6px 14px; border-radius: 4px; border: 1px solid #F4F9F5; cursor: pointer;">Lapor Sekarang!</span>
        </div>
    </div>

    <!-- Hero Section (Light Sage) -->
    <div style="background-color: #EAF0EC; padding: 50px 25px; text-align: center; border-bottom: 1px solid #C4D3C8;">
        <h3 style="margin: 0 0 15px 0; font-size: 24px; color: #2B3D31;">Kampus Aman, Nyaman, dan Bebas Kekerasan</h3>
        <p style="margin: 0 auto 25px auto; max-width: 80%; font-size: 15px; color: #526B59; line-height: 1.6;">
            Satuan Tugas Pencegahan dan Penanganan Kekerasan, Perundungan, dan Tindakan Intoleransi (PPKPT) Universitas Pelita Bangsa hadir untuk mewujudkan lingkungan akademik yang aman bagi seluruh sivitas akademika.
        </p>
        <div style="background: #4A6B53; color: white; padding: 12px 28px; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            AJUKAN LAPORAN / ADUAN
        </div>
        <p style="margin-top: 15px; font-size: 12px; color: #4A6B53;">
            <em>* Identitas dan laporan Anda dijamin kerahasiaannya.</em>
        </p>
    </div>

    <!-- Features Section -->
    <div style="display: flex; padding: 25px; gap: 20px; background: #FAFCFA; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px; background: white; border: 1px solid #C4D3C8; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 10px 0; font-size: 16px; color: #4A6B53;">🛡️ Privasi Terjamin</h4>
            <p style="margin: 0; font-size: 14px; color: #6B8E73; line-height: 1.5;">Sistem pelaporan kami merujuk pada kode etik kerahasiaan. Identitas Anda tidak akan dipublikasikan.</p>
        </div>
        <div style="flex: 1; min-width: 200px; background: white; border: 1px solid #C4D3C8; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 10px 0; font-size: 16px; color: #4A6B53;">📋 Alur Jelas</h4>
            <p style="margin: 0; font-size: 14px; color: #6B8E73; line-height: 1.5;">Ketahui bagaimana laporan Anda akan diproses, mulai dari tahap verifikasi hingga pendampingan.</p>
        </div>
        <div style="flex: 1; min-width: 200px; background: white; border: 1px solid #C4D3C8; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <h4 style="margin: 0 0 10px 0; font-size: 16px; color: #4A6B53;">📞 Layanan Darurat</h4>
            <p style="margin: 0; font-size: 14px; color: #6B8E73; line-height: 1.5;">Butuh bantuan segera?<br><strong style="color: #2B3D31;">Hotline: 0812-XXXX-XXXX</strong><br>Tersedia di jam kerja.</p>
        </div>
    </div>

    <!-- Footer -->
    <div style="background: #2B3D31; color: #A3B8A8; padding: 20px; font-size: 13px; text-align: center;">
        © 2026 Universitas Pelita Bangsa - Satgas PPKPT. Semua Hak Dilindungi.
    </div>
</div>