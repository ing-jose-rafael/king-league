import * as cheerio from 'cheerio'
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
    team: '.fs-table-text_3',
    wins: '.fs-table-text_4',
    loses: '.fs-table-text_5',
    scoredGoals: '.fs-table-text_6',
    concededGoals: '.fs-table-text_7',
    cardsYellow: '.fs-table-text_8',
    cardsRed: '.fs-table-text_9'
  }

  const clearText = text => text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim()

  const learderBoardSelectorEntries = Object.entries(LEARDERBOARD_SELECTORS)

  $rows.each((index, el) => {
    const learderBoardEntries = learderBoardSelectorEntries.map(([key, selector]) => {
      // const selector = `${LEARDERBOARD_SELECTORS_PREFIX} ${specificSelector}`
      const rawValue = $(el).find(selector).text()
      const value = clearText(rawValue)
      return [key, value]
    })
    console.log(Object.fromEntries(learderBoardEntries))
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
}

await getLearderboard()

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
