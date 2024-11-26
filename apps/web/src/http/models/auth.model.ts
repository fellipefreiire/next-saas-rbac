import { z } from 'zod'

export const authSchema = z.object({
  name: z.string().refine((value) => value.split(' ').length > 1, {
    message: 'Please, enter your full name',
  }),
  email: z.string().email('Please, provide a valid e-mail address.'),
  password: z.string().min(6, 'Password should have at least 6 characters.'),
  password_confirmation: z.string(),
  token: z.string(),
  code: z.string(),
})

export const userSchema = z.object({
  data: z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    email: z.string().email(),
    avatarUrl: z.string().url().nullable(),
  }),
})

export type SignInWithPasswordRequest = Pick<
  z.infer<typeof authSchema>,
  'email' | 'password'
>
export type SignInWithGithubRequest = Pick<z.infer<typeof authSchema>, 'code'>
export type SignInResponse = Pick<z.infer<typeof authSchema>, 'token'>

export type SignUpFormSchema = Pick<
  z.infer<typeof authSchema>,
  'name' | 'email' | 'password' | 'password_confirmation'
>
export type SignUpRequest = Pick<
  z.infer<typeof authSchema>,
  'name' | 'email' | 'password'
>

export type GetProfileResponse = z.infer<typeof userSchema>
