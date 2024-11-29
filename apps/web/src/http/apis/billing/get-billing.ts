import { api } from '@/http/api-client'
import type {
  GetBillingRequest,
  GetBillingResponse,
} from '@/http/models/billing.model'

export async function getBilling({
  orgSlug,
}: GetBillingRequest): Promise<GetBillingResponse> {
  return await api.get(`organizations/${orgSlug}/billing`).json()
}
