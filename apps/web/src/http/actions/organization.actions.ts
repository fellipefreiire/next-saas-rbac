'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'

import { organizationApi } from '../apis/organization.api'
import { organization } from '../models/organization.model'

export async function createOrganizationAction(data: FormData) {
  const result = organization
    .pick({
      name: true,
      domain: true,
      shouldAttachUsersByDomain: true,
    })
    .refine(
      (data) => {
        if (data.shouldAttachUsersByDomain === true && !data.domain) {
          return false
        }

        return true
      },
      {
        message: 'Domain is required when auto-join is enabled.',
        path: ['domain'],
      },
    )
    .safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await organizationApi.createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })
    revalidateTag('organizations')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization',
    errors: null,
  }
}

export async function updateOrganizationAction(data: FormData) {
  const currentOrg = await getCurrentOrg()
  const result = organization
    .pick({
      name: true,
      domain: true,
      shouldAttachUsersByDomain: true,
    })
    .refine(
      (data) => {
        if (data.shouldAttachUsersByDomain === true && !data.domain) {
          return false
        }

        return true
      },
      {
        message: 'Domain is required when auto-join is enabled.',
        path: ['domain'],
      },
    )
    .safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await organizationApi.updateOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
      orgSlug: currentOrg!,
    })

    revalidateTag('organizations')
    revalidateTag(`organization/${currentOrg}`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization',
    errors: null,
  }
}

export async function shutdownOrganizationAction() {
  const currentOrg = await getCurrentOrg()

  await organizationApi.shutdownOrganization(currentOrg!)
  revalidateTag('organizations')
  redirect('/')
}
