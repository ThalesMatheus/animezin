const axios = require('axios')

const { BASE_URL, EP_PATTERN, TITLE_PATTERN, EPISODE_BANNER } = require('../config/config')

async function getBaseAnimes(){
    let res
    try {
        res = await axios.get(`https://gogoanime.lu`)
    } catch (e) {
        throw e.responseCode
    }
    const bannerMatches = [...res.data.matchAll(EPISODE_BANNER)]
    let anime = []
    console.log(bannerMatches);
    for (let i = 0; i < bannerMatches.length; i++) {
        anime.push({
            'anime': bannerMatches[i] ? (bannerMatches[i][2] ? bannerMatches[i][2] : 'Anime not found') : 'Id not found',
            'animeBanner': bannerMatches[i] ? (bannerMatches[i][3] ? bannerMatches[i][4] : 'Banner not found') : 'Id not found'
        })
    }
    console.log(anime)
    return anime
}

async function searchAnime(animeQuery) {
    let res
    try {
        res = await axios.get(`${BASE_URL}//search.html?keyword=${animeQuery}`)
    } catch(e) {
        throw e.responseCode
    }
    const matches = res.data.matchAll(TITLE_PATTERN)
    let anime = []
    for (const match of matches) {
        anime.push({
            'animId': match[1] ? match[1] : 'null',
            'animeTitle': match[2] ? match[2] : 'null',
        })
    }
    return anime
}

async function getEpisodes(animeQuery){
    let res
    try {
        res = await axios.get(`${BASE_URL}/category/${animeQuery}`)
    } catch(e) {
        throw e.responseCode
    }
    const matches = [...res.data.matchAll(EP_PATTERN)]
    const episodes = matches[matches.length - 1][1]
    return episodes
}

module.exports = {
    searchAnime,
    getEpisodes,
    getBaseAnimes,
}