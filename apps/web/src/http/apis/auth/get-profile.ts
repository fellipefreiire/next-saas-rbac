import { api } from '@/http/api-client'
import type { GetProfileResponse } from '@/http/models/auth.model'

export async function getProfile(): Promise<GetProfileResponse> {
  return await api.get('profile').json()
}
