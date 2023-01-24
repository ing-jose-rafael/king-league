import { Hono } from 'hono'
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { serveStatic } from 'hono/serve-static.module'
import learderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
import presidents from '../db/presidents.json'

const app = new Hono()

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      methods: ['GET'],
      description: 'Returns kins leagues leaderboard',
      _links: {
        self: [
          {
            href: 'https://kings-league-api.ing-jcarreno.workers.dev/leaderboard'
          }
        ]
      }
    },
    {
      endpoint: '/presidents',
      methods: ['GET'],
      description: 'Returns kins leagues presidents',
      _links: {
        self: [
          {
            href: 'https://kings-league-api.ing-jcarreno.workers.dev/presidents'
          }
        ]
      }
    },
    {
      endpoint: '/presidents/:id',
      methods: ['GET'],
      description: 'Returns kins leagues team president',
      _links: {
        self: [
          {
            href: 'https://kings-league-api.ing-jcarreno.workers.dev/presidents/iker-casillas'
          }
        ]
      }
    },
    {
      endpoint: '/teams',
      methods: ['GET'],
      description: 'Returns kins leagues teams',
      _links: {
        self: [
          {
            href: 'https://kings-league-api.ing-jcarreno.workers.dev/teams'
          }
        ]
      }
    },
    {
      endpoint: '/teams/:id',
      methods: ['GET'],
      description: 'Returns kins leagues team',
      _links: {
        self: [
          {
            href: 'https://kings-league-api.ing-jcarreno.workers.dev/teams/1k'
          }
        ]
      }
    }
  ])
)

app.get('/leaderboard\\/?', (ctx) => {
  return ctx.json(learderboard)
})

app.get('/presidents\\/?', (ctx) => {
  return ctx.json(presidents)
})
app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundPresident = presidents.find((president) => president.id === id)
  return foundPresident
    ? ctx.json(foundPresident)
    : ctx.json({ message: 'President not found' }, 404)
})

app.get('/teams\\/?', (ctx) => {
  return ctx.json(teams)
})

app.get('/teams/:id', (ctx) => {
  const teamId = ctx.req.param('id')
  const foundteam = teams.find((teams) => teams.id === teamId)
  return foundteam
    ? ctx.json(foundteam)
    : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/static/*', serveStatic({ root: './' }))

export default app
// export default {
//   async fetch (request, env, ctx) {
//     return new Response(JSON.stringify(learderboard), {
//       headers: {
//         'content-type': 'application/json;charset=UTF-8'
//       }
//     })
//   }
// }
