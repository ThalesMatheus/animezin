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

router
  .route('/:aniId/info')
  .get(validate(aniValidation.getInfo), aniController.getInfo);

module.exports = router;
