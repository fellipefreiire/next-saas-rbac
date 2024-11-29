import { api } from '@/http/api-client'
import type { RevokeInviteRequest } from '@/http/models/invite.model'

export async function revokeInvite({
  orgSlug,
  inviteId,
}: RevokeInviteRequest): Promise<never> {
  return await api.delete(`organizations/${orgSlug}/invites/${inviteId}`).json()
}
