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
    INFO_DIV_PATTERN,
    LIST_PATTERN,
    LIST_DESCRIPTION_PATTERN,
    LIST_BANNER_PATTERN,
    LIST_STATUS_PATTERN,
    LIST_TITLE_PATTERN,
    REFERER_PATTERN,
    VIDEO_PATTERN
} = require('../config/config')

async function getBaseAnimes(query){
    let res
    try {
        if (query && query.page){
            res = await axios.get(`https://gogoanime.lu/anime-list.html?page=${query.page}`)
        }else if (query && query.letter){
            res = await axios.get(`https://gogoanime.lu/anime-list-${query.letter}`)
        }else {
            res = await axios.get(`https://gogoanime.lu`)
        }
    } catch (e) {
        throw e.responseCode
    }
    let anime = []
    if ((query && query.page) || (query && query.letter)){
        const descriptionMatch = [...res.data.matchAll(LIST_DESCRIPTION_PATTERN)]
        const titleMatch = [...res.data.matchAll(LIST_TITLE_PATTERN)]
        const listMatches = [...res.data.matchAll(LIST_PATTERN)]
        for (let i = 0; i < listMatches.length; i++) {
            const list = listMatches[i]
            const bannerMatch = [...list[0].matchAll(LIST_BANNER_PATTERN)]
            const genreMatch = [...list[0].matchAll(INFO_GENRE_PATTERN)]
            const releaseMatch = [...list[0].matchAll(INFO_RELEASED_PATTERN)]
            const statusMatch = [...list[0].matchAll(LIST_STATUS_PATTERN)]
            anime.push({
                'animeId': titleMatch[i] ? (titleMatch[i][1] ? titleMatch[i][1] : 'Anime not found') : 'Id not found',
                'animeTitle': titleMatch[i] ? (titleMatch[i][2] ? titleMatch[i][2] : 'Anime not found') : 'Id not found',
                'animeBanner': bannerMatch.at(-1) ? (bannerMatch.at(-1)[2] ? bannerMatch.at(-1)[2] : 'Banner not found') : 'Id not found',
                'genres': genreMatch.map((val) => {
                    return {
                        'genreId': val[1] ? val[1] : 'null',
                        'genreTitle': val[2] ? val[2] : 'null'
                    }
                }),
                'release': releaseMatch.at(-1)[1] ? releaseMatch.at(-1)[1] : 'null',
                'description': descriptionMatch.at(i)[1] ? descriptionMatch.at(i)[1] : 'null',
                'status': statusMatch.at(-1)[1] ? statusMatch.at(-1)[1] : 'null',
            })
        }
    }else {
        const bannerMatches = [...res.data.matchAll(EPISODE_BANNER)]
        for (let i = 0; i < bannerMatches.length; i++) {
            anime.push({
                'animeId': bannerMatches[i] ? (bannerMatches[i][1] ? bannerMatches[i][1].split("-episode")[0] : 'Anime not found') : 'Id not found',
                'animeTitle': bannerMatches[i] ? (bannerMatches[i][2] ? bannerMatches[i][2] : 'Anime not found') : 'Id not found',
                'animeBanner': bannerMatches[i] ? (bannerMatches[i][3] ? bannerMatches[i][3] : 'Banner not found') : 'Id not found'
            })
        }
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

    // const infoMatches = INFO_DIV_PATTERN.exec(res.data)
    // console.log(infoMatches);
    // const infoBanner = [...infoMatches.matchAll(INFO_BANNER_PATTERN)]
    // const typeMatch = [...infoMatches.matchAll(INFO_TYPE_PATTERN)]
    // const descriptionMatch = [...infoMatches.matchAll(DESCRIPTION_PATTERN)]
    // const genreMatch = [...infoMatches.matchAll(INFO_GENRE_PATTERN)]
    // const releaseMatch = [...infoMatches.matchAll(INFO_RELEASED_PATTERN)]
    // const statusMatch = [...infoMatches.matchAll(INFO_STATUS_PATTERN)]
    // const othernameMatch = [...infoMatches.matchAll(INFO_OTHERNAME_PATTERN)]

    const episodeMatches = [...res.data.matchAll(EP_PATTERN)]
    const infoBanner = [...res.data.matchAll(INFO_BANNER_PATTERN)]
    const typeMatch = [...res.data.matchAll(INFO_TYPE_PATTERN)]
    const descriptionMatch = [...res.data.matchAll(DESCRIPTION_PATTERN)]
    const genreMatch = [...res.data.matchAll(INFO_GENRE_PATTERN)]
    const releaseMatch = [...res.data.matchAll(INFO_RELEASED_PATTERN)]
    const statusMatch = [...res.data.matchAll(INFO_STATUS_PATTERN)]
    const othernameMatch = [...res.data.matchAll(INFO_OTHERNAME_PATTERN)]
    
    anime = {
        'animeId': animeQuery,
        'animeTitle': infoBanner.at(-1)[2] ? infoBanner.at(-1)[2] : 'null',
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