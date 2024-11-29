import { api } from '@/http/api-client'
import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
} from '@/http/models/organization.model'

export async function createOrganization(
  body: CreateOrganizationRequest,
): Promise<CreateOrganizationResponse> {
  return await api
    .post('organizations', {
      json: {
        ...body,
      },
    })
    .json()
}
