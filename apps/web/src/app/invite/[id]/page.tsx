import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CheckCircle, LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'

import { auth, isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { acceptInviteAction } from '@/http/actions/invite/accept-invite-action'
import { signInFromInvite } from '@/http/actions/invite/sign-in-from-invite-action'
import { getInvite } from '@/http/apis/invite/get-invite'
dayjs.extend(relativeTime)

type PageProps = {
  params: {
    id: string
  }
}
export default async function page({ params }: PageProps) {
  const inviteId = params.id
  const { data } = await getInvite({ id: inviteId })
  const isUserAuthenticated = await isAuthenticated()
  let currentUserEmail = null
  if (isUserAuthenticated) {
    const { user } = await auth()

    currentUserEmail = user.email
  }
  const userIsAuthenticatedWithSameEmailFromInvite =
    currentUserEmail === data.email

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {data.author?.avatarUrl && (
              <AvatarImage src={data.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>

          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {data.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="font-medium text-foreground">
              {data.organization.name}
            </span>
            . <span className="text-xs">{dayjs(data.createdAt).fromNow()}</span>
          </p>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInvite.bind(null, data.id, data.email)}>
            <Button type="submit" variant="secondary" className="w-full">
              <LogIn className="mr-2 size-4" />
              Sign in to accept the invite
            </Button>
          </form>
        )}

        {userIsAuthenticatedWithSameEmailFromInvite && (
          <form action={acceptInviteAction.bind(null, data.id)}>
            <Button type="submit" variant="secondary" className="w-full">
              <CheckCircle className="mr-2 size-4" />
              Join {data.organization.name}
            </Button>
          </form>
        )}

        {isUserAuthenticated && !userIsAuthenticatedWithSameEmailFromInvite && (
          <div className="space-y-4">
            <p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">
              This invite was sent to{' '}
              <span className="font-medium text-foreground">{data.email}</span>{' '}
              but you are currently authenticated as{' '}
              <span className="font-medium text-foreground">
                {currentUserEmail}
              </span>
            </p>

            <div className="space-y-2">
              <Button className="w-full" variant="secondary" asChild>
                <a href="/api/auth/sign-out">
                  <LogOut className="mr-2 size-4" />
                  Sign out from {currentUserEmail}
                </a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/">Sign out from {currentUserEmail}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
