import { unstable_dev as unstableDev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

describe('Testing / route', () => {
  let worker

  beforeAll(async () => {
    worker = await unstableDev('api/index.js', {
      experimental: { disableExperimentalWarning: true }
    })
  })

  afterAll(async () => {
    await worker.stop()
  })

  it('Get / should return endpoints', async () => {
    const resp = await worker.fetch()
    if (resp) {
      const text = await resp.text()
      const endpoints = [
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
      ]

      expect(text).toStrictEqual(JSON.stringify(endpoints))
    }
  })
  it('The lenght should be greater than 0', async () => {
    const resp = await worker.fetch()
    if (resp) {
      const text = await resp.text()
      const lengthEndpoint = Object.entries(text).length
      expect(lengthEndpoint).toBeGreaterThan(0)
    }
  })
})
