const BASE_URL = `https://gogoanime.lu/`
const EP_PATTERN = /.+ep_end.+>(?:\d+-)?(\d+)<\/a>/ig
const TITLE_PATTERN = /<p class=["']name["']><a href=["']\/category\/(.+)["'] title=["'](.+)["']>/ig
const EPISODE_BANNER = /<a href=["']\/(.+)["'] title=["'](.+)["']>(?:\r\n.+|\r.+|\n.+)<img src=["'](.+)["'] alt=["'](?:.+)["']/ig
//const INFO_DIV_PATTERN = /<div class=["']anime_info_body_bg["']>(.|\n)*?<\/div>/ig
const INFO_DIV_PATTERN = /<div class=["']anime_info_body_bg["']>(.|\n)*?<div/ig
const INFO_BANNER_PATTERN = /<img src=["'](.+)["'] (?:alt=["'].+["'])/ig
const INFO_TYPE_PATTERN = /<span>Type: <\/span>(?:\r\n.+|\r.+|\n.+)<a href=["']\/sub-category\/(.+)["'] title=["'](.+)["']/ig
const INFO_GENRE_PATTERN = /<a href=["']https:\/\/gogoanime.lu\/genre\/([a-zA-Z0-9-]+)["'] title=["']([a-zA-Z0-9\s]+)["']/ig
const INFO_RELEASED_PATTERN = /<span>Released: <\/span>(.+)<\/p>/ig
const INFO_STATUS_PATTERN = /<span>Status: <\/span>(?:\r\n.+|\r.+|\n.+)<a href=["']\/(?:.+)["'] title=["'](?:.+)["']>(.+)<\/a>/ig
const INFO_OTHERNAME_PATTERN = /<span>Other name: <\/span>(.+)<\/p>/ig
const DESCRIPTION_PATTERN = /<span>Plot Summary: <\/span>(.+)[<\/p>]*/g
const REFERER_PATTERN = /<a href=["']#["'] rel=["'](?:1|100)["'] data-video=["'](.+)["'] >/ig

const VIDEO_PATTERN = /sources:\[{file: ["'](.+\.m3u8)["']/ig

module.exports = {
    BASE_URL,
    EP_PATTERN,
    TITLE_PATTERN,
    EPISODE_BANNER,
    REFERER_PATTERN,
    INFO_BANNER_PATTERN,
    INFO_TYPE_PATTERN,
    INFO_GENRE_PATTERN,
    VIDEO_PATTERN,
    DESCRIPTION_PATTERN,
    INFO_RELEASED_PATTERN,
    INFO_STATUS_PATTERN,
    INFO_OTHERNAME_PATTERN,
    INFO_DIV_PATTERN
}