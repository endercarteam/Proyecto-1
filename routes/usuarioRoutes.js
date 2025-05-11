const express = require('express');
const { actualizar, inhabilitar } = require('../controllers/usuarioController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.put('/:id', auth, actualizar);
router.delete('/:id', auth, inhabilitar);

module.exports = router;
