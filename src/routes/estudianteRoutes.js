const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.get('/estudiantes', estudianteController.getEstudiantes);

module.exports = router;
