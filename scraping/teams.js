import { cleanText, scrape } from './utils.js'
import { TEAMS } from '../db/index.js'

const base = 'https://kingsleague.pro/team/'

const URL_POSFIX = TEAMS.map(team => team.id)

let teams
const data = []

URL_POSFIX.forEach(async (posfix) => {
	const url = base + posfix
	const $ = await scrape(url)
	const $list = $('ul.uk-slider-items li')

	teams = []

	$list.each((index, el) => {
		const $el = $(el)
		const name = cleanText($el.find('h3').text())
		$el.find('div.el-content span').text('')
		const role = $el.find('div.el-content').text()

		teams.push({
			teamMember: name,
			role
		})
	})

	data.push({ [posfix]: teams })
	console.log(JSON.stringify(data, null, '  '))
})
