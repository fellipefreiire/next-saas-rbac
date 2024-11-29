import { api } from '@/http/api-client'
import type {
  GetProjectRequest,
  GetProjectsResponse,
} from '@/http/models/project.model'

export async function getProjects({
  orgSlug,
}: GetProjectRequest): Promise<GetProjectsResponse> {
  return await api.get(`organizations/${orgSlug}/projects`).json()
}
