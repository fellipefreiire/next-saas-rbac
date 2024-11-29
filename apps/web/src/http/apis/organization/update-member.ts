import { api } from '@/http/api-client'
import type { UpdateMemberRequest } from '@/http/models/organization.model'

export async function updateMember({
  orgSlug,
  memberId,
  role,
}: UpdateMemberRequest): Promise<never> {
  return await api
    .put(`organizations/${orgSlug}/members/${memberId}`, {
      json: {
        role,
      },
    })
    .json()
}
