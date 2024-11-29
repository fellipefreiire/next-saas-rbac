'use server'

import { revalidateTag } from 'next/cache'

import { rejectInvite } from '@/http/apis/invite/reject-invite'

export async function rejectInviteAction(inviteId: string) {
  await rejectInvite({ inviteId })

  revalidateTag('organizations')
}
