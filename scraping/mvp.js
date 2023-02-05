/**
 * writeDBFile: fichro para escribir el archivo .json.
 * TEAMS: para leer toda la info que tiene los equipos
 */
import { TEAMS } from '../db/index.js'
import { clearText } from './utils.js'

const MVP_SELECTORS = {
	team: { selector: '.fs-table-text_3', typeOf: 'string' },
	playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
	gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
	mvps: { selector: '.fs-table-text_6', typeOf: 'number' }
}

export async function getMVPList ($) {
	// escrapeando la informacion de la pagina  https://kingsleague.pro/estadisticas/mvp/
	// const $ = await scrape(URLS.mvp)
	const $rows = $('table tbody tr')

	const getImageFromTeam = ({ name }) => {
		const { image } = TEAMS.find(
			(team) => team.name === name
		)
		return image
	}
	// convierte un objeto a un arraye de [key, value] para luego iterarlo con eñ map
	const mvpSelectorEntries = Object.entries(MVP_SELECTORS)
	const mvpList = []

	$rows.each((index, el) => {
		// iterando el Array
		const mvpEntries = mvpSelectorEntries.map(
			([key, { selector, typeOf }]) => {
				const rawValue = $(el).find(selector).text()
				// limpiar el string, espacio que tiene en el HTML
				const cleanedValue = clearText(rawValue)

				const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

				return [key, value]
			}
		)
		// convertir el array en un objeto
		const { team: teamName, ...mvpData } = Object.fromEntries(mvpEntries)
		const image = getImageFromTeam({ name: teamName })

		mvpList.push({
			...mvpData,
			rank: index + 1,
			team: teamName,
			image
		})
	})
	return mvpList
}
