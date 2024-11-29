import { api } from '@/http/api-client'
import type { RemoveMemberRequest } from '@/http/models/organization.model'

export async function removeMember({
  orgSlug,
  memberId,
}: RemoveMemberRequest): Promise<never> {
  return await api.delete(`organizations/${orgSlug}/members/${memberId}`).json()
}
