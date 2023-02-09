import { TEAMS, PRESIDENTS } from '../db/index.js'
import { cleanText } from './utils.js'

// const DB_PATH = path.join(process.cwd(), './db/')
// const TEAMS = await readFile(`${DB_PATH}/teams.json`, 'utf-8').then(JSON.parse)
// const PRESIDENTS = await readFile(`${DB_PATH}/presidents.json`, 'utf-8').then(JSON.parse)

// import TEAMS from '../db/teams.json' assert { type: 'json' };

// const URl = {
//   learderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
// }

// const scrape = async (url) => {
//   const res = await fetch(url)
//   const html = await res.text()
//   return cheerio.load(html)
// }

const LEARDERBOARD_SELECTORS = {
	team: { selector: '.fs-table-text_3', typeOf: 'string' },
	wins: { selector: '.fs-table-text_4', typeOf: 'number' },
	losses: { selector: '.fs-table-text_5', typeOf: 'number' },
	scoredGoals: { selector: '.fs-table-text_6', typeOf: 'number' },
	concededGoals: { selector: '.fs-table-text_7', typeOf: 'number' },
	cardsYellow: { selector: '.fs-table-text_8', typeOf: 'number' },
	cardsRed: { selector: '.fs-table-text_9', typeOf: 'number' }
}

export async function getLearderboard($) {
  const $rows = $('table tbody tr')

  // const LEARDERBOARD_SELECTORS_PREFIX = $('table tbody tr')

  const getTeamFrom = ({ name }) => {
    const { presidentId, ...restOfteam } = TEAMS.find(
      (team) => team.name === name
    )
    const president = PRESIDENTS.find(
      (foundPresident) => foundPresident.id === presidentId
    )
    return { ...restOfteam, president }
  }
	// quita todo lo que esta antes de :
  // const clearText = (text) =>
  //   text
  //     .replace(/\t|\n|\s:/g, '')
  //     .replace(/.*:/g, ' ')
  //     .trim()

  const leaderBoardSelectorEntries = Object.entries(LEARDERBOARD_SELECTORS)
  const leaderboard = []
  $rows.each((index, el) => {
    const leaderBoardEntries = leaderBoardSelectorEntries.map(
      ([key, { selector, typeOf }]) => {
        // const selector = `${LEARDERBOARD_SELECTORS_PREFIX} ${specificSelector}`
				const $el = $(el)
        const rawValue = $el.find(selector).text()
        const cleanValue = cleanText(rawValue)
        // transformandoa numero
        // const value = Number.isNaN(Number(cleanValue)) ? cleanValue : Number(cleanValue)
        const value = typeOf === 'number' ? Number(cleanValue) : cleanValue // convierte a numero
        return [key, value]
      }
    )

    const { team: teamName, ...leaderboardForTeam } =
      Object.fromEntries(leaderBoardEntries)

    const team = getTeamFrom({ name: teamName })

    leaderboard.push({
      ...leaderboardForTeam,
      team
    })
    // leaderboard.push(Object.fromEntries(leaderBoardEntries))
  })
  return leaderboard
}

// const leaderboard = await getLearderboard()

// const filePath = path.join(process.cwd(), './db', 'learderboard.json')

// console.log(filePath)
// await writeFile(`${DB_PATH}/leaderboard.json`, JSON.stringify(leaderboard, null, 2), 'utf-8')
// await writeFile(`${DB_PATH}/leaderboard.json`, JSON.stringify(leaderboard, null, 2), 'utf-8')
// await writeDBFile('leaderboard', leaderboard)
