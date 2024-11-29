import { api } from '@/http/api-client'
import type { AcceptInviteRequest } from '@/http/models/invite.model'

export async function acceptInvite({ inviteId }: AcceptInviteRequest) {
  return await api.post(`invites/${inviteId}/accept`).json()
}
