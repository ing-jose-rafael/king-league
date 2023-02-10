import * as cheerio from 'cheerio'

import { writeDBFile } from '../db/index.js'
import { logError, logInfo, logSuccess } from './log.js'
import { getLearderboard } from './leaderboard.js'
import { getMVPList } from './mvp.js'
import { getCoaches } from './coaches.js'
import { getTopScorersList } from './top_scorer.js'
import { getAssists } from './assists.js'

export const SCRAPINGS = {
  leaderboard: {
		url: 'https://kingsleague.pro/estadisticas/clasificacion/',
		scraper: getLearderboard
	},
  mvp: { url: 'https://kingsleague.pro/estadisticas/mvp/', scraper: getMVPList },
	coaches: { url: 'https://es.besoccer.com/competicion/info/kings-league/2023', scraper: getCoaches },
	top_scores: {
		url: 'https://kingsleague.pro/estadisticas/goles/',
		scraper: getTopScorersList
	},
	top_assists: {
		url: 'https://kingsleague.pro/estadisticas/asistencias/',
		scraper: getAssists
	}
}

export const cleanText = (text) =>
    text
      .replace(/\t|\n|\s:/g, '') // quita los tabuladores, salto de linea y espacio antes de los ":"
      .replace(/.*:/g, ' ') // quita todo lo que este antes de ":"
      .trim()

export async function scrape(url) {
  const res = await fetch(url)
  const html = await res.text() // transforma el resultado en un texto plano
  return cheerio.load(html) // cheerio: biblioteca que nos devuelve un selector $ para recuperar los elementos
}

export async function scrapeAndSave(name) {
	const start = performance.now() // <--- punto inicio

	try {
		const { scraper, url } = SCRAPINGS[name]

		logInfo(`Scraping [${name}]...`)
		const $ = url ? await scrape(url) : null // llamado la funcion scrape de este mismo archivo
		const content = await scraper($)
		logSuccess(`[${name}] scraped successfully`)

		logInfo(`Writing [${name}] to database...`)
		await writeDBFile(name, content)
		logSuccess(`[${name}] written successfully`)
	} catch (e) {
		logError(`Error scraping [${name}]`)
		logError(e)
	} finally {
		const end = performance.now() // <--- fin
		const time = (end - start) / 1000
		logInfo(`[${name}] scraped in ${time} seconds`)
	}
}
