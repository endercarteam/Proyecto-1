const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/libros', require('./routes/libroRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
mongoose.connection
  .on('connected', () => console.log('🟢 Conectado a MongoDB'))
  .on('error', err => console.error('🔴 Error de conexión a MongoDB:', err))
  .on('disconnected', () => console.log('🔴 Desconectado de MongoDB'))
