import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  GetMembershipResponse,
  GetOrganizationResponse,
  GetOrganizationsResponse,
  UpdateOrganizationRequest,
} from '../models/organization.model'

export interface OrganizationRepository {
  getOrganization(slug: string): Promise<GetOrganizationResponse>
  getOrganizations(): Promise<GetOrganizationsResponse>
  getMembership(slug: string): Promise<GetMembershipResponse>
  createOrganization(
    body: CreateOrganizationRequest,
  ): Promise<CreateOrganizationResponse>
  updateOrganization(body: UpdateOrganizationRequest): Promise<never>
  shutdownOrganization(org: string): Promise<never>
}
