import { api } from '@/http/api-client'
import type { GetPendingInvitesResponse } from '@/http/models/invite.model'

export async function getPendingInvites(): Promise<GetPendingInvitesResponse> {
  return await api.get('invites/pending').json()
}
