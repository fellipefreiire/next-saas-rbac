import { api } from '@/http/api-client'
import type {
  GetInviteRequest,
  GetInviteResponse,
} from '@/http/models/invite.model'

export async function getInvite({
  id,
}: GetInviteRequest): Promise<GetInviteResponse> {
  return await api.get(`invites/${id}`, {}).json()
}
