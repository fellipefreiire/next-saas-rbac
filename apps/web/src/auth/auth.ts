import { defineAbilityFor } from '@ff-saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { authApi } from '@/http/apis/auth.api'
import { organizationApi } from '@/http/apis/organization.api'

export async function isAuthenticated() {
  const cookieStore = await cookies()

  return !!cookieStore.get('token')?.value
}

export async function getCurrentOrg() {
  const cookieStore = await cookies()
  const currentOrgCookie = cookieStore.get('org')?.value ?? null

  return currentOrgCookie
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const { data: membership } = await organizationApi.getMembership(org)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { data } = await authApi.getProfile()

    return { user: data }
  } catch {}

  redirect('/api/auth/sign-out')
}
