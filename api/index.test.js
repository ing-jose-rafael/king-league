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
describe('Testing /teams route', () => {
  let worker

  beforeAll(async () => {
    worker = await unstableDev('api/index.js', {
      experimental: { disableExperimentalWarning: true }
    })
  })

  afterAll(async () => {
    await worker.stop()
  })

  it('The teams should have all props', async () => {
    const resp = await worker.fetch('/teams')
    if (resp) {
      const teams = await resp.json()

      // verify the team have all props
      teams.forEach((team) => {
        expect(team).toHaveProperty('id')
        expect(team).toHaveProperty('name')
        expect(team).toHaveProperty('image')
        expect(team).toHaveProperty('url')
        expect(team).toHaveProperty('presidentId')
        expect(team).toHaveProperty('channel')
        expect(team).toHaveProperty('coach')
        expect(team).toHaveProperty('socialNetworks')
        expect(team).toHaveProperty('players')
      })
    }
  })

  it('Get /teams/noexist should return 404 message missing team', async () => {
    const resp = await worker.fetch('/teams/noexist')
    if (resp) {
      const errorMessage = await resp.json()

      expect(errorMessage).toEqual({
        message: 'Team not found'
      })
    }
  })
})
