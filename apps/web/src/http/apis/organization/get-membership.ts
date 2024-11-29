import { api } from '@/http/api-client'
import type {
  GetMembershipRequest,
  GetMembershipResponse,
} from '@/http/models/organization.model'

export async function getMembership({
  orgSlug,
}: GetMembershipRequest): Promise<GetMembershipResponse> {
  return await api.get(`organizations/${orgSlug}/membership`).json()
}
