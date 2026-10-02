import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out/', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.woff2': 'font/woff2' };

const withinRoot = (filename) => {
  const relative = path.relative(root, filename);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
};

const rscFallback = (filename) => {
  if (path.extname(filename) !== '.txt') return null;

  const basename = path.basename(filename);
  const match = /^(__next\.[^.]+)(?:\.(.+))\.txt$/.exec(basename);
  if (!match) return null;

  const segments = match[2].split('.');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..' || segment.includes('/') || segment.includes('\\'))) return null;

  return path.join(path.dirname(filename), match[1], ...segments.slice(0, -1), `${segments.at(-1)}.txt`);
};

createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.includes('\\')) {
      res.writeHead(403).end();
      return;
    }

    const filename = path.resolve(root, `.${pathname}`);
    if (!withinRoot(filename)) {
      res.writeHead(403).end();
      return;
    }

    const fallback = rscFallback(filename);
    if (fallback && !withinRoot(fallback)) {
      res.writeHead(403).end();
      return;
    }

    let selected;
    for (const candidate of [filename, fallback, `${filename}.html`, path.join(filename, 'index.html')]) {
      if (candidate && withinRoot(candidate) && (await stat(candidate).catch(() => null))?.isFile()) {
        selected = candidate;
        break;
      }
    }

    const status = selected ? 200 : 404;
    selected ??= path.join(root, '404.html');
    const data = await readFile(selected);
    res.writeHead(status, { 'Content-Type': types[path.extname(selected)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(400).end('Bad request');
  }
}).listen(port, '127.0.0.1', () => console.log(`Portfolio production preview: http://127.0.0.1:${port}`));
