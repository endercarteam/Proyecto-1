const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, unique: true },
  contraseña: String,
  permisos: [String],
  inhabilitado: { type: Boolean, default: false },
  historialReservas: [{
    libro: String,
    fechaReserva: Date,
    fechaEntrega: Date
  }]
});

UsuarioSchema.pre('save', async function (next) {
  if (this.isModified('contraseña')) {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }
  next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
