import { api } from '@/http/api-client'
import type {
  CreateProjectRequest,
  CreateProjectResponse,
} from '@/http/models/project.model'

export async function createProject({
  name,
  description,
  orgSlug,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  return await api
    .post(`organizations/${orgSlug}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json()
}
