'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'
import { shutdownOrganization } from '@/http/apis/organization/shutdown-organization'

export async function shutdownOrganizationAction() {
  const currentOrg = await getCurrentOrg()

  await shutdownOrganization(currentOrg!)
  revalidateTag('organizations')
  redirect('/')
}
