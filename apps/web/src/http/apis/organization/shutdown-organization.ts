import { api } from '@/http/api-client'
import type { ShutdownOrganizationRequest } from '@/http/models/organization.model'

export async function shutdownOrganization({
  orgSlug,
}: ShutdownOrganizationRequest): Promise<never> {
  return await api.delete(`organizations/${orgSlug}`).json()
}
