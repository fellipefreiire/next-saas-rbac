import type { KyInstance } from 'ky'

import { api } from '@/http/api-client'

import type { OrganizationRepository } from '../repositories/organization.repository'

const instance = (instance: KyInstance): OrganizationRepository => ({
  getOrganization: async (slug) =>
    await instance
      .get(`organizations/${slug}`, {
        next: {
          tags: [`organization/${slug}`],
        },
      })
      .json(),
  getOrganizations: async () =>
    await instance
      .get('organizations', {
        next: {
          tags: ['organizations'],
        },
      })
      .json(),
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
  updateOrganization: async ({
    orgSlug,
    name,
    shouldAttachUsersByDomain,
    domain,
  }) =>
    await instance
      .put(`organizations/${orgSlug}`, {
        json: {
          name,
          domain,
          shouldAttachUsersByDomain,
        },
      })
      .json(),
  shutdownOrganization: async (org) =>
    await instance.delete(`organizations/${org}`).json(),
})

export const organizationApi = instance(api)
