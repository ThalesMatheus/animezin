const BASE_URL = `https://gogoanime.lu/`
const EP_PATTERN = /.+ep_end.+>(?:\d+-)?(\d+)<\/a>/ig
const TITLE_PATTERN = /<p class=["']name["']><a href=["']\/category\/(.+)["'] title=["'](.+)["']>/ig
const EPISODE_BANNER = /<a href=["'](.+)["'] title=["'](.+)["']>(\r\n.+|\r.+|\n.+)<img src=["'](.+)["'] alt=["'](.+)["']/ig
const REFERER_PATTERN = /<a href=["']#["'] rel=["'](?:1|100)["'] data-video=["'](.+)["'] >/ig

const VIDEO_PATTERN = /sources:\[{file: ["'](.+\.m3u8)["']/ig

module.exports = {
    BASE_URL,
    EP_PATTERN,
    TITLE_PATTERN,
    EPISODE_BANNER,
    REFERER_PATTERN,
    VIDEO_PATTERN
}