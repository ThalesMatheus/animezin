const Joi = require('joi');

const getAnimes = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAnime = {
  params: Joi.object().keys({
    aniId: Joi.string(),
  }),
};

const getEpisodes = {
  params: Joi.object().keys({
    aniId: Joi.string(),
  }),
};

module.exports = {
  getAnimes,
  getAnime,
  getEpisodes,
};