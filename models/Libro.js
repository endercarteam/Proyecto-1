const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  genero: String,
  fechaPublicacion: Date,
  editorial: String,
  disponible: { type: Boolean, default: true },
  inhabilitado: { type: Boolean, default: false },
  historialReservas: [{
    usuario: String,
    fechaReserva: Date,
    fechaEntrega: Date
  }]
});

module.exports = mongoose.model('Libro', LibroSchema);
