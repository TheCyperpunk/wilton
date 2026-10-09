import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'public');
const port = Number(process.env.PORT || 3000);
const gzipAsync = promisify(gzip);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};
const compressible = new Set(['.html', '.css', '.js', '.json', '.svg']);

function cacheControl(extension) {
  if (extension === '.html' || extension === '.json') return 'no-cache';
  if (extension === '.css' || extension === '.js') return 'public, max-age=3600';
  return 'public, max-age=31536000, immutable';
}

async function sendFile(req, res, filePath) {
  const extension = extname(filePath);
  const content = await readFile(filePath);
  const acceptsGzip = compressible.has(extension) && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  const body = acceptsGzip ? await gzipAsync(content, { level: 6 }) : content;
  const headers = {
    'Content-Type': types[extension] || 'application/octet-stream',
    'Cache-Control': cacheControl(extension),
    'Vary': 'Accept-Encoding'
  };
  if (acceptsGzip) headers['Content-Encoding'] = 'gzip';
  res.writeHead(200, headers);
  res.end(body);
}

createServer(async (req, res) => {
  const requested = decodeURIComponent((req.url || '/').split('?')[0]);
  const safePath = normalize(requested).replace(/^\.\.(\/|\\|$)/, '');
  const filePath = join(root, safePath === '/' ? 'index.html' : safePath);
  try {
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error('Not a file');
    await sendFile(req, res, filePath);
  } catch {
    if (!extname(safePath)) {
      await sendFile(req, res, join(root, 'index.html'));
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end('Not found');
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`Wilton listening on 0.0.0.0:${port}`);
});
