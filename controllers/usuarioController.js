const Usuario = require('../models/Usuario');

exports.actualizar = async (req, res) => {
  if (req.usuario._id.toString() !== req.params.id && !req.usuario.permisos.includes('modificar_usuarios')) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  await Usuario.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Usuario actualizado' });
};

exports.inhabilitar = async (req, res) => {
  if (req.usuario._id.toString() !== req.params.id && !req.usuario.permisos.includes('inhabilitar_usuarios')) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  await Usuario.findByIdAndUpdate(req.params.id, { inhabilitado: true });
  res.json({ mensaje: 'Usuario inhabilitado' });
};
