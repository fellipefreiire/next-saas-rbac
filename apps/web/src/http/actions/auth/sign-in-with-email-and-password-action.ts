'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { signInWithPassword } from '@/http/apis/auth/sign-in-with-password'
import { acceptInvite } from '@/http/apis/invite/accept-invite'
import { authSchema } from '@/http/models/auth.model'

export async function signInWithEmailAndPasswordAction(data: FormData) {
  const result = authSchema
    .pick({
      email: true,
      password: true,
    })
    .safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    const cookieStore = await cookies()

    cookieStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const inviteId = cookieStore.get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite({ inviteId })
        cookieStore.delete('inviteId')
      } catch (err) {
        console.error(err)
      }
    }
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

  return { success: true, message: null, errors: null }
}
