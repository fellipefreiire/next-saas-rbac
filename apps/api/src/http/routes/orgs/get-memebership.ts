import { roleSchema } from '@ff-saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/membership',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get user membership on organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              data: z.object({
                id: z.string().uuid(),
                role: roleSchema,
                userId: z.string().uuid(),
                organizationId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params
        const { membership } = await request.getUserMembership(slug)

        return {
          data: {
            id: membership.id,
            role: roleSchema.parse(membership.role),
            userId: membership.userId,
            organizationId: membership.organizationId,
          },
        }
      },
    )
}
