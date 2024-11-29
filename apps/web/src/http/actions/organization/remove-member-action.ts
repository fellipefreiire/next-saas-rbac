'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { removeMember } from '@/http/apis/organization/remove-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await removeMember({ orgSlug: currentOrg!, memberId })

  revalidateTag(`${currentOrg}/members`)
}
