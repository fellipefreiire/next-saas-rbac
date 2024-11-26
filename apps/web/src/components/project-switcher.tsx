'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { projectApi } from '@/http/apis/project.api'

import { Avatar, AvatarFallback } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function ProjectSwitcher() {
  const { slug: orgSlug } = useParams<{
    slug: string
  }>()

  const { data } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => projectApi.getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  console.log({ data })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {/* {!!currentOrganization && (
          <>
            <Avatar className="mr-2 size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        )}
        {!currentOrganization && (
          <span className="text-muted-foreground">Select organization</span>
        )} */}
        <span className="text-muted-foreground">Select project</span>
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[200px]"
        align="end"
        sideOffset={12}
        alignOffset={-16}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {/* {data.map((organization) => ( */}
          <DropdownMenuItem
            //  key={organization.id}
            asChild
          >
            {/* <Link href={`/org/${organization.slug}`} className="cursor-pointer"> */}
            <Avatar className="mr-2 size-4">
              {/* {organization.avatarUrl && (
                  <AvatarImage src={organization.avatarUrl} />
                )} */}
              <AvatarFallback />
            </Avatar>
            <span className="line-clamp-1">Projeto teste</span>
            {/* </Link> */}
          </DropdownMenuItem>
          {/* ))} */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-organization" className="cursor-pointer">
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
