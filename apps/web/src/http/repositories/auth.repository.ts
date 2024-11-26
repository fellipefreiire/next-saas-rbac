import {
  type GetProfileResponse,
  type SignInResponse,
  type SignInWithGithubRequest,
  type SignInWithPasswordRequest,
  type SignUpRequest,
} from '../models/auth.model'

export interface AuthRepository {
  signInWithPassword(body: SignInWithPasswordRequest): Promise<SignInResponse>
  signInWithGithub(body: SignInWithGithubRequest): Promise<SignInResponse>
  getProfile(): Promise<GetProfileResponse>
  signUp(body: SignUpRequest): Promise<never>
}
