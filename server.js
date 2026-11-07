const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

const server = http.createServer((req, res) => {
  // Normalize URL and remove query params / hash
  let reqUrl = decodeURI(req.url.split('?')[0].split('#')[0]);

  // Routing shortcuts
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  } else if (reqUrl === '/admin' || reqUrl === '/admin/') {
    reqUrl = '/admin.html';
  }

  // Prevent directory traversal attacks
  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(BASE_DIR, safePath);

  // If directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 Not Found
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="id">
        <head><meta charset="utf-8"><title>404 - Halaman Tidak Ditemukan</title></head>
        <body style="font-family:sans-serif;text-align:center;padding:50px;background:#F4F7F5;color:#2B3D31;">
          <h2>404 - Halaman Tidak Ditemukan</h2>
          <p>File atau rute <code>${reqUrl}</code> tidak ditemukan.</p>
          <p><a href="/" style="color:#4A6B53;font-weight:bold;">← Kembali ke Beranda</a> | <a href="/admin.html" style="color:#4A6B53;font-weight:bold;">Portal Admin →</a></p>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // CORS & Cache control for dev
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n======================================================');
  console.log('  🚀 SERVER LOCAL SATGAS PPKPT UPB BERJALAN!');
  console.log('======================================================');
  console.log(`  🌐 Website Utama : http://localhost:${PORT}/`);
  console.log(`  🔒 Portal Admin  : http://localhost:${PORT}/admin.html`);
  console.log('======================================================');
  console.log('  Tekan Ctrl + C di terminal untuk menghentikan server.\n');
});
