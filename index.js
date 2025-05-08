import http from 'http';
import { router } from './routes.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (err) {
    if (!res.headersSent) {
      res.writeHead(500, {'Content-Type':'application/json'});
      res.end(JSON.stringify({ error: 'Error interno' }));
    }
    console.error(err);
  }
});

server.listen(PORT, () =>
  console.log(`🚀 API escuchando en http://localhost:${PORT}`)
);
