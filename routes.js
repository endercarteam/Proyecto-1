import url from 'url';
import querystring from 'querystring';

import auth from './middlewares/auth.js';
import usuariosCtrl from './controllers/usuarios.js';
import librosCtrl    from './controllers/libros.js';

export async function router(req, res) {
  const { pathname, query } = url.parse(req.url);
  req.query = querystring.parse(query || '');

  // --- USUARIOS ---
  if (pathname.startsWith('/usuarios')) {
    // registro y login no llevan auth
    if (!(
      req.method==='POST' && pathname === '/usuarios' ||
      req.method==='POST' && pathname === '/usuarios/login'
    )) {
      await auth(req, res);
    }
    return usuariosCtrl(req, res);
  }

  // --- LIBROS ---
  if (pathname.startsWith('/libros')) {
    if (req.method !== 'GET') await auth(req, res);
    return librosCtrl(req, res);
  }

  // 404
  res.writeHead(404, {'Content-Type':'application/json'});
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
}
