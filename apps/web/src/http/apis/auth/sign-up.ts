import { api } from '@/http/api-client'
import type { SignUpRequest } from '@/http/models/auth.model'

export async function signUp(body: SignUpRequest): Promise<never> {
  return await api
    .post('users', {
      json: {
        ...body,
      },
    })
    .json()
}
