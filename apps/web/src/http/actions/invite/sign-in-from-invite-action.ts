'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signInFromInvite(inviteId: string, email: string) {
  const cookieStore = await cookies()
  cookieStore.set('inviteId', inviteId)

  redirect(`/auth/sign-in?email=${email}`)
}
