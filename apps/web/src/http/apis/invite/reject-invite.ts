import { api } from '@/http/api-client'
import type { RejectInviteRequest } from '@/http/models/invite.model'

export async function rejectInvite({ inviteId }: RejectInviteRequest) {
  return await api.post(`invites/${inviteId}/reject`).json()
}
