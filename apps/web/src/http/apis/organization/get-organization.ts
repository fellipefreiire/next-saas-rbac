import { api } from '@/http/api-client'
import type {
  GetOrganizationRequest,
  GetOrganizationResponse,
} from '@/http/models/organization.model'

export async function getOrganization({
  orgSlug,
}: GetOrganizationRequest): Promise<GetOrganizationResponse> {
  return await api
    .get(`organizations/${orgSlug}`, {
      next: {
        tags: [`organization/${orgSlug}`],
      },
    })
    .json()
}
