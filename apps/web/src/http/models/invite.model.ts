import { roleSchema } from '@ff-saas/auth'
import { z } from 'zod'

export const inviteSchema = z.object({
  id: z.string().uuid(),
  role: roleSchema,
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  createdAt: z.date(),
  organization: z.object({
    id: z.string(),
    name: z.string(),
  }),
  author: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
      avatarUrl: z.string().nullable(),
    })
    .nullable(),
})

export type AcceptInviteRequest = {
  inviteId: string
}
export type GetInviteRequest = {
  id: string
}
export type GetInvitesRequest = {
  orgSlug: string
}
export type RevokeInviteRequest = {
  orgSlug: string
  inviteId: string
}
export type CreateInviteRequest = Pick<
  z.infer<typeof inviteSchema>,
  'email' | 'role'
> & {
  orgSlug: string
}
export type RejectInviteRequest = {
  inviteId: string
}

export type GetInviteResponse = {
  data: z.infer<typeof inviteSchema>
}
export type GetInvitesResponse = {
  data: z.infer<typeof inviteSchema>[]
}
export type GetPendingInvitesResponse = {
  data: z.infer<typeof inviteSchema>[]
}
export type CreateInviteResponse = Promise<never>
