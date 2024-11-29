import { api } from '@/http/api-client'
import type {
  GetMemberResponse,
  GetMembersRequest,
  GetMembersResponse,
} from '@/http/models/organization.model'

export async function getMembers({
  orgSlug,
}: GetMembersRequest): Promise<GetMemberResponse[]> {
  return await api
    .get(`organizations/${orgSlug}/members`, {
      next: {
        tags: [`${orgSlug}:members`],
      },
    })
    .json<GetMembersResponse>()
    .then((d) => d.data)
}
