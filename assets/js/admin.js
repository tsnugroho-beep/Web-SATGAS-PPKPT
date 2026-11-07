/**
 * Satgas PPKPT Universitas Pelita Bangsa - Admin Dashboard Logic
 * Modular State Management, LocalStorage Persistence & JSON Synchronization
 */

// 1. Kategori & Metadata Warna Resmi
const CATEGORIES = {
  'Kekerasan Seksual': {
    label: 'Kekerasan Seksual',
    color: '#EF4444',
    bg: '#FEE2E2',
    text: '#991B1B',
    border: '#FCA5A5',
    icon: '⚠️'
  },
  'Perundungan (Bullying)': {
    label: 'Perundungan (Bullying)',
    color: '#F59E0B',
    bg: '#FEF3C7',
    text: '#92400E',
    border: '#FCD34D',
    icon: '🛑'
  },
  'Tindakan Intoleransi': {
    label: 'Tindakan Intoleransi',
    color: '#3B82F6',
    bg: '#DBEAFE',
    text: '#1E40AF',
    border: '#93C5FD',
    icon: '⚖️'
  },
  'Kekerasan Fisik & Psikis': {
    label: 'Kekerasan Fisik & Psikis',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    text: '#5B21B6',
    border: '#C4B5FD',
    icon: '🛡️'
  }
};

// Data Default Awal (Seeded data yang selaras dengan website publik)
const INITIAL_EDUKASI_DATA = [
  {
    id: 'edu-1',
    title: 'Batasan & Persetujuan (Consent) dalam Relasi Kampus',
    category: 'Kekerasan Seksual',
    date: '2026-11-06',
    image: 'assets/images/logo.jpg',
    icon: '⚖️',
    author: { name: 'Djoko Nugroho, M.Psi.', role: 'Ketua (Dosen)' },
    summary: 'Pahami etika akademik, konsep persetujuan (consent), dan batas kewajaran dalam interaksi antar sivitas tanpa intimidasi relasi kuasa.',
    content: 'Persetujuan (Consent) adalah komunikasi sadar, sukarela, dan setara sebelum melakukan interaksi atau tindakan fisik/personal tertentu.\n\nPrinsip 5 Karakteristik Utama Consent (F.R.I.E.S):\n1. Freely Given (Sukarela Sepenuhnya): Diberikan tanpa paksaan, manipulasi, bujuk rayu berlebihan, atau ancaman relasi kuasa (seperti nilai kuliah atau jabatan organisasi).\n2. Reversible (Dapat Dibatalkan Kapan Saja): Setiap individu berhak mengubah pikiran dan menghentikan persetujuan kapan saja tanpa rasa bersalah.\n3. Informed (Jelas & Sadar): Kedua belah pihak memahami sepenuhnya konsekuensi interaksi.\n4. Enthusiastic (Antusias & Nyata): Consent adalah ekspresi aktif dan kerelaan tulus.\n5. Specific (Spesifik): Menyetujui satu aktivitas tidak berarti menyetujui aktivitas lainnya.\n\nBatas Kewajaran dalam Relasi Akademik:\nKegiatan bimbingan skripsi, tugas, atau praktikum harus dilaksanakan di ruangan kampus resmi atau kanal formal yang transparan pada jam kerja wajar.'
  },
  {
    id: 'edu-2',
    title: 'Stop Perundungan (Bullying) & Pencegahan KBGO',
    category: 'Perundungan (Bullying)',
    date: '2026-11-04',
    image: 'assets/images/logo.jpg',
    icon: '🛑',
    author: { name: 'Dr. Wulan Windiarti, S.H., M.H.', role: 'Sekretaris (Dosen)' },
    summary: 'Kenali bentuk cyberbullying, pelecehan verbal, dan perpeloncoan liar agar dapat mencegahnya sejak dini di lingkungan kita.',
    content: 'Kekerasan Berbasis Gender Online (KBGO) dan perundungan di ruang digital dapat menimbulkan dampak trauma psikologis yang mendalam bagi korban.\n\nBentuk-Bentuk KBGO & Cyberbullying yang Dilarang:\n- Penyebaran Konten Pribadi Tanpa Izin (NCII): Menyebarkan foto, video, atau percakapan pribadi untuk mempermalukan korban.\n- Doxing: Membongkar data pribadi (nomor HP, alamat rumah, akun keluarga) ke publik untuk memprovokasi perundungan massal.\n- Pelecehan Verbal & Cyberstalking: Mengirim pesan intimidatif atau komentar merendahkan secara berulang.\n- Perpeloncoan Liar: Pemaksaan senioritas atau tugas tidak masuk akal yang merendahkan martabat mahasiswa baru.\n\nPanduan Pengamanan:\n1. Ambil tangkapan layar (screenshot) bukti dengan waktu dan akun pengirim yang jelas.\n2. Jangan balas provokasi dan batasi akun pelaku.\n3. Laporkan segera ke Satgas PPKPT untuk pendampingan takedown serta investigasi.'
  },
  {
    id: 'edu-3',
    title: 'Berani Lapor & Jaminan Perlindungan Kerahasiaan Penuh',
    category: 'Kekerasan Fisik & Psikis',
    date: '2026-11-02',
    image: 'assets/images/logo.jpg',
    icon: '🛡️',
    author: { name: 'Khansa Nadya Atika Rahma, S.Psi., M.M.', role: 'Anggota (Tendik)' },
    summary: 'Jangan takut bersuara. Satgas PPKPT menjamin perlindungan kerahasiaan penuh, konseling gratis, dan advokasi objektif.',
    content: 'Satgas PPKPT Universitas Pelita Bangsa menjamin 100% kerahasiaan identitas pelapor dan korban, bebas biaya, serta bebas intimidasi akademik.\n\nHak-Hak Penuh yang Diterima Korban & Pelapor:\n- Kerahasiaan Identitas Mutlak: Identitas Anda tidak akan diumumkan kepada publik maupun pelaku saat tahap awal klarifikasi.\n- Pendampingan Psikologis & Hukum Gratis: Satgas memfasilitasi konseling pemulihan trauma serta bantuan hukum secara bebas biaya.\n- Jaminan Keberlanjutan Studi: Satgas mengawal agar proses akademik, bimbingan, perkuliahan, dan evaluasi nilai Anda tetap berjalan lancar tanpa diskriminasi.\n- Perlindungan Saksi: Rekan yang menjadi saksi dilindungi dari segala bentuk ancaman fisik maupun sosial.'
  },
  {
    id: 'edu-4',
    title: 'Mengenal Relasi Kuasa dan Mitigasi Penyalahgunaannya',
    category: 'Tindakan Intoleransi',
    date: '2026-10-28',
    image: 'assets/images/logo.jpg',
    icon: '⚖️',
    author: { name: "Nabilah Syifa' Savira, S.M.", role: 'Anggota (Tendik)' },
    summary: 'Memahami bagaimana relasi hierarki dapat disalahgunakan serta langkah mitigasi pencegahannya bagi mahasiswa.',
    content: 'Relasi kuasa adalah kondisi ketika satu pihak memiliki kelebihan wewenang, jabatan struktural, pengaruh nilai akademik, atau senioritas yang dapat mempengaruhi nasib pihak lain.\n\nIndikator Penyalahgunaan Relasi Kuasa:\n- Menjadikan persetujuan bimbingan skripsi atau nilai mata kuliah sebagai alat tawar untuk kepentingan personal.\n- Mengancam menghambat kelulusan atau mencabut beasiswa jika korban menolak permintaan yang melanggar etika.\n- Senioritas organisasi yang menuntut ketaatan buta di luar norma kampus.\n\nSetiap sivitas akademika memiliki hak yang setara atas perlakuan adil. Jangan ragu berkonsultasi kepada Satgas PPKPT jika Anda merasakan tekanan relasi kuasa.'
  },
  {
    id: 'edu-5',
    title: 'Dukungan Psikologis Awal (PFA) Antar Teman Sebaya',
    category: 'Kekerasan Fisik & Psikis',
    date: '2026-10-20',
    image: 'assets/images/logo.jpg',
    icon: '🤝',
    author: { name: 'Rafli Dwi Putra, S.M', role: 'Anggota (Tendik)' },
    summary: 'Cara mendengarkan dan menjadi ruang aman bagi rekan yang mengalami masa sulit tanpa menghakimi atau memperkeruh situasi.',
    content: 'Dukungan Psikologis Awal (Psychological First Aid/PFA) adalah pertolongan pertama yang dapat diberikan siapa saja untuk rekan yang sedang mengalami krisis, ketakutan, atau pelecehan.\n\nMetode 3L yang Aman:\n- Look (Amati): Kenali tanda-tanda kecemasan atau penarikan diri rekan Anda.\n- Listen (Dengarkan): Dengarkan tanpa menyela, jangan menghakimi, dan jangan menyalahkan korban (no victim-blaming).\n- Link (Hubungkan): Bantu hubungkan rekan Anda dengan kanal resmi Satgas PPKPT atau layanan konseling profesional kampus.'
  }
];

// LocalStorage Keys
const STORAGE_KEY_MASTER = 'satgas_ppkpt_admin_edukasi';
const STORAGE_KEY_PUBLIC_SYNC = 'upb_ppkpt_custom_edukasi';

// Application State
const AppState = {
  items: [],
  filteredItems: [],
  searchQuery: '',
  selectedCategory: 'ALL',
  sortOrder: 'DATE_DESC',
  viewMode: 'table', // 'table' | 'grid'
  currentPage: 1,
  itemsPerPage: 6,
  activeTab: 'dashboard', // 'dashboard' | 'content' | 'json' | 'settings'
  editingId: null,
  deleteTargetId: null
};

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initNavigation();
  initModals();
  initSearchAndFilters();
  initFormInteractions();
  initJsonView();
  renderAll();
});

// ============================================================================
// 1. DATA PERSISTENCE & SYNC
// ============================================================================
function loadData() {
  try {
    const rawMaster = localStorage.getItem(STORAGE_KEY_MASTER);
    if (rawMaster !== null) {
      AppState.items = JSON.parse(rawMaster);
    } else {
      // Jika belum ada data master, periksa sinkronisasi publik
      const rawPublic = localStorage.getItem(STORAGE_KEY_PUBLIC_SYNC);
      if (rawPublic !== null) {
        AppState.items = JSON.parse(rawPublic);
      } else {
        // HANYA inisialisasi default saat pertama kali website dibuka di peramban baru
        AppState.items = [...INITIAL_EDUKASI_DATA];
      }
      saveData();
    }
  } catch (err) {
    console.error('Gagal memuat data dari LocalStorage:', err);
    AppState.items = [];
  }
}

function saveData() {
  try {
    // 1. Simpan ke master state dashboard
    localStorage.setItem(STORAGE_KEY_MASTER, JSON.stringify(AppState.items));

    // 2. Sinkronkan otomatis ke LocalStorage website publik (upb_ppkpt_custom_edukasi)
    // agar pembaharuan langsung terlihat di index.html
    const formattedForPublic = AppState.items.map(item => ({
      ...item,
      contentHtml: formatContentToHtml(item.content)
    }));
    localStorage.setItem(STORAGE_KEY_PUBLIC_SYNC, JSON.stringify(formattedForPublic));

    updateJsonView();
    updateDashboardMetrics();
  } catch (err) {
    console.error('Gagal menyimpan data:', err);
    showToast('Gagal menyimpan data ke browser!', 'error');
  }
}

// Helper: Konversi teks paragraf dan bullet point ke HTML rapi untuk website publik
function formatContentToHtml(rawText) {
  if (!rawText) return '';
  // Jika sudah HTML, kembalikan langsung
  if (rawText.trim().startsWith('<')) return rawText;

  const paragraphs = rawText.split('\n\n');
  return `
    <div class="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
      ${paragraphs.map(p => {
        p = p.trim();
        if (p.startsWith('- ') || p.startsWith('• ') || p.startsWith('* ')) {
          const items = p.split('\n').map(li => li.replace(/^[-•*]\s*/, '').trim());
          return `<ul class="space-y-1.5 list-disc pl-5">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
        } else if (/^\d+\.\s/.test(p)) {
          const items = p.split('\n').map(li => li.replace(/^\d+\.\s*/, '').trim());
          return `<ol class="space-y-1.5 list-decimal pl-5">${items.map(i => `<li>${i}</li>`).join('')}</ol>`;
        }
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
      }).join('')}
    </div>
  `;
}

// ============================================================================
// 2. NAVIGATION & TABS
// ============================================================================
function initNavigation() {
  const navButtons = document.querySelectorAll('[data-nav-target]');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-nav-target');
      switchTab(target);
    });
  });

  // Mobile sidebar toggle
  const mobileToggle = document.getElementById('mobile-sidebar-toggle');
  const sidebar = document.getElementById('admin-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (mobileToggle && sidebar && sidebarOverlay) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      sidebarOverlay.classList.toggle('hidden');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      sidebarOverlay.classList.add('hidden');
    });
  }
}

function switchTab(tabId) {
  AppState.activeTab = tabId;

  // Sembunyikan semua tab content
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.add('hidden');
  });

  // Tampilkan tab aktif
  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) {
    activeView.classList.remove('hidden');
  }

  // Perbarui styling tombol navigasi sidebar
  document.querySelectorAll('[data-nav-target]').forEach(btn => {
    const target = btn.getAttribute('data-nav-target');
    if (target === tabId) {
      btn.classList.add('bg-sage-100', 'text-sage-900', 'font-bold', 'border', 'border-sage-300');
      btn.classList.remove('text-gray-600', 'hover:bg-sage-50', 'border-transparent');
    } else {
      btn.classList.remove('bg-sage-100', 'text-sage-900', 'font-bold', 'border', 'border-sage-300');
      btn.classList.add('text-gray-600', 'hover:bg-sage-50', 'border-transparent');
    }
  });

  // Tutup sidebar mobile jika terbuka
  const sidebar = document.getElementById('admin-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  if (sidebar && sidebarOverlay && window.innerWidth < 1024) {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Refresh data view spesifik jika perlu
  if (tabId === 'content') {
    applyFiltersAndRender();
  } else if (tabId === 'dashboard') {
    updateDashboardMetrics();
    renderRecentTable();
  } else if (tabId === 'json') {
    updateJsonView();
  }
}

// ============================================================================
// 3. SEARCH, FILTER, SORT & PAGINATION
// ============================================================================
function initSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-select');
  const viewTableBtn = document.getElementById('view-mode-table');
  const viewGridBtn = document.getElementById('view-mode-grid');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.toLowerCase().trim();
      AppState.currentPage = 1;
      applyFiltersAndRender();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      AppState.selectedCategory = e.target.value;
      AppState.currentPage = 1;
      applyFiltersAndRender();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortOrder = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (viewTableBtn && viewGridBtn) {
    viewTableBtn.addEventListener('click', () => {
      AppState.viewMode = 'table';
      viewTableBtn.classList.add('bg-sage-100', 'text-sage-900', 'font-bold');
      viewGridBtn.classList.remove('bg-sage-100', 'text-sage-900', 'font-bold');
      applyFiltersAndRender();
    });

    viewGridBtn.addEventListener('click', () => {
      AppState.viewMode = 'grid';
      viewGridBtn.classList.add('bg-sage-100', 'text-sage-900', 'font-bold');
      viewTableBtn.classList.remove('bg-sage-100', 'text-sage-900', 'font-bold');
      applyFiltersAndRender();
    });
  }
}

function applyFiltersAndRender() {
  let list = [...AppState.items];

  // 1. Search Query
  if (AppState.searchQuery) {
    list = list.filter(item => {
      const title = (item.title || '').toLowerCase();
      const summary = (item.summary || '').toLowerCase();
      const content = (item.content || '').toLowerCase();
      const cat = (item.category || '').toLowerCase();
      return title.includes(AppState.searchQuery) ||
             summary.includes(AppState.searchQuery) ||
             content.includes(AppState.searchQuery) ||
             cat.includes(AppState.searchQuery);
    });
  }

  // 2. Category Filter
  if (AppState.selectedCategory !== 'ALL') {
    list = list.filter(item => item.category === AppState.selectedCategory);
  }

  // 3. Sorting
  list.sort((a, b) => {
    if (AppState.sortOrder === 'DATE_DESC') {
      return new Date(b.date) - new Date(a.date);
    } else if (AppState.sortOrder === 'DATE_ASC') {
      return new Date(a.date) - new Date(b.date);
    } else if (AppState.sortOrder === 'TITLE_ASC') {
      return a.title.localeCompare(b.title);
    } else if (AppState.sortOrder === 'TITLE_DESC') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  AppState.filteredItems = list;
  renderContentList();
  renderPagination();
}

// ============================================================================
// 4. RENDERING VIEWS
// ============================================================================
function renderAll() {
  updateDashboardMetrics();
  renderRecentTable();
  applyFiltersAndRender();
  updateJsonView();
}

function updateDashboardMetrics() {
  const totalItemsEl = document.getElementById('metric-total-items');
  const countSeksualEl = document.getElementById('metric-count-seksual');
  const countBullyingEl = document.getElementById('metric-count-bullying');
  const countIntoleransiEl = document.getElementById('metric-count-intoleransi');
  const countFisikEl = document.getElementById('metric-count-fisik');
  const publicSyncedCountEl = document.getElementById('metric-public-count');

  if (totalItemsEl) totalItemsEl.textContent = AppState.items.length;

  const counts = {
    'Kekerasan Seksual': 0,
    'Perundungan (Bullying)': 0,
    'Tindakan Intoleransi': 0,
    'Kekerasan Fisik & Psikis': 0
  };

  AppState.items.forEach(item => {
    if (counts[item.category] !== undefined) {
      counts[item.category]++;
    }
  });

  if (countSeksualEl) countSeksualEl.textContent = counts['Kekerasan Seksual'];
  if (countBullyingEl) countBullyingEl.textContent = counts['Perundungan (Bullying)'];
  if (countIntoleransiEl) countIntoleransiEl.textContent = counts['Tindakan Intoleransi'];
  if (countFisikEl) countFisikEl.textContent = counts['Kekerasan Fisik & Psikis'];
  if (publicSyncedCountEl) publicSyncedCountEl.textContent = AppState.items.length;

  // Render progress bar & label statistik per kategori
  const total = AppState.items.length;
  const barSeksual = document.getElementById('bar-seksual');
  const barBullying = document.getElementById('bar-bullying');
  const barIntoleransi = document.getElementById('bar-intoleransi');
  const barFisik = document.getElementById('bar-fisik');

  const statSeksual = document.getElementById('stat-seksual');
  const statBullying = document.getElementById('stat-bullying');
  const statIntoleransi = document.getElementById('stat-intoleransi');
  const statFisik = document.getElementById('stat-fisik');

  const pctSeksual = total > 0 ? Math.round((counts['Kekerasan Seksual'] / total) * 100) : 0;
  const pctBullying = total > 0 ? Math.round((counts['Perundungan (Bullying)'] / total) * 100) : 0;
  const pctIntoleransi = total > 0 ? Math.round((counts['Tindakan Intoleransi'] / total) * 100) : 0;
  const pctFisik = total > 0 ? Math.round((counts['Kekerasan Fisik & Psikis'] / total) * 100) : 0;

  if (statSeksual) statSeksual.textContent = `${counts['Kekerasan Seksual']} Materi (${pctSeksual}%)`;
  if (statBullying) statBullying.textContent = `${counts['Perundungan (Bullying)']} Materi (${pctBullying}%)`;
  if (statIntoleransi) statIntoleransi.textContent = `${counts['Tindakan Intoleransi']} Materi (${pctIntoleransi}%)`;
  if (statFisik) statFisik.textContent = `${counts['Kekerasan Fisik & Psikis']} Materi (${pctFisik}%)`;

  const totalDivisor = total || 1;
  if (barSeksual) barSeksual.style.width = `${(counts['Kekerasan Seksual'] / totalDivisor) * 100}%`;
  if (barBullying) barBullying.style.width = `${(counts['Perundungan (Bullying)'] / totalDivisor) * 100}%`;
  if (barIntoleransi) barIntoleransi.style.width = `${(counts['Tindakan Intoleransi'] / totalDivisor) * 100}%`;
  if (barFisik) barFisik.style.width = `${(counts['Kekerasan Fisik & Psikis'] / totalDivisor) * 100}%`;
}

// Render Tabel 4 Materi Terbaru di Dashboard Overview
function renderRecentTable() {
  const container = document.getElementById('dashboard-recent-table-body');
  if (!container) return;

  const sorted = [...AppState.items].sort((a, b) => new Date(b.date) - new Date(a.date));
  const recent = sorted.slice(0, 4);

  if (recent.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-xs text-gray-400">Belum ada materi edukasi.</td></tr>`;
    return;
  }

  container.innerHTML = recent.map(item => {
    const badge = getCategoryBadgeHtml(item.category);
    const dateFormatted = formatDate(item.date);
    return `
      <tr class="border-b border-gray-100 hover:bg-sage-50/50 transition-colors">
        <td class="py-3 px-4">
          <div class="flex items-center gap-3">
            <span class="text-xl flex-shrink-0">${item.icon || '📄'}</span>
            <div class="min-w-0">
              <span class="font-bold text-xs sm:text-sm text-sage-900 block truncate max-w-xs sm:max-w-md">${escapeHtml(item.title)}</span>
              <span class="text-[11px] text-gray-500 block truncate max-w-xs sm:max-w-md">${escapeHtml(item.summary || '')}</span>
            </div>
          </div>
        </td>
        <td class="py-3 px-4 whitespace-nowrap">${badge}</td>
        <td class="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">${dateFormatted}</td>
        <td class="py-3 px-4 text-right whitespace-nowrap">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openPreviewModal('${item.id}')" title="Lihat Pratinjau"
              class="p-1.5 text-gray-500 hover:text-sage-800 hover:bg-sage-100 rounded-lg transition-colors">
              👁️
            </button>
            <button onclick="openEditModal('${item.id}')" title="Edit Materi"
              class="p-1.5 text-gray-500 hover:text-sage-800 hover:bg-sage-100 rounded-lg transition-colors">
              ✏️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Render Tabel / Grid di Halaman Manajemen Konten
function renderContentList() {
  const tableContainer = document.getElementById('content-table-wrapper');
  const gridContainer = document.getElementById('content-grid-wrapper');
  const emptyState = document.getElementById('content-empty-state');
  const counterEl = document.getElementById('content-counter-text');

  if (counterEl) {
    counterEl.textContent = `Menampilkan ${AppState.filteredItems.length} dari ${AppState.items.length} materi edukasi`;
  }

  if (AppState.filteredItems.length === 0) {
    if (tableContainer) tableContainer.classList.add('hidden');
    if (gridContainer) gridContainer.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  // Pagination calculation
  const startIndex = (AppState.currentPage - 1) * AppState.itemsPerPage;
  const endIndex = startIndex + AppState.itemsPerPage;
  const pageItems = AppState.filteredItems.slice(startIndex, endIndex);

  if (AppState.viewMode === 'table') {
    if (tableContainer) tableContainer.classList.remove('hidden');
    if (gridContainer) gridContainer.classList.add('hidden');
    renderTableView(pageItems);
  } else {
    if (tableContainer) tableContainer.classList.add('hidden');
    if (gridContainer) gridContainer.classList.remove('hidden');
    renderGridView(pageItems);
  }
}

function renderTableView(items) {
  const tbody = document.getElementById('content-table-body');
  if (!tbody) return;

  tbody.innerHTML = items.map((item, idx) => {
    const badge = getCategoryBadgeHtml(item.category);
    const dateFormatted = formatDate(item.date);
    const globalIdx = (AppState.currentPage - 1) * AppState.itemsPerPage + idx + 1;

    return `
      <tr class="border-b border-gray-100 hover:bg-sage-50/60 transition-colors group">
        <td class="py-3.5 px-4 text-xs font-semibold text-gray-400 w-12 text-center">${globalIdx}</td>
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-sage-100/80 border border-sage-200 text-sage-800 flex items-center justify-center text-lg flex-shrink-0">
              ${item.icon || '📄'}
            </div>
            <div class="min-w-0 max-w-sm sm:max-w-md lg:max-w-lg">
              <div class="font-bold text-xs sm:text-sm text-sage-900 group-hover:text-sage-700 transition-colors leading-snug truncate">
                ${escapeHtml(item.title)}
              </div>
              <div class="text-[11px] text-gray-500 leading-normal truncate mt-0.5">
                ${escapeHtml(item.summary || '')}
              </div>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-4 whitespace-nowrap">${badge}</td>
        <td class="py-3.5 px-4 whitespace-nowrap text-xs text-gray-600 font-medium">${dateFormatted}</td>
        <td class="py-3.5 px-4 whitespace-nowrap text-right">
          <div class="flex items-center justify-end gap-1">
            <button onclick="openPreviewModal('${item.id}')" title="Pratinjau Materi"
              class="p-2 text-gray-500 hover:text-sage-900 hover:bg-sage-100 rounded-lg transition-colors">
              👁️
            </button>
            <button onclick="openEditModal('${item.id}')" title="Edit Materi"
              class="p-2 text-gray-500 hover:text-sage-900 hover:bg-sage-100 rounded-lg transition-colors">
              ✏️
            </button>
            <button onclick="duplicateItem('${item.id}')" title="Duplikasi Materi"
              class="p-2 text-gray-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors">
              📋
            </button>
            <button onclick="confirmDeleteItem('${item.id}')" title="Hapus Materi"
              class="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderGridView(items) {
  const grid = document.getElementById('content-grid-cards');
  if (!grid) return;

  grid.innerHTML = items.map(item => {
    const badge = getCategoryBadgeHtml(item.category);
    const dateFormatted = formatDate(item.date);

    return `
      <div class="sage-card bg-white p-5 rounded-2xl border border-sage-200 shadow-sm hover:border-sage-400 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="w-10 h-10 rounded-xl bg-sage-50 border border-sage-200 text-sage-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              ${item.icon || '📄'}
            </div>
            <span class="text-[11px] font-semibold text-gray-400">${dateFormatted}</span>
          </div>

          <div class="mb-2">
            ${badge}
          </div>

          <h4 class="font-bold text-sm text-sage-900 mb-2 leading-snug group-hover:text-sage-700 transition-colors line-clamp-2">
            ${escapeHtml(item.title)}
          </h4>

          <p class="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
            ${escapeHtml(item.summary || '')}
          </p>
        </div>

        <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
          <button onclick="openPreviewModal('${item.id}')"
            class="text-xs font-bold text-sage-700 hover:text-sage-900 flex items-center gap-1">
            Pratinjau <span>→</span>
          </button>
          <div class="flex items-center gap-1">
            <button onclick="openEditModal('${item.id}')" title="Edit"
              class="p-1.5 text-gray-500 hover:text-sage-900 hover:bg-sage-100 rounded-lg transition-colors">
              ✏️
            </button>
            <button onclick="duplicateItem('${item.id}')" title="Duplikasi"
              class="p-1.5 text-gray-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors">
              📋
            </button>
            <button onclick="confirmDeleteItem('${item.id}')" title="Hapus"
              class="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderPagination() {
  const container = document.getElementById('pagination-container');
  if (!container) return;

  const totalPages = Math.ceil(AppState.filteredItems.length / AppState.itemsPerPage) || 1;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <div class="flex items-center gap-1.5">
      <button onclick="changePage(${AppState.currentPage - 1})" ${AppState.currentPage === 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : ''}
        class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-sage-50 transition-colors">
        ← Sebelumnya
      </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === AppState.currentPage;
    html += `
      <button onclick="changePage(${i})"
        class="w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
          isActive
            ? 'bg-sage-700 text-white shadow-sm'
            : 'border border-gray-200 bg-white text-gray-700 hover:bg-sage-50'
        }">
        ${i}
      </button>
    `;
  }

  html += `
      <button onclick="changePage(${AppState.currentPage + 1})" ${AppState.currentPage === totalPages ? 'disabled class="opacity-40 cursor-not-allowed"' : ''}
        class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-sage-50 transition-colors">
        Selanjutnya →
      </button>
    </div>
  `;

  container.innerHTML = html;
}

window.changePage = function(page) {
  const totalPages = Math.ceil(AppState.filteredItems.length / AppState.itemsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  AppState.currentPage = page;
  renderContentList();
  renderPagination();
};

// ============================================================================
// 5. MODAL FORM & INTERACTIONS (STRICT CLOSING RULE)
// ============================================================================
function initModals() {
  // Modal Form (Add/Edit)
  const formModal = document.getElementById('form-modal');
  const closeFormBtns = document.querySelectorAll('.js-close-form-modal');

  // Strict Rule: HANYA menutup saat tombol "Batal / Tutup" diklik!
  // Backdrop click TIDAK akan menutup modal untuk mencegah kehilangan input pengguna yang belum tersimpan.
  closeFormBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeFormModal();
    });
  });

  // Modal Preview
  const closePreviewBtns = document.querySelectorAll('.js-close-preview-modal');
  closePreviewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closePreviewModal();
    });
  });

  // Modal Delete
  const cancelDeleteBtn = document.getElementById('btn-cancel-delete');
  const confirmDeleteBtn = document.getElementById('btn-confirm-delete');

  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', () => {
      closeDeleteModal();
    });
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      executeDelete();
    });
  }
}

function initFormInteractions() {
  const form = document.getElementById('edukasi-form');
  const titleInput = document.getElementById('form-title');
  const categorySelect = document.getElementById('form-category');
  const dateInput = document.getElementById('form-date');
  const iconInput = document.getElementById('form-icon');
  const summaryInput = document.getElementById('form-summary');
  const contentInput = document.getElementById('form-content');
  const imageInput = document.getElementById('form-image');

  // Real-time Preview Updater
  const inputsToWatch = [titleInput, categorySelect, dateInput, iconInput, summaryInput, contentInput, imageInput];
  inputsToWatch.forEach(input => {
    if (input) {
      input.addEventListener('input', updateFormLivePreview);
      input.addEventListener('change', updateFormLivePreview);
    }
  });

  // Quick Emoji Selector
  document.querySelectorAll('.js-emoji-choice').forEach(emojiBtn => {
    emojiBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = emojiBtn.getAttribute('data-emoji');
      if (iconInput && val) {
        iconInput.value = val;
        updateFormLivePreview();
      }
    });
  });

  // Submit Handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      saveFormItem();
    });
  }
}

function updateFormLivePreview() {
  const title = document.getElementById('form-title')?.value || 'Judul Materi Edukasi...';
  const category = document.getElementById('form-category')?.value || 'Kekerasan Seksual';
  const date = document.getElementById('form-date')?.value || new Date().toISOString().split('T')[0];
  const icon = document.getElementById('form-icon')?.value || '📄';
  const summary = document.getElementById('form-summary')?.value || 'Ringkasan singkat materi edukasi akan tampil di kartu pratinjau...';

  const previewTitle = document.getElementById('preview-box-title');
  const previewBadge = document.getElementById('preview-box-badge');
  const previewDate = document.getElementById('preview-box-date');
  const previewIcon = document.getElementById('preview-box-icon');
  const previewSummary = document.getElementById('preview-box-summary');

  if (previewTitle) previewTitle.textContent = title;
  if (previewBadge) previewBadge.innerHTML = getCategoryBadgeHtml(category);
  if (previewDate) previewDate.textContent = formatDate(date);
  if (previewIcon) previewIcon.textContent = icon;
  if (previewSummary) previewSummary.textContent = summary;
}

window.openAddModal = function() {
  AppState.editingId = null;
  const modal = document.getElementById('form-modal');
  const form = document.getElementById('edukasi-form');
  const modalTitle = document.getElementById('form-modal-title');

  if (form) form.reset();
  if (modalTitle) modalTitle.textContent = 'Tambah Materi Edukasi & Kegiatan Baru';

  // Set default values
  const dateInput = document.getElementById('form-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  const iconInput = document.getElementById('form-icon');
  if (iconInput) iconInput.value = '⚠️';

  const imageInput = document.getElementById('form-image');
  if (imageInput) imageInput.value = 'assets/images/logo.jpg';

  updateFormLivePreview();

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.openEditModal = function(id) {
  const item = AppState.items.find(i => i.id === id);
  if (!item) return;

  AppState.editingId = id;
  const modal = document.getElementById('form-modal');
  const modalTitle = document.getElementById('form-modal-title');

  if (modalTitle) modalTitle.textContent = 'Edit Materi Edukasi & Kegiatan';

  document.getElementById('form-title').value = item.title || '';
  document.getElementById('form-category').value = item.category || 'Kekerasan Seksual';
  document.getElementById('form-date').value = item.date || new Date().toISOString().split('T')[0];
  document.getElementById('form-icon').value = item.icon || '📄';
  document.getElementById('form-image').value = item.image || 'assets/images/logo.jpg';
  document.getElementById('form-summary').value = item.summary || '';
  document.getElementById('form-content').value = item.content || '';

  updateFormLivePreview();

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

function closeFormModal() {
  const modal = document.getElementById('form-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  AppState.editingId = null;
}

function saveFormItem() {
  const title = document.getElementById('form-title')?.value.trim();
  const category = document.getElementById('form-category')?.value;
  const date = document.getElementById('form-date')?.value;
  const icon = document.getElementById('form-icon')?.value.trim() || '📄';
  const image = document.getElementById('form-image')?.value.trim() || 'assets/images/logo.jpg';
  const summary = document.getElementById('form-summary')?.value.trim();
  const content = document.getElementById('form-content')?.value.trim();

  if (!title) {
    showToast('Judul materi wajib diisi!', 'warning');
    return;
  }
  if (!summary) {
    showToast('Ringkasan materi wajib diisi!', 'warning');
    return;
  }

  if (AppState.editingId) {
    // Mode Edit
    const index = AppState.items.findIndex(i => i.id === AppState.editingId);
    if (index !== -1) {
      AppState.items[index] = {
        ...AppState.items[index],
        title,
        category,
        date,
        icon,
        image,
        summary,
        content
      };
      showToast('Materi berhasil diperbarui!', 'success');
    }
  } else {
    // Mode Tambah Baru
    const newId = 'edu-' + Date.now();
    const newItem = {
      id: newId,
      title,
      category,
      date,
      icon,
      image,
      summary,
      content
    };
    AppState.items.unshift(newItem); // Tambahkan ke urutan paling depan
    showToast('Materi baru berhasil ditambahkan!', 'success');
  }

  saveData();
  closeFormModal();
  renderAll();
}

window.duplicateItem = function(id) {
  const original = AppState.items.find(i => i.id === id);
  if (!original) return;

  const duplicated = {
    ...original,
    id: 'edu-' + Date.now(),
    title: `${original.title} (Salinan)`,
    date: new Date().toISOString().split('T')[0]
  };

  AppState.items.unshift(duplicated);
  saveData();
  renderAll();
  showToast('Materi berhasil diduplikasi!', 'info');
};

// ============================================================================
// 6. PREVIEW & DELETE MODALS
// ============================================================================
window.openPreviewModal = function(id) {
  const item = AppState.items.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById('preview-modal');
  if (!modal) return;

  document.getElementById('preview-modal-icon').textContent = item.icon || '📄';
  document.getElementById('preview-modal-badge').innerHTML = getCategoryBadgeHtml(item.category);
  document.getElementById('preview-modal-date').textContent = formatDate(item.date);
  document.getElementById('preview-modal-title').textContent = item.title;
  document.getElementById('preview-modal-summary').textContent = item.summary || '';

  const contentBox = document.getElementById('preview-modal-content');
  if (contentBox) {
    contentBox.innerHTML = formatContentToHtml(item.content);
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

function closePreviewModal() {
  const modal = document.getElementById('preview-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

window.confirmDeleteItem = function(id) {
  const item = AppState.items.find(i => i.id === id);
  if (!item) return;

  AppState.deleteTargetId = id;
  const modal = document.getElementById('delete-modal');
  const titleEl = document.getElementById('delete-modal-item-title');

  if (titleEl) titleEl.textContent = `"${item.title}"`;
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

function closeDeleteModal() {
  const modal = document.getElementById('delete-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  AppState.deleteTargetId = null;
}

function executeDelete() {
  if (!AppState.deleteTargetId) return;

  AppState.items = AppState.items.filter(i => i.id !== AppState.deleteTargetId);
  saveData();
  closeDeleteModal();
  renderAll();
  showToast('Materi berhasil dihapus!', 'info');
}

// ============================================================================
// 7. JSON VIEW & EXPORT / IMPORT TOOLS
// ============================================================================
function initJsonView() {
  const copyBtn = document.getElementById('btn-copy-json');
  const exportBtn = document.getElementById('btn-export-json');
  const importBtn = document.getElementById('btn-import-json');
  const applyImportBtn = document.getElementById('btn-apply-import');
  const resetDefaultBtn = document.getElementById('btn-reset-default-data');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyJsonToClipboard();
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportJsonFile();
    });
  }

  if (importBtn) {
    importBtn.addEventListener('click', () => {
      openImportModal();
    });
  }

  if (applyImportBtn) {
    applyImportBtn.addEventListener('click', () => {
      executeJsonImport();
    });
  }

  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin memulihkan data ke 5 materi awal bawaan sistem? Data kustom Anda akan ditimpa.')) {
        AppState.items = [...INITIAL_EDUKASI_DATA];
        saveData();
        renderAll();
        showToast('Data berhasil dipulihkan ke setelan default!', 'info');
      }
    });
  }

  const clearAllBtn = document.getElementById('btn-clear-all-data');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin MENGHAPUS SEMUA materi edukasi? Halaman publik akan dikosongkan.')) {
        AppState.items = [];
        saveData();
        renderAll();
        showToast('Seluruh materi edukasi berhasil dikosongkan!', 'warning');
      }
    });
  }
}

function updateJsonView() {
  const jsonViewer = document.getElementById('json-code-viewer');
  if (jsonViewer) {
    jsonViewer.textContent = JSON.stringify(AppState.items, null, 2);
  }
}

function copyJsonToClipboard() {
  const jsonString = JSON.stringify(AppState.items, null, 2);
  navigator.clipboard.writeText(jsonString).then(() => {
    showToast('Data JSON berhasil disalin ke clipboard!', 'success');
  }).catch(err => {
    console.error('Gagal menyalin:', err);
    showToast('Gagal menyalin ke clipboard!', 'error');
  });
}

function exportJsonFile() {
  const jsonString = JSON.stringify(AppState.items, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `data-edukasi-satgas-upb-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('File JSON berhasil diunduh!', 'success');
}

function openImportModal() {
  const modal = document.getElementById('import-modal');
  const textarea = document.getElementById('import-json-textarea');
  if (textarea) textarea.value = '';
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

window.closeImportModal = function() {
  const modal = document.getElementById('import-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

function executeJsonImport() {
  const textarea = document.getElementById('import-json-textarea');
  const raw = textarea?.value.trim();

  if (!raw) {
    showToast('Tempelkan teks JSON sebelum memproses!', 'warning');
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error('Data JSON harus berupa array objek [...]');
    }

    // Validasi minimal ada title
    const validItems = parsed.filter(item => item && item.title);
    if (validItems.length === 0) {
      throw new Error('Tidak ditemukan objek materi edukasi yang valid.');
    }

    // Pastikan setiap item memiliki ID
    const sanitized = validItems.map((item, idx) => ({
      ...item,
      id: item.id || `edu-import-${Date.now()}-${idx}`
    }));

    AppState.items = sanitized;
    saveData();
    closeImportModal();
    renderAll();
    showToast(`Berhasil mengimpor ${sanitized.length} materi edukasi!`, 'success');
  } catch (err) {
    alert(`Format JSON tidak valid: ${err.message}`);
  }
}

// ============================================================================
// 8. HELPERS & UTILITIES
// ============================================================================
function getCategoryBadgeHtml(categoryName) {
  const cat = CATEGORIES[categoryName] || {
    label: categoryName || 'Umum',
    color: '#6B8E73',
    bg: '#EAF0EC',
    text: '#2B3D31',
    border: '#C4D3C8',
    icon: '📄'
  };

  return `
    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border"
          style="background-color: ${cat.bg}; color: ${cat.text}; border-color: ${cat.border};">
      <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${cat.color};"></span>
      ${escapeHtml(cat.label)}
    </span>
  `;
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Toast Feedback Notification
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-sage-900 text-white border-sage-700',
    warning: 'bg-amber-600 text-white border-amber-500',
    error: 'bg-rose-700 text-white border-rose-600',
    info: 'bg-sage-800 text-white border-sage-600'
  };

  const icons = {
    success: '✓',
    warning: '⚠️',
    error: '✕',
    info: 'ℹ️'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg transform transition-all duration-300 translate-y-3 opacity-0 text-xs sm:text-sm font-semibold pointer-events-auto ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs flex-shrink-0">${icons[type]}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  });

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

