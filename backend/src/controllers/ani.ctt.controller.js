const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const aniService = require('../services/ani.service')

const getAnimes = catchAsync(async (req, res) => {
  const anime = await aniService.getBaseAnimes();
  if (anime.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Animes not found');
  }
  res.send(anime);
});

const getAnime = catchAsync(async (req, res) => {
  const anime = await aniService.searchAnime(req.params.aniId);
  if (anime.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Anime not found');
  }
  res.send(anime);
});

const getEpisodes = catchAsync(async (req, res) => {
  const episodes = await aniService.getEpisodes(req.params.aniId);
  if (episodes.length == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Anime not found');
  }
  res.send(episodes);
});

module.exports = {
  getAnimes,
  getAnime,
  getEpisodes
};