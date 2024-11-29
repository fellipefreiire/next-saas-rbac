import { api } from '@/http/api-client'
import type {
  SignInResponse,
  SignInWithPasswordRequest,
} from '@/http/models/auth.model'

export async function signInWithPassword(
  body: SignInWithPasswordRequest,
): Promise<SignInResponse> {
  return await api
    .post('sessions/password', {
      json: {
        ...body,
      },
    })
    .json()
}
