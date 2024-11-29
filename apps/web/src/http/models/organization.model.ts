import { roleSchema } from '@ff-saas/auth'
import { z } from 'zod'

export const organization = z.object({
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
  data: z.object({
    id: z.string().uuid(),
    role: roleSchema,
    userId: z.string().uuid(),
    organizationId: z.string().uuid(),
  }),
})

export const organizationSchema = z.object({
  data: organization,
})

export const organizationsSchema = z.object({
  data: z.array(
    organization.pick({
      id: true,
      name: true,
      slug: true,
      avatarUrl: true,
    }),
  ),
})

export const memberSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  role: roleSchema,
  name: z.string().nullable(),
  email: z.string().email(),
  avatarUrl: z.string().url().nullable(),
})

export const membersSchema = z.object({
  data: z.array(memberSchema),
})

export type Organization = z.infer<typeof organization>

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
  z.infer<typeof organization>,
  'name' | 'domain' | 'shouldAttachUsersByDomain'
>
export type UpdateOrganizationRequest = Pick<
  z.infer<typeof organization>,
  'name' | 'domain' | 'shouldAttachUsersByDomain'
> & {
  orgSlug: string
}
export type ShutdownOrganizationRequest = {
  orgSlug: string
}

export type GetOrganizationResponse = z.infer<typeof organizationSchema>
export type GetOrganizationsResponse = z.infer<typeof organizationsSchema>
export type GetMembershipResponse = z.infer<typeof membershipSchema>
export type GetMemberResponse = z.infer<typeof memberSchema>
export type GetMembersResponse = z.infer<typeof membersSchema>
export type CreateOrganizationResponse = {
  organizationId: string
}
