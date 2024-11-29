import { api } from '@/http/api-client'
import type {
  GetInvitesRequest,
  GetInvitesResponse,
} from '@/http/models/invite.model'

export async function getInvites({
  orgSlug,
}: GetInvitesRequest): Promise<GetInvitesResponse> {
  return await api
    .get(`organizations/${orgSlug}/invites`, {
      next: {
        tags: [`${orgSlug}:invites`],
      },
    })
    .json()
}
