import { api } from '@/http/api-client'
import type {
  SignInResponse,
  SignInWithGithubRequest,
} from '@/http/models/auth.model'

export async function signInWithGithub(
  body: SignInWithGithubRequest,
): Promise<SignInResponse> {
  return await api
    .post('sessions/github', {
      json: {
        ...body,
      },
    })
    .json()
}
