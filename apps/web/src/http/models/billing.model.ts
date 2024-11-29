import { z } from 'zod'

export const billingSchema = z.object({
  data: z.object({
    seats: z.object({
      amount: z.number(),
      unit: z.number(),
      price: z.number(),
    }),
    projects: z.object({
      amount: z.number(),
      unit: z.number(),
      price: z.number(),
    }),
    total: z.number(),
  }),
})

export type GetBillingRequest = {
  orgSlug: string
}
export type GetBillingResponse = z.infer<typeof billingSchema>
