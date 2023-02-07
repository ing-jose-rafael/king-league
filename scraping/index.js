import { scrapeAndSave, SCRAPINGS } from './utils.js'

// screper secuencial, para evitar que la página nos saque
for (const infoToScrape of Object.keys(SCRAPINGS)) {
	await scrapeAndSave(infoToScrape)
}
// scraper paralelo (la página nos puede sacar)
// await Promise.all([scrapeAndSave('leaderboard'), scrapeAndSave('mvp')])

// await scrapeAndSave('coachs')
