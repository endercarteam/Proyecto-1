import crypto from 'crypto';
import { ObjectId, collection } from '../utils/db.js';
import { jsonBody, sendJSON } from '../utils/http.js';

const getUsuarios = collection('usuarios');

export default async function usuariosCtrl(req, res) {
  const usuarios = await getUsuarios();

  // 1) Registro: POST /usuarios
  if (req.method==='POST' && req.url === '/usuarios') {
    const { nombre, correo, password } = await jsonBody(req);
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const token = crypto.randomBytes(16).toString('hex');
    const nuevo = { nombre, correo, password: hash, activo: true, token };
    const { insertedId } = await usuarios.insertOne(nuevo);
    return sendJSON(res, 201, { id: insertedId, token });
  }

  // 2) Login: POST /usuarios/login
  if (req.method==='POST' && req.url === '/usuarios/login') {
    const { correo, password } = await jsonBody(req);
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const user = await usuarios.findOne({ correo, password: hash, activo: true });
    if (!user) return sendJSON(res, 401, { error:'Credenciales inválidas' });
    // Renueva token
    const token = crypto.randomBytes(16).toString('hex');
    await usuarios.updateOne({ _id: user._id }, { $set: { token } });
    return sendJSON(res, 200, { token });
  }

  // 3) GET /usuarios/:id
  const match = req.url.match(/^\/usuarios\/([^\/]+)/);
  if (match && req.method==='GET') {
    const id = match[1];
    const u = await usuarios.findOne({ _id: new ObjectId(id), activo: true });
    return sendJSON(res, u ? 200 : 404, u || { error:'No encontrado' });
  }

  // 4) PATCH /usuarios/:id
  if (match && req.method==='PATCH') {
    const id = match[1];
    const cambios = await jsonBody(req);
    await usuarios.updateOne({ _id: new ObjectId(id) }, { $set: cambios });
    return sendJSON(res, 200, { actualizado:true });
  }

  // 5) DELETE (soft) /usuarios/:id
  if (match && req.method==='DELETE') {
    const id = match[1];
    await usuarios.updateOne({ _id: new ObjectId(id) }, { $set: { activo:false } });
    return sendJSON(res, 200, { inhabilitado:true });
  }

  // Si nada coincide:
  res.writeHead(405, {'Content-Type':'application/json'});
  res.end(JSON.stringify({ error:'Método no permitido' }));
}
