'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { signUp } from '@/http/apis/auth/sign-up'
import { authSchema } from '@/http/models/auth.model'

export async function signUpAction(data: FormData) {
  const result = authSchema
    .pick({
      name: true,
      email: true,
      password: true,
      password_confirmation: true,
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'Password confirmation does not match.',
      path: ['password_confirmation'],
    })
    .safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = result.data

  try {
    const { token } = await signUp({
      name,
      email,
      password,
    })

    const cookieStore = await cookies()

    cookieStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
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
