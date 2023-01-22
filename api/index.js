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
import learderboard from '../db/leaderboard.json'
import { serveStatic } from 'hono/serve-static.module'

const app = new Hono()

app.get('/', (ctx) => ctx.json([
  {
    endpoint: '/leaderboard',
    description: 'Return the leaderboard'
  }
]))

app.get('/leaderboard', (ctx) => {
  return ctx.json(learderboard)
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
