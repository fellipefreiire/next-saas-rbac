'use server'

import { HTTPError } from 'ky'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/apis/project/create-projects'
import { projectSchema } from '@/http/models/project.model'

export async function createProjectAction(data: FormData) {
  const result = projectSchema
    .pick({
      name: true,
      description: true,
    })
    .safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  const orgSlug = await getCurrentOrg()

  try {
    await createProject({
      name,
      description,
      orgSlug: orgSlug!,
    })
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
    message: 'Successfully saved the project',
    errors: null,
  }
}
