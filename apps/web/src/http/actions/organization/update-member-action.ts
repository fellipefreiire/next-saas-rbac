'use server'

import type { Role } from '@ff-saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { updateMember } from '@/http/apis/organization/update-member'

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMember({ orgSlug: currentOrg!, memberId, role })

  revalidateTag(`${currentOrg}/members`)
}
