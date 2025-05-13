const Libro = require('../models/Libro');

exports.crear = async (req, res) => {
  const libro = new Libro(req.body);
  await libro.save();
  res.status(201).json({ mensaje: 'Libro creado' });
};

exports.buscar = async (req, res) => {
   try {
    const { titulo, autor, año, editorial,  disponiblidad} = req.query;

    // Construir filtros dinámicamente
    const filtros = { inhabilitado: false };

    if (titulo && disponiblidad === 'true') {
      // Búsqueda parcial (case insensitive)
      filtros.titulo = { $regex: titulo, $options: 'i' };
    }

    if (autor && disponiblidad === 'true') {
      filtros.autor = { $regex: autor, $options: 'i' };
    }

    if (año && disponiblidad === 'true') {
      filtros.año = año; // Puede ser más elaborado si quieres rangos
    }
    if (editorial && disponiblidad === 'true') {
      // Búsqueda parcial (case insensitive)
      filtros.editorial = { $regex: editorial, $options: 'i' };
    }

    const libros = await Libro.find(filtros);
    res.json(libros);

  } catch (error) {
    res.status(500).json({ error: 'Error al buscar libros' });
  }
};

exports.buscarPorId = async (req, res) => {
  const libro = await Libro.findOne({ _id: req.params.id, inhabilitado: false });
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(libro);
};

exports.actualizar = async (req, res) => {
  if (!req.usuario.permisos.includes('modificar_libros')) {
    return res.status(403).json({ error: 'No autorizado' });
  }
  await Libro.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Libro actualizado' });
};

exports.inhabilitar = async (req, res) => {
  if (!req.usuario.permisos.includes('inhabilitar_libros')) {
    return res.status(403).json({ error: 'No autorizado' });
  }
  await Libro.findByIdAndUpdate(req.params.id, { inhabilitado: true });
  res.json({ mensaje: 'Libro inhabilitado' });
};
