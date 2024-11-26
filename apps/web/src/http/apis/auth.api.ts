import type { KyInstance } from 'ky'

import { api } from '@/http/api-client'

import type { AuthRepository } from '../repositories/auth.repository'

const instance = (instance: KyInstance): AuthRepository => ({
  signInWithPassword: async (body) =>
    await instance
      .post('sessions/password', {
        json: {
          ...body,
        },
      })
      .json(),

  signInWithGithub: async (body) =>
    await instance
      .post('sessions/github', {
        json: {
          ...body,
        },
      })
      .json(),

  getProfile: async () => await instance.get('profile').json(),

  signUp: async (body) =>
    await instance
      .post('users', {
        json: {
          ...body,
        },
      })
      .json(),
})

export const authApi = instance(api)
