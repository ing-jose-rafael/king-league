
import * as cheerio from 'cheerio'
export const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/',
  mvp: 'https://kingsleague.pro/estadisticas/mvp/'
}

export const clearText = (text) =>
    text
      .replace(/\t|\n|\s:/g, '') // quita los tabuladores, salto de linea y espacio antes de los ":"
      .replace(/.*:/g, ' ') // quita todo lo que este antes de ":"
      .trim()

export async function scrape(url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}
