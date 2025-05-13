const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const nuevoUsuario = new Usuario({
      nombre,
      correo, 
      contraseña,
      permisos:[]
    });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;
  const usuario = await Usuario.findOne({ correo });
  if (!usuario || usuario.inhabilitado) return res.status(404).json({ error: 'Usuario no encontrado' });

  const match = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!match) return res.status(401).json({ error: 'Credenciales incorrectas' });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
  res.json({ token });
};
