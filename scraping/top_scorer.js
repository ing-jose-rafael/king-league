import { getImageFromTeam } from '../db/index.js'
import { cleanText } from './utils.js'

const SCORERS_SELECTORS = {
	ranking: { selector: '.fs-table-text_1', typeOf: 'string' },
	team: { selector: '.fs-table-text_3', typeOf: 'string' },
	playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
	gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
	goals: { selector: '.fs-table-text_6', typeOf: 'number' }
}

export async function getTopScorersList($) {
	const $rows = $('table tbody tr')

	const scoresSelectorEntries = Object.entries(SCORERS_SELECTORS)
	const topScoresList = []

	$rows.each((index, el) => {
		const topScorerEntries = scoresSelectorEntries.map(([key, { selector, typeOf }]) => {
			const $el = $(el)
			const rawValue = $el.find(selector).text()
			const cleanedValue = cleanText(rawValue)

			const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue

			return [key, value]
		})

		const { team: teamName, ...topScorerData } = Object.fromEntries(topScorerEntries)
		const image = getImageFromTeam({ name: teamName })

		topScoresList.push({
			...topScorerData,
			rank: index + 1,
			team: teamName,
			image
		})
	})

	return topScoresList
}
