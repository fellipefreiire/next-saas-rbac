import type { KyInstance } from 'ky'

import { api } from '@/http/api-client'

import type { OrganizationRepository } from '../repositories/organization.repository'

const instance = (instance: KyInstance): OrganizationRepository => ({
  getOrganizations: async () => await instance.get('organizations').json(),
  getMembership: async (slug) =>
    await instance.get(`organizations/${slug}/membership`).json(),
  createOrganization: async (body) =>
    await instance
      .post('organizations', {
        json: {
          ...body,
        },
      })
      .json(),
})

export const organizationApi = instance(api)
