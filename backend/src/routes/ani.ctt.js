const express = require('express');
const validate = require('../middlewares/validate');
const aniValidation = require('../validations/ani.ctt.validation');
const aniController = require('../controllers/ani.ctt.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(aniValidation.getAnimes), aniController.getAnimes);

router
  .route('/:aniId')
  .get(validate(aniValidation.getAnime), aniController.getAnime);

module.exports = router;
