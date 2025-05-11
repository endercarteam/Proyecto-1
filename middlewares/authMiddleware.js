const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario || usuario.inhabilitado) {
      return res.status(403).json({ error: 'Usuario no válido' });
    }
    req.usuario = usuario;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};
