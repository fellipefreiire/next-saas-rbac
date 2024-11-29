import { api } from '@/http/api-client'
import type {
  CreateInviteRequest,
  CreateInviteResponse,
} from '@/http/models/invite.model'

export async function createInvite({
  email,
  role,
  orgSlug,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
  return await api
    .post(`organizations/${orgSlug}/invites`, {
      json: {
        email,
        role,
      },
    })
    .json()
}
