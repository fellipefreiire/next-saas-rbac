import type { KyInstance } from 'ky'

import { api } from '@/http/api-client'

import type { ProjectRepository } from '../repositories/project.repository'

const instance = (instance: KyInstance): ProjectRepository => ({
  getProjects: async (slug) =>
    await instance.get(`organizations/${slug}/projects`).json(),
})

export const projectApi = instance(api)
