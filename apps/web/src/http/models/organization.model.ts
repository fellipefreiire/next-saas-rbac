import { roleSchema } from '@ff-saas/auth'
import { z } from 'zod'

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(4, 'Please include at least 4 characters.'),
  domain: z
    .string()
    .nullish()
    .refine(
      (value) => {
        if (value) {
          const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

          return domainRegex.test(value)
        }

        return true
      },
      {
        message: 'Please, enter a valid domain.',
      },
    ),
  slug: z.string(),
  avatarUrl: z.string().url().nullable(),
  shouldAttachUsersByDomain: z
    .union([z.literal('on'), z.literal('off'), z.boolean()])
    .transform((value) => value === true || value === 'on')
    .default(false),
  ownerId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const membershipSchema = z.object({
  id: z.string().uuid(),
  role: roleSchema,
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
})

export const memberSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  role: roleSchema,
  name: z.string().nullable(),
  email: z.string().email(),
  avatarUrl: z.string().url().nullable(),
})

export type Organization = z.infer<typeof organizationSchema>

export type GetOrganizationRequest = {
  orgSlug: string
}
export type GetMembershipRequest = {
  orgSlug: string
}
export type GetMembersRequest = {
  orgSlug: string
}
export type UpdateMemberRequest = Pick<z.infer<typeof memberSchema>, 'role'> & {
  orgSlug: string
  memberId: string
}
export type RemoveMemberRequest = {
  orgSlug: string
  memberId: string
}
export type CreateOrganizationRequest = Pick<
  z.infer<typeof organizationSchema>,
  'name' | 'domain' | 'shouldAttachUsersByDomain'
>
export type UpdateOrganizationRequest = Pick<
  z.infer<typeof organizationSchema>,
  'name' | 'domain' | 'shouldAttachUsersByDomain'
> & {
  orgSlug: string
}
export type ShutdownOrganizationRequest = {
  orgSlug: string
}

export type GetOrganizationResponse = {
  data: z.infer<typeof organizationSchema>
}
export type GetOrganizationsResponse = {
  data: z.infer<typeof organizationSchema>[]
}
export type GetMembershipResponse = {
  data: z.infer<typeof membershipSchema>
}
export type GetMemberResponse = z.infer<typeof memberSchema>
export type GetMembersResponse = {
  data: z.infer<typeof memberSchema>[]
}
export type CreateOrganizationResponse = {
  organizationId: string
}
