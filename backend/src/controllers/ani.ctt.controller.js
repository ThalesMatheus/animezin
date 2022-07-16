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

const getInfo = catchAsync(async (req, res) => {
  const info = await aniService.getInfo(req.params.aniId);
  if (!info) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Anime not found');
  }
  res.send(info);
});

module.exports = {
  getAnimes,
  getAnime,
  getInfo
};