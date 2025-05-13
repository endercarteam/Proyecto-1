const Usuario = require('../models/Usuario');

const Usuario = require('../models/Usuario');

exports.actualizar = async (req, res) => {
  try {
    const idUsuario = req.params.id;
    const usuarioLogeado = req.usuario;

    
    const puedeModificar = usuarioLogeado._id.toString() === idUsuario || usuarioLogeado.permisos.includes('modificar_usuarios');
    if (!puedeModificar) {
      return res.status(403).json({ error: 'No autorizado para modificar este usuario' });
    }

    
    if ('permisos' in req.body && !usuarioLogeado.permisos.includes('modificar_permisos')) {
      return res.status(403).json({ error: 'No autorizado para modificar permisos' });
    }

    
    if ('_id' in req.body) {
      delete req.body._id;
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(idUsuario, req.body, {
      new: true,
      runValidators: true
    });

    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });

  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

exports.inhabilitar = async (req, res) => {
  if (req.usuario._id.toString() !== req.params.id && !req.usuario.permisos.includes('inhabilitar_usuarios')) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  await Usuario.findByIdAndUpdate(req.params.id, { inhabilitado: true });
  res.json({ mensaje: 'Usuario inhabilitado' });
};
