import { api } from '@/http/api-client'
import type { GetOrganizationsResponse } from '@/http/models/organization.model'

export async function getOrganizations(): Promise<GetOrganizationsResponse> {
  return await api
    .get('organizations', {
      next: {
        tags: ['organizations'],
      },
    })
    .json()
}
