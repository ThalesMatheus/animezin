const axios = require('axios')

const {
    BASE_URL,
    EP_PATTERN,
    TITLE_PATTERN,
    EPISODE_BANNER,
    DESCRIPTION_PATTERN,
    INFO_BANNER_PATTERN,
    INFO_TYPE_PATTERN,
    INFO_GENRE_PATTERN,
    INFO_RELEASED_PATTERN,
    INFO_STATUS_PATTERN,
    INFO_OTHERNAME_PATTERN,
    INFO_DIV_PATTERN
} = require('../config/config')

async function getBaseAnimes(){
    let res
    try {
        res = await axios.get(`https://gogoanime.lu`)
    } catch (e) {
        throw e.responseCode
    }
    const bannerMatches = [...res.data.matchAll(EPISODE_BANNER)]
    let anime = []
    for (let i = 0; i < bannerMatches.length; i++) {
        anime.push({
            'animeId': bannerMatches[i] ? (bannerMatches[i][1] ? bannerMatches[i][1].split("-episode")[0] : 'Anime not found') : 'Id not found',
            'animeTitle': bannerMatches[i] ? (bannerMatches[i][2] ? bannerMatches[i][2] : 'Anime not found') : 'Id not found',
            'animeBanner': bannerMatches[i] ? (bannerMatches[i][3] ? bannerMatches[i][3] : 'Banner not found') : 'Id not found'
        })
    }
    return anime
}

async function searchAnime(animeQuery) {
    let res
    try {
        res = await axios.get(`${BASE_URL}//search.html?keyword=${animeQuery}`)
    } catch(e) {
        throw e.responseCode
    }
    const bannerMatches = [...res.data.matchAll(EPISODE_BANNER)]
    let anime = []
    for (let i = 0; i < bannerMatches.length; i++) {
        anime.push({
            'animId': bannerMatches[i][1] ? bannerMatches[i][1].split("category/")[1] : 'null',
            'animeTitle': bannerMatches[i][2] ? bannerMatches[i][2] : 'null',
            'animeBanner': bannerMatches[i][3] ? (bannerMatches[i][3] ? bannerMatches[i][3] : 'Banner not found') : 'Id not found',
        })
    }
    return anime
}

async function getInfo(animeQuery){
    let res
    try {
        res = await axios.get(`${BASE_URL}/category/${animeQuery}`)
    } catch(e) {
        throw e.responseCode
    }
    const infoMatches = [...res.data.matchAll(INFO_DIV_PATTERN)].at(-1)[0]

    const episodeMatches = [...res.data.matchAll(EP_PATTERN)]

    const infoBanner = [...infoMatches.matchAll(INFO_BANNER_PATTERN)]
    const typeMatch = [...infoMatches.matchAll(INFO_TYPE_PATTERN)]
    const descriptionMatch = [...infoMatches.matchAll(DESCRIPTION_PATTERN)]
    const genreMatch = [...infoMatches.matchAll(INFO_GENRE_PATTERN)]
    const releaseMatch = [...infoMatches.matchAll(INFO_RELEASED_PATTERN)]
    const statusMatch = [...infoMatches.matchAll(INFO_STATUS_PATTERN)]
    const othernameMatch = [...infoMatches.matchAll(INFO_OTHERNAME_PATTERN)]
    anime = {
        'animeBanner': infoBanner.at(-1)[1] ? infoBanner.at(-1)[1] : 'null',
        'maxEpisodes': episodeMatches.at(-1)[1] ? episodeMatches.at(-1)[1] : 'null',
        'animeType': {
            'typeId': typeMatch.at(-1)[1] ? typeMatch.at(-1)[1] : 'null',
            'typeTitle': typeMatch.at(-1)[2] ? typeMatch.at(-1)[2] : 'null'
        },
        'genres': genreMatch.map((val) => {
            return {
                'genreId': val[1] ? val[1] : 'null',
                'genreTitle': val[2] ? val[2] : 'null'
            }
        }),
        'release': releaseMatch.at(-1)[1] ? releaseMatch.at(-1)[1] : 'null',
        'description': descriptionMatch.at(-1)[1] ? descriptionMatch.at(-1)[1] : 'null',
        'status': statusMatch.at(-1)[1] ? statusMatch.at(-1)[1] : 'null',
        'otherName': othernameMatch.at(-1)[1] ? othernameMatch.at(-1)[1] : 'null',
    }
    return anime
}

module.exports = {
    searchAnime,
    getInfo,
    getBaseAnimes,
}