'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { createOrganization } from '@/http/apis/organization/create-organization'
import { organization } from '@/http/models/organization.model'

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
    await createOrganization({
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
