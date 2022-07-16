const Joi = require('joi');

const getAnimes = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    letter: Joi.string().length(1).pattern(/[A-Z0]/)
  }),
};

const getAnime = {
  params: Joi.object().keys({
    aniId: Joi.string()
  }),
};

const getInfo = {
  params: Joi.object().keys({
    aniId: Joi.string(),
  }),
};

module.exports = {
  getAnimes,
  getAnime,
  getInfo,
};