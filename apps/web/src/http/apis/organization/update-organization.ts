import { api } from '@/http/api-client'
import type { UpdateOrganizationRequest } from '@/http/models/organization.model'

export async function updateOrganization({
  orgSlug,
  name,
  shouldAttachUsersByDomain,
  domain,
}: UpdateOrganizationRequest): Promise<never> {
  return await api
    .put(`organizations/${orgSlug}`, {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json()
}
