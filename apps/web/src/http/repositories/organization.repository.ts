import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  GetMembershipResponse,
  GetOrganizationsResponse,
} from '../models/organization.model'

export interface OrganizationRepository {
  getOrganizations(): Promise<GetOrganizationsResponse>
  getMembership(slug: string): Promise<GetMembershipResponse>
  createOrganization(
    body: CreateOrganizationRequest,
  ): Promise<CreateOrganizationResponse>
}
