import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(4, 'Please include at least 4 characters.'),
  description: z.string(),
  slug: z.string(),
  avatarUrl: z.string().url().nullable(),
  organizationId: z.string().uuid(),
  ownerId: z.string().uuid(),
  createdAt: z.coerce.date(),
  owner: z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    avatarUrl: z.string().url().nullable(),
  }),
})

export const projectsSchema = z.object({
  data: z.array(projectSchema),
})

export type Project = z.infer<typeof projectSchema>
export type GetProjectsResponse = z.infer<typeof projectsSchema>

export type CreateProjectRequest = Pick<
  z.infer<typeof projectSchema>,
  'name' | 'description'
> & {
  orgSlug: string
}

export type CreateProjectResponse = {
  projectId: string
}
