import { writeDBFile } from '../db/index.js'
import { getShortNameTeams } from './short_name_teams.js'
// import { getURLTeams } from './url_teams.js'
import { scrapeAndSave, SCRAPINGS } from './utils.js'

// screper secuencial, para evitar que la página nos saque
for (const infoToScrape of Object.keys(SCRAPINGS)) {
	await scrapeAndSave(infoToScrape)
}
// scraper paralelo (la página nos puede sacar)
// await Promise.all([scrapeAndSave('leaderboard'), scrapeAndSave('mvp')])

// await scrapeAndSave('coachs')

// const teamsWithUrl = getURLTeams()
// await writeDBFile('teams', teamsWithUrl)

// Update file of teams.json with short name of each team
await writeDBFile('teams', getShortNameTeams())
