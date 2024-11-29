'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/apis/invite/create-invite'
import { inviteSchema } from '@/http/models/invite.model'

export async function createInviteAction(data: FormData) {
  const result = inviteSchema
    .pick({
      email: true,
      role: true,
    })
    .safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, role } = result.data

  const orgSlug = await getCurrentOrg()

  try {
    await createInvite({
      email,
      role,
      orgSlug: orgSlug!,
    })

    revalidateTag(`${orgSlug}:invites`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the invite',
    errors: null,
  }
}
