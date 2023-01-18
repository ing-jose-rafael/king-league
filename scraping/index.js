import * as cheerio from 'cheerio'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const URl = {
  learderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

const scrape = async (url) => {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

async function getLearderboard () {
  const $ = await scrape(URl.learderboard)
  const $rows = $('table tbody tr')

  // const LEARDERBOARD_SELECTORS_PREFIX = $('table tbody tr')

  const LEARDERBOARD_SELECTORS = {
    team: { selector: '.fs-table-text_3', typeOf: 'string' },
    wins: { selector: '.fs-table-text_4', typeOf: 'number' },
    loses: { selector: '.fs-table-text_5', typeOf: 'number' },
    scoredGoals: { selector: '.fs-table-text_6', typeOf: 'number' },
    concededGoals: { selector: '.fs-table-text_7', typeOf: 'number' },
    cardsYellow: { selector: '.fs-table-text_8', typeOf: 'number' },
    cardsRed: { selector: '.fs-table-text_9', typeOf: 'number' }
  }

  const clearText = text => text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim()

  const learderBoardSelectorEntries = Object.entries(LEARDERBOARD_SELECTORS)
  const learderboard = []
  $rows.each((index, el) => {
    const learderBoardEntries = learderBoardSelectorEntries.map(([key, { selector, typeOf }]) => {
      // const selector = `${LEARDERBOARD_SELECTORS_PREFIX} ${specificSelector}`
      const rawValue = $(el).find(selector).text()
      const cleanValue = clearText(rawValue)
      // transformandoa numero
      // const value = Number.isNaN(Number(cleanValue)) ? cleanValue : Number(cleanValue)
      const value = typeOf === 'number' ? Number(cleanValue) : cleanValue
      return [key, value]
    })
    learderboard.push(Object.fromEntries(learderBoardEntries))

    // console.log(Object.fromEntries(learderBoardEntries))
    // const rawTeam = $el.find('.fs-table-text_3').text()
    // const rawVictories = $el.find('.fs-table-text_4').text()
    // const rawLoses = $el.find('.fs-table-text_5').text()
    // const rawGoalsScored = $el.find('.fs-table-text_6').text()
    // const rawGoalsConceded = $el.find('.fs-table-text_7').text()
    // const rawCardsYellow = $el.find('.fs-table-text_8').text()
    // const rawCardsRed = $el.find('.fs-table-text_9').text()

    // console.log(
    //   clearText(rawTeam),
    //   clearText(rawVictories),
    //   clearText(rawLoses),
    //   clearText(rawGoalsScored),
    //   clearText(rawGoalsConceded),
    //   clearText(rawCardsYellow),
    //   clearText(rawCardsRed)
    // )
  })
  return learderboard
}

const learderboard = await getLearderboard()
const filePath = path.join(process.cwd(), './db', 'learderboard.json')

console.log(filePath)
await writeFile(filePath, JSON.stringify(learderboard, null, 2), 'utf-8')

// const learderboard = [
//   {
//     team: 'Team 1',
//     wins: 0,
//     loses: 0,
//     goalsScored: 0,
//     goalsConceded: 0,
//     cardsYellow: 0,
//     cardsRed: 0
//   }
// ]
