import * as cheerio from "cheerio";

const res = await fetch("https://kingsleague.pro/estadisticas/");
const html = await res.text();

const $ = cheerio.load(html);

$("table tbody tr").each((index, el) => {
  // console.log($(el).text());
  const rawTeam = $(el).find(".fs-table-text_3").text();
  const rawVictories = $(el).find(".fs-table-text_4").text();
  const rawLoses = $(el).find(".fs-table-text_5").text();
  const rawGoalsScored = $(el).find(".fs-table-text_6").text();
  const rawGoalsConceded = $(el).find(".fs-table-text_7").text();
  const rawCardsYellow = $(el).find(".fs-table-text_8").text();
  const rawCardsRed = $(el).find(".fs-table-text_9").text();

  console.log({
    rawTeam,
    rawVictories,
  });
});

const learderboard = [
  {
    team: "Team 1",
    wins: 0,
    loses: 0,
    goalsScored: 0,
    goalsConceded: 0,
    cardsYellow: 0,
    cardsRed: 0,
  },
];
