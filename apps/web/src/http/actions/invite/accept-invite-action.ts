'use server'

import { revalidateTag } from 'next/cache'

import { acceptInvite } from '@/http/apis/invite/accept-invite'

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite({ inviteId })

  revalidateTag('organizations')
}
