'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { revokeInvite } from '@/http/apis/invite/revoke-invite'

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()

  await revokeInvite({
    orgSlug: currentOrg!,
    inviteId,
  })

  revalidateTag(`${currentOrg}:invites`)
}
