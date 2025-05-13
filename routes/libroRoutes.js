const express = require('express');
const {
  crear, buscar, buscarPorId, actualizar, inhabilitar
} = require('../controllers/libroController');

const auth = require('../middlewares/authMiddleware');
const permisos = require('../middlewares/permisosMiddleware');
const router = express.Router();

router.post('/crear', auth, permisos('crear_libros'), crear);
router.get('/', buscar);
router.get('/:id', buscarPorId);
router.get('/:id', buscarPorId);
router.put('/modificar/:id', auth, permisos('modificar_libros'), actualizar);
router.delete('/borrar/:id', auth, permisos('inhabilitar_libros'), inhabilitar);

module.exports = router;
