/**
 * Website Satgas PPKPT Universitas Pelita Bangsa
 * Modular Section Navigation & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Akses admin rahasia via URL hash #admin atau #login
  const initialHash = window.location.hash.toLowerCase();
  if (initialHash === '#admin' || initialHash === '#login') {
    window.location.href = 'admin.html';
    return;
  }
  initNavigation();
  initSubTabs();
  initFaqAccordion();
  initReportModal();
  initEducationSystem();
  initYear();
});

// 1. Section Navigation Router (Show only one active section view)
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .brand-link, .js-route-link');
  const sections = document.querySelectorAll('.page-section');
  const burgerBtn = document.getElementById('burger-dropdown-btn');
  const burgerPanel = document.getElementById('burger-dropdown-panel');

  function navigateTo(targetId) {
    if (!targetId) targetId = 'beranda';
    targetId = targetId.replace('#', '');

    // Alias rahasia admin: jika mengetik #admin, arahkan langsung ke admin.html
    if (targetId.toLowerCase() === 'admin') {
      window.location.href = 'admin.html';
      return;
    }

    // Alias: bentuk-kekerasan goes to beranda
    let activateSubtab = null;
    if (targetId === 'bentuk-kekerasan') {
      targetId = 'beranda';
    }

    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    // Hide all sections
    sections.forEach(sec => {
      sec.classList.remove('active-page');
    });

    // Show target section
    targetSection.classList.add('active-page');

    // Trigger subtab if requested
    if (activateSubtab) {
      const subtabBtn = document.querySelector(`[data-tab="${activateSubtab}"]`);
      if (subtabBtn) subtabBtn.click();
    }

    // Update active nav links
    let isBurgerItemActive = false;
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === targetId) {
        link.classList.add('active');
        if (burgerPanel && burgerPanel.contains(link)) {
          isBurgerItemActive = true;
        }
      } else {
        link.classList.remove('active');
      }
    });

    // Highlight burger button if one of its items is currently open
    if (burgerBtn) {
      if (isBurgerItemActive) {
        burgerBtn.classList.add('bg-sage-100', 'border-sage-400', 'text-sage-800');
      } else {
        burgerBtn.classList.remove('bg-sage-100', 'border-sage-400', 'text-sage-800');
      }
    }

    // Close burger dropdown
    if (burgerPanel) {
      burgerPanel.classList.add('hidden');
    }

    // Scroll to top of viewport smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash without forcing jump
    if (history.pushState) {
      if (targetId === 'beranda') {
        history.pushState(null, null, window.location.pathname);
      } else {
        history.pushState(null, null, `#${targetId}`);
      }
    } else {
      location.hash = targetId === 'beranda' ? '' : `#${targetId}`;
    }
  }

  // Burger Menu Dropdown toggle
  if (burgerBtn && burgerPanel) {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      burgerPanel.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!burgerPanel.contains(e.target) && !burgerBtn.contains(e.target)) {
        burgerPanel.classList.add('hidden');
      }
    });
  }

  // Bind click handlers to all nav links (including dynamic & delegated links)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        navigateTo(href);

        // Check if there's an explicit subtab switch requested
        const switchSubTabId = link.getAttribute('data-switch-subtab');
        if (switchSubTabId && href === '#edukasi-kegiatan') {
          switchSubTab('edukasi-tabs', switchSubTabId);
        }
      }
    }
  });

  // Always default to Beranda on initial load and refresh
  if (window.location.hash && history.replaceState) {
    history.replaceState(null, null, window.location.pathname);
  }
  navigateTo('beranda');

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash?.replace('#', '') || 'beranda';
    navigateTo(hash);
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Helper to switch subtab programmatically
function switchSubTab(groupName, targetTabId) {
  const group = document.querySelector(`[data-tab-group="${groupName}"]`);
  if (!group) return;
  const buttons = group.querySelectorAll('.subtab-btn');
  const contents = document.querySelectorAll(`[data-tab-content="${groupName}"]`);

  buttons.forEach(b => {
    if (b.getAttribute('data-tab') === targetTabId) {
      b.classList.add('active', 'bg-[#4A6B53]', 'text-white');
      b.classList.remove('bg-white', 'text-gray-700');
    } else {
      b.classList.remove('active', 'bg-[#4A6B53]', 'text-white');
      b.classList.add('bg-white', 'text-gray-700');
    }
  });

  contents.forEach(content => {
    if (content.getAttribute('data-tab-id') === targetTabId) {
      content.classList.remove('hidden');
    } else {
      content.classList.add('hidden');
    }
  });
}

// 2. Sub-Tabs inside sections (e.g. Profil tabs, Layanan tabs)
function initSubTabs() {
  const tabGroups = document.querySelectorAll('[data-tab-group]');
  
  tabGroups.forEach(group => {
    const groupName = group.getAttribute('data-tab-group');
    const buttons = group.querySelectorAll('.subtab-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        switchSubTab(groupName, targetTab);
      });
    });
  });
}

// 3. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      // Close all items
      faqItems.forEach(other => {
        const otherAns = other.querySelector('.faq-answer');
        const otherIcon = other.querySelector('.faq-icon');
        if (otherAns) otherAns.classList.add('hidden');
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      // Toggle clicked item
      if (!isOpen) {
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// 4. Report Modal (Redirects/Embeds Official Form without mentioning Google Form)
function initReportModal() {
  const openModalBtns = document.querySelectorAll('.js-open-report-modal');
  const modal = document.getElementById('report-modal');
  const closeModalBtns = document.querySelectorAll('.js-close-report-modal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
}

// 5. Year helper
function initYear() {
  document.querySelectorAll('.js-current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

// 6. Sistem Showcase Edukasi Otomatis (3 Materi Terbaru di Beranda)
const DEFAULT_EDUKASI_DATA = [
  {
    id: 'edu-1',
    title: 'Batasan & Persetujuan (Consent)',
    date: '2026-11-06',
    category: 'Etika Akademik',
    icon: '⚖️',
    author: { name: 'Djoko Nugroho, M.Psi.', role: 'Ketua (Dosen)' },
    summary: 'Pahami etika akademik, konsep persetujuan (consent), dan batas kewajaran dalam interaksi antar sivitas tanpa intimidasi relasi kuasa.',
    actionText: 'Pelajari Selengkapnya',
    contentHtml: `
      <div class="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <div class="p-3.5 bg-sage-50 rounded-2xl border border-sage-200">
          <p class="font-semibold text-sage-900">
            Persetujuan (Consent) adalah komunikasi sadar, sukarela, dan setara sebelum melakukan interaksi atau tindakan fisik/personal tertentu.
          </p>
        </div>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Prinsip 5 Karakteristik Utama Consent (F.R.I.E.S):</h4>
        <ul class="space-y-2 list-disc pl-5">
          <li><strong>Freely Given (Sukarela Sepenuhnya):</strong> Diberikan tanpa paksaan, manipulasi, bujuk rayu berlebihan, atau ancaman relasi kuasa (seperti nilai kuliah atau jabatan organisasi).</li>
          <li><strong>Reversible (Dapat Dibatalkan Kapan Saja):</strong> Setiap individu berhak mengubah pikiran dan menghentikan persetujuan kapan saja tanpa perlu merasa bersalah.</li>
          <li><strong>Informed (Jelas & Sadar):</strong> Kedua belah pihak memahami sepenuhnya konsekuensi dan konteks interaksi tanpa ada hal yang ditutup-tutupi.</li>
          <li><strong>Enthusiastic (Antusias & Nyata):</strong> Consent adalah ekspresi aktif dan kerelaan tulus, bukan sekadar "diam" atau "tidak melawan karena takut".</li>
          <li><strong>Specific (Spesifik):</strong> Menyetujui satu aktivitas tidak berarti menyetujui aktivitas lainnya.</li>
        </ul>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Batas Kewajaran dalam Relasi Akademik:</h4>
        <p>
          Kegiatan bimbingan skripsi, tugas, atau praktikum harus dilaksanakan di ruangan kampus resmi atau kanal formal yang transparan pada jam kerja wajar. Hindari pertemuan privat di luar lingkup akademik yang menimbulkan kerentanan.
        </p>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Bila Batasan Anda Dilanggar:</h4>
        <p>
          Anda berhak menolak dengan tegas dan mendokumentasikan bukti kejadian. Satgas PPKPT UPB menyediakan layanan konsultasi rahasia untuk melindungi hak dan keamanan studi Anda.
        </p>
      </div>
    `
  },
  {
    id: 'edu-2',
    title: 'Stop Perundungan & KBGO',
    date: '2026-11-04',
    category: 'Keamanan Digital',
    icon: '🛑',
    author: { name: 'Dr. Wulan Windiarti, S.H., M.H.', role: 'Sekretaris (Dosen)' },
    summary: 'Kenali bentuk cyberbullying, pelecehan verbal, dan perpeloncoan liar agar dapat mencegahnya sejak dini di lingkungan kita.',
    actionText: 'Pelajari Selengkapnya',
    contentHtml: `
      <div class="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <div class="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
          <p class="font-semibold text-amber-900">
            Kekerasan Berbasis Gender Online (KBGO) dan perundungan di ruang digital dapat menimbulkan dampak trauma psikologis yang mendalam bagi korban.
          </p>
        </div>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Bentuk-Bentuk KBGO & Cyberbullying yang Dilarang:</h4>
        <ul class="space-y-2 list-disc pl-5">
          <li><strong>Penyebaran Konten Pribadi Tanpa Izin (NCII):</strong> Menyebarkan foto, video, atau rekaman percakapan pribadi untuk mempermalukan korban.</li>
          <li><strong>Doxing:</strong> Membongkar data pribadi (nomor HP, alamat rumah, akun keluarga) ke publik untuk memprovokasi perundungan massal.</li>
          <li><strong>Pelecehan Verbal & Cyberstalking:</strong> Mengirim pesan intimidatif, stiker pornografi, atau komentar merendahkan secara berulang.</li>
          <li><strong>Perpeloncoan Liar:</strong> Pemaksaan senioritas atau tugas tidak masuk akal yang merendahkan martabat mahasiswa baru.</li>
        </ul>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Panduan Pengamanan & Tindakan Cepat:</h4>
        <ol class="space-y-2 list-decimal pl-5">
          <li><strong>Ambil Tangkapan Layar (Screenshot):</strong> Simpan bukti percakapan lengkap dengan tanggal, jam, dan tautan profil pelaku sebelum dihapus.</li>
          <li><strong>Jangan Balas Provokasi:</strong> Hindari debat terbuka di kolom komentar atau grup chat. Segera batasi atau blokir akun pelaku.</li>
          <li><strong>Laporkan Segera ke Satgas PPKPT:</strong> Tim Satgas akan mendampingi proses takedown konten digital serta investigasi pelaku secara independen.</li>
        </ol>
      </div>
    `
  },
  {
    id: 'edu-3',
    title: 'Berani Lapor & Terlindungi',
    date: '2026-11-02',
    category: 'Layanan Satgas',
    icon: '🛡️',
    author: { name: 'Khansa Nadya Atika Rahma, S.Psi., M.M.', role: 'Anggota (Tendik)' },
    summary: 'Jangan takut bersuara. Satgas PPKPT menjamin perlindungan kerahasiaan penuh, konseling gratis, dan advokasi objektif.',
    actionText: 'Pelajari Selengkapnya',
    contentHtml: `
      <div class="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <div class="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
          <p class="font-semibold text-emerald-900">
            Satgas PPKPT Universitas Pelita Bangsa menjamin 100% kerahasiaan identitas pelapor dan korban, bebas biaya, serta bebas intimidasi akademik.
          </p>
        </div>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Hak-Hak Penuh yang Diterima Korban & Pelapor:</h4>
        <ul class="space-y-2 list-disc pl-5">
          <li><strong>Kerahasiaan Identitas Mutlak:</strong> Identitas Anda tidak akan diumumkan kepada publik maupun pelaku saat tahap awal klarifikasi.</li>
          <li><strong>Pendampingan Psikologis & Hukum Gratis:</strong> Satgas memfasilitasi konseling pemulihan trauma serta bantuan hukum secara bebas biaya.</li>
          <li><strong>Jaminan Keberlanjutan Studi:</strong> Satgas mengawal agar proses akademik, bimbingan, perkuliahan, dan evaluasi nilai Anda tetap berjalan lancar tanpa diskriminasi.</li>
          <li><strong>Perlindungan Saksi:</strong> Rekan yang menjadi saksi dilindungi dari segala bentuk ancaman fisik maupun sosial.</li>
        </ul>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Alur Penanganan Laporan:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <strong class="text-sage-900 block text-xs">1. Penerimaan Laporan</strong>
            <span class="text-[11px] text-gray-500">Laporan diverifikasi dalam 1x24 jam secara rahasia.</span>
          </div>
          <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <strong class="text-sage-900 block text-xs">2. Perlindungan Segera</strong>
            <span class="text-[11px] text-gray-500">Asesmen kebutuhan darurat dan ruang aman korban.</span>
          </div>
          <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <strong class="text-sage-900 block text-xs">3. Pemeriksaan Objektif</strong>
            <span class="text-[11px] text-gray-500">Klarifikasi bukti tanpa mempertemukan korban dengan pelaku bila korban trauma.</span>
          </div>
          <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <strong class="text-sage-900 block text-xs">4. Rekomendasi Sanksi & Pemulihan</strong>
            <span class="text-[11px] text-gray-500">Rekomendasi sanksi tegas ke Pimpinan Universitas dan pemulihan korban.</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'edu-4',
    title: 'Mengenal Relasi Kuasa di Lingkungan Kampus',
    date: '2026-10-28',
    category: 'Wawasan Kampus',
    icon: '🎓',
    author: { name: "Nabilah Syifa' Savira, S.M.", role: 'Anggota (Tendik)' },
    summary: 'Memahami bagaimana relasi hierarki dapat disalahgunakan serta langkah mitigasi pencegahannya bagi mahasiswa.',
    actionText: 'Pelajari Selengkapnya',
    contentHtml: `
      <div class="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <p>
          Relasi kuasa adalah kondisi ketika satu pihak memiliki kelebihan wewenang, jabatan struktural, pengaruh nilai akademik, atau senioritas yang dapat mempengaruhi nasib pihak lain.
        </p>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Indikator Penyalahgunaan Relasi Kuasa:</h4>
        <ul class="space-y-2 list-disc pl-5">
          <li>Menjadikan persetujuan bimbingan skripsi atau nilai mata kuliah sebagai alat tawar untuk kepentingan personal.</li>
          <li>Mengancam menghambat kelulusan atau mencabut beasiswa jika korban menolak permintaan yang melanggar etika.</li>
          <li>Senioritas organisasi yang menuntut ketaatan buta di luar norma kampus.</li>
        </ul>

        <p class="p-3 bg-sage-50 rounded-xl border border-sage-200 font-medium text-sage-900">
          Setiap sivitas akademika memiliki hak yang setara atas perlakuan adil. Jangan ragu berkonsultasi kepada Satgas PPKPT jika Anda merasakan tekanan relasi kuasa.
        </p>
      </div>
    `
  },
  {
    id: 'edu-5',
    title: 'Dukungan Psikologis Awal (PFA) Teman Sebaya',
    date: '2026-10-20',
    category: 'Dukungan & Empati',
    icon: '🤝',
    author: { name: 'Rafli Dwi Putra, S.M', role: 'Anggota (Tendik)' },
    summary: 'Cara mendengarkan dan menjadi ruang aman bagi rekan yang mengalami masa sulit tanpa menghakimi atau memperkeruh situasi.',
    actionText: 'Pelajari Selengkapnya',
    contentHtml: `
      <div class="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
        <p>
          Dukungan Psikologis Awal (Psychological First Aid/PFA) adalah pertolongan pertama yang dapat diberikan siapa saja untuk rekan yang sedang mengalami krisis, ketakutan, atau pelecehan.
        </p>

        <h4 class="font-bold text-sage-900 text-sm sm:text-base pt-2">Metode 3L yang Aman:</h4>
        <ul class="space-y-2 list-disc pl-5">
          <li><strong>Look (Amati):</strong> Kenali tanda-tanda kecemasan atau penarikan diri rekan Anda.</li>
          <li><strong>Listen (Dengarkan):</strong> Dengarkan tanpa menyela, jangan menghakimi, dan jangan menyalahkan korban (no victim-blaming).</li>
          <li><strong>Link (Hubungkan):</strong> Bantu hubungkan rekan Anda dengan kanal resmi Satgas PPKPT atau layanan konseling profesional kampus.</li>
        </ul>
      </div>
    `
  }
];

// Helper Category & Media Badge untuk Tampilan Publik
function getPublicCategoryBadge(catName) {
  const map = {
    'Kekerasan Seksual': 'text-red-700 bg-red-50 border-red-200',
    'Perundungan (Bullying)': 'text-amber-700 bg-amber-50 border-amber-200',
    'Tindakan Intoleransi': 'text-blue-700 bg-blue-50 border-blue-200',
    'Kekerasan Fisik & Psikis': 'text-purple-700 bg-purple-50 border-purple-200'
  };
  const cls = map[catName] || 'text-sage-700 bg-sage-50 border-sage-200';
  return `<span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${cls} uppercase tracking-wider">${catName || 'Edukasi'}</span>`;
}

function getPublicContentTypeBadge(contentType) {
  if (contentType === 'youtube') {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 shadow-2xs">
      <svg class="w-3.5 h-3.5 fill-red-600 flex-shrink-0" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      <span>YouTube</span>
    </span>`;
  } else if (contentType === 'instagram') {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200 shadow-2xs">
      <svg class="w-3.5 h-3.5 fill-pink-600 flex-shrink-0" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      <span>Instagram</span>
    </span>`;
  }
  return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sage-100 text-sage-800 border border-sage-200 shadow-2xs">
    <svg class="w-3.5 h-3.5 stroke-sage-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
    <span>Artikel Teks</span>
  </span>`;
}

function getYouTubeVideoId(url) {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getInstagramEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:instagram\.com\/(?:p|reel)\/)([\w-]+)/);
  return match ? `https://www.instagram.com/p/${match[1]}/embed` : null;
}

function getAllEducationData() {
  try {
    const raw = localStorage.getItem('upb_ppkpt_custom_edukasi');
    // Jika data sudah pernah diinisialisasi atau dikelola di admin (termasuk jika kosong [])
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const sorted = [...parsed];
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        return sorted;
      }
    }
  } catch (err) {
    console.warn('Gagal membaca data edukasi kustom:', err);
  }

  // Fallback ke data bawaan sistem HANYA jika pengunjung baru dan belum ada data di LocalStorage sama sekali
  const fallback = [...DEFAULT_EDUKASI_DATA];
  fallback.sort((a, b) => new Date(b.date) - new Date(a.date));
  return fallback;
}

// Buka Modal Detail Konten Edukasi Lengkap
function openEducationDetailModal(itemId) {
  const allItems = getAllEducationData();
  const item = allItems.find(i => String(i.id) === String(itemId));
  if (!item) return;

  const modal = document.getElementById('edukasi-detail-modal');
  if (!modal) return;

  const iconEl = document.getElementById('edu-modal-icon');
  const categoryEl = document.getElementById('edu-modal-category');
  const authorEl = document.getElementById('edu-modal-author');
  const dateEl = document.getElementById('edu-modal-date');
  const titleEl = document.getElementById('edu-modal-title');
  const summaryEl = document.getElementById('edu-modal-summary');
  const contentEl = document.getElementById('edu-modal-content');

  const d = new Date(item.date);
  const dateFormatted = isNaN(d.getTime()) ? item.date : d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  if (iconEl) iconEl.textContent = item.icon || (item.contentType === 'youtube' ? '🎥' : item.contentType === 'instagram' ? '📸' : '📄');
  if (categoryEl) categoryEl.textContent = item.category || 'Materi Edukasi';
  if (authorEl) authorEl.textContent = (item.author && item.author.name) ? item.author.name : 'Satgas PPKPT';
  if (dateEl) dateEl.textContent = dateFormatted;
  if (titleEl) titleEl.textContent = item.title;
  if (summaryEl) summaryEl.textContent = item.summary || '';

  if (contentEl) {
    let mediaEmbedHtml = '';

    // Smart Media Embed untuk YouTube & Instagram (Sesuai Rasio Asli Konten)
    if (item.contentType === 'youtube' && item.mediaUrl) {
      const vidId = getYouTubeVideoId(item.mediaUrl);
      const isShorts = item.mediaUrl.includes('/shorts/');
      if (vidId) {
        if (isShorts) {
          mediaEmbedHtml = `
            <div class="flex justify-center my-4">
              <div class="w-full max-w-xs aspect-[9/16] max-h-[540px] rounded-2xl overflow-hidden shadow-md border border-sage-200 bg-black">
                <iframe src="https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0" class="w-full h-full" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          `;
        } else {
          mediaEmbedHtml = `
            <div class="aspect-video w-full rounded-2xl overflow-hidden shadow-sm mb-5 border border-sage-200 bg-black">
              <iframe src="https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0" class="w-full h-full" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          `;
        }
      }
    } else if (item.contentType === 'instagram' && item.mediaUrl) {
      const igUrl = getInstagramEmbedUrl(item.mediaUrl);
      if (igUrl) {
        mediaEmbedHtml = `
          <div class="flex justify-center my-4">
            <div class="w-full max-w-md aspect-[4/5] min-h-[480px] rounded-2xl overflow-hidden border border-sage-200 shadow-md bg-white">
              <iframe src="${igUrl}" class="w-full h-full min-h-[480px]" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
            </div>
          </div>
        `;
      }
    }

    let textBodyHtml = '';
    if (item.contentHtml) {
      textBodyHtml = item.contentHtml;
    } else if (item.content) {
      const paragraphs = item.content.split('\n\n');
      textBodyHtml = `
        <div class="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
          ${paragraphs.map(p => {
            p = p.trim();
            if (p.startsWith('- ') || p.startsWith('• ') || p.startsWith('* ')) {
              const listItems = p.split('\n').map(li => li.replace(/^[-•*]\s*/, '').trim());
              return `<ul class="space-y-1.5 list-disc pl-5">${listItems.map(li => `<li>${li}</li>`).join('')}</ul>`;
            } else if (/^\d+\.\s/.test(p)) {
              const listItems = p.split('\n').map(li => li.replace(/^\d+\.\s*/, '').trim());
              return `<ol class="space-y-1.5 list-decimal pl-5">${listItems.map(li => `<li>${li}</li>`).join('')}</ol>`;
            }
            return `<p>${p.replace(/\n/g, '<br>')}</p>`;
          }).join('')}
        </div>
      `;
    } else {
      textBodyHtml = item.summary ? `<p>${item.summary}</p>` : '';
    }

    contentEl.innerHTML = mediaEmbedHtml + textBodyHtml;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Helper: Render Preview Thumbnail / Media Card untuk Video & Media Sosial (Sesuai Rasio Asli)
function renderCardMediaPreview(item) {
  if (item.contentType === 'youtube' && item.mediaUrl) {
    const vidId = getYouTubeVideoId(item.mediaUrl);
    const isShorts = item.mediaUrl.includes('/shorts/');
    if (vidId) {
      // YouTube Shorts: Rasio Vertikal 9:16 | YouTube Normal: Rasio Lebar 16:9
      const aspectClass = isShorts ? 'aspect-[9/16] max-w-[260px] mx-auto' : 'aspect-video w-full';
      const thumbUrl = `https://img.youtube.com/vi/${vidId}/mqdefault.jpg`;

      return `
        <div class="media-preview-wrapper relative ${aspectClass} rounded-2xl overflow-hidden mb-3.5 bg-black border border-sage-200 group-hover:shadow-md transition-all cursor-pointer" data-media-type="youtube" data-video-id="${vidId}" title="Putar Video">
          <img src="${thumbUrl}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          <div class="absolute inset-0 bg-black/30 group-hover:bg-black/15 flex items-center justify-center transition-colors">
            <button type="button" class="js-play-inline-video w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all cursor-pointer" data-video-id="${vidId}" title="Putar Video">
              <svg class="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>
      `;
    }
  }

  if (item.contentType === 'instagram' && item.mediaUrl) {
    const igUrl = getInstagramEmbedUrl(item.mediaUrl);
    if (igUrl) {
      // Tampilkan embed asli Instagram dalam rasio potret 4:5 resmi (memuat sampul asli, foto/video reel, profil & tombol play Instagram)
      return `
        <div class="media-preview-wrapper relative w-full aspect-[4/5] min-h-[450px] max-w-sm mx-auto rounded-2xl overflow-hidden mb-3.5 border border-sage-200 bg-white shadow-2xs" data-media-type="instagram">
          <iframe src="${igUrl}" class="w-full h-full min-h-[450px]" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
        </div>
      `;
    }
  }

  return '';
}

// Template Generator Kartu Edukasi Publik (Hanya Satu Baris Bersih di Atas dengan Ikon Resmi)
function createEducationCardHtml(item) {
  const d = new Date(item.date);
  const dateFormatted = isNaN(d.getTime()) ? item.date : d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const badge = getPublicCategoryBadge(item.category);
  const typeBadge = getPublicContentTypeBadge(item.contentType);
  const mediaPreviewHtml = renderCardMediaPreview(item);
  const isVideo = item.contentType === 'youtube' || item.contentType === 'instagram';
  const authorName = (item.author && item.author.name) ? item.author.name : 'Satgas PPKPT';

  return `
    <div class="sage-card p-5 flex flex-col justify-between hover:border-sage-500 transition-all group js-open-edu-detail cursor-pointer" data-edu-id="${item.id}">
      <div>
        <!-- CUKUP SATU DI ATAS: BADGES (IKON RESMI) & TANGGAL -->
        <div class="flex items-center justify-between mb-3 gap-2">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${badge}
            ${typeBadge}
          </div>
          <span class="text-[11px] font-semibold text-gray-400 whitespace-nowrap">${dateFormatted}</span>
        </div>

        <!-- Media Preview Video / Instagram Sesuai Rasio -->
        ${mediaPreviewHtml}

        <h4 class="font-bold text-sm text-sage-900 mb-1.5 group-hover:text-sage-700 transition-colors leading-snug">
          ${item.title}
        </h4>
        <p class="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
          ${item.summary || ''}
        </p>
      </div>

      <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs gap-2">
        <div class="flex items-center gap-1.5 text-[11px] text-gray-500 min-w-0 pr-2">
          <svg class="w-3.5 h-3.5 stroke-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="truncate font-medium text-gray-600" title="Diposting oleh ${authorName}">${authorName}</span>
        </div>
        <span class="text-xs font-bold text-sage-700 group-hover:text-sage-900 inline-flex items-center gap-1 whitespace-nowrap flex-shrink-0">
          ${isVideo ? 'Tonton' : 'Baca'} <span>→</span>
        </span>
      </div>
    </div>
  `;
}

function renderBerandaShowcase() {
  const container = document.getElementById('beranda-showcase-container');
  if (!container) return;

  const allItems = getAllEducationData();

  // Jika admin menghapus semua materi (data kosong)
  if (allItems.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-8 text-center text-xs text-gray-500 bg-white rounded-2xl border border-sage-200">
        Belum ada materi edukasi yang dipublikasikan saat ini.
      </div>
    `;
    return;
  }

  // OTOMATIS MENGAMBIL 3 MATERI TERBARU
  const latestThree = allItems.slice(0, 3);
  container.innerHTML = latestThree.map(item => createEducationCardHtml(item)).join('');
}

function renderSemuaEdukasi() {
  const container = document.getElementById('semua-edukasi-container');
  if (!container) return;

  const allItems = getAllEducationData();

  // Jika admin menghapus semua materi (data kosong)
  if (allItems.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-xs text-gray-500 bg-white rounded-2xl border border-sage-200">
        Belum ada materi edukasi atau kegiatan yang dipublikasikan saat ini.
      </div>
    `;
    return;
  }

  container.innerHTML = allItems.map(item => createEducationCardHtml(item)).join('');
}

function initEducationSystem() {
  renderBerandaShowcase();
  renderSemuaEdukasi();

  // Listener sinkronisasi otomatis antar-tab:
  // Ketika admin menyimpan/mengedit konten di admin.html, website publik index.html langsung re-render seketika!
  window.addEventListener('storage', (e) => {
    if (e.key === 'upb_ppkpt_custom_edukasi') {
      renderBerandaShowcase();
      renderSemuaEdukasi();
    }
  });

  // Re-render saat jendela/tab website publik kembali diklik/difokuskan
  window.addEventListener('focus', () => {
    renderBerandaShowcase();
    renderSemuaEdukasi();
  });

  const modal = document.getElementById('edukasi-detail-modal');

  // Handle click untuk inline video play dan pembukaan modal edukasi
  document.addEventListener('click', (e) => {
    // 1. Jika pengguna mengklik tombol play atau wrapper video preview di kartu
    const playBtn = e.target.closest('.js-play-inline-video');
    const previewWrapper = e.target.closest('.media-preview-wrapper');

    if (playBtn || previewWrapper) {
      const wrapper = playBtn ? playBtn.closest('.media-preview-wrapper') : previewWrapper;
      if (wrapper && !wrapper.querySelector('iframe')) {
        const mediaType = wrapper.getAttribute('data-media-type');
        const vidId = wrapper.getAttribute('data-video-id');
        const postUrl = wrapper.getAttribute('data-post-url');

        if (mediaType === 'youtube' && vidId) {
          e.preventDefault();
          e.stopPropagation();
          wrapper.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${vidId}?autoplay=1&rel=0" class="w-full h-full" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `;
          wrapper.classList.remove('cursor-pointer');
          return;
        }

        if (mediaType === 'instagram' && postUrl) {
          const igEmbed = getInstagramEmbedUrl(postUrl);
          if (igEmbed) {
            e.preventDefault();
            e.stopPropagation();
            wrapper.style.minHeight = '480px';
            wrapper.innerHTML = `
              <iframe src="${igEmbed}" class="w-full h-full min-h-[480px] rounded-2xl" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
            `;
            wrapper.classList.remove('cursor-pointer');
            return;
          }
        }
      }
    }

    // 2. Jika mengklik bagian lain kartu, buka modal detail
    const trigger = e.target.closest('.js-open-edu-detail');
    if (trigger) {
      if (e.target.tagName.toLowerCase() === 'iframe') return;
      e.preventDefault();
      const eduId = trigger.getAttribute('data-edu-id');
      if (eduId) {
        openEducationDetailModal(eduId);
      }
    }
  });

  // Close handlers - Modal HANYA tertutup saat tombol "Tutup" diklik (tidak menutup karena klik di luar)
  const closeBtns = document.querySelectorAll('.js-close-edu-modal');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        // Hentikan video yang sedang diputar di modal saat modal ditutup
        const contentEl = document.getElementById('edu-modal-content');
        if (contentEl) contentEl.innerHTML = '';
      }
    });
  });

  // Laporkan dari dalam modal edukasi
  const reportFromEduBtn = document.querySelector('.js-open-report-from-edu');
  if (reportFromEduBtn) {
    reportFromEduBtn.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('hidden');
      }
      const reportModal = document.getElementById('report-modal');
      if (reportModal) {
        reportModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}
