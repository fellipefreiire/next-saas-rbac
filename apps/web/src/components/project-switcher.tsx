'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, Loader2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { projectApi } from '@/http/apis/project.api'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, projectSlug } = useParams<{
    slug: string
    projectSlug: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => projectApi.getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject = data?.data.find((proj) => proj.slug === projectSlug)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {isLoading && (
          <>
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </>
        )}
        {!!currentProject && !isLoading && (
          <>
            <Avatar className="size-4">
              {currentProject.avatarUrl && (
                <AvatarImage src={currentProject.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">{currentProject.name}</span>
          </>
        )}
        {!currentProject && !isLoading && (
          <span className="text-muted-foreground">Select project</span>
        )}

        {isLoading && (
          <Loader2 className="ml-auto size-4 shrink-0 animate-spin text-muted-foreground" />
        )}
        {!isLoading && (
          <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[200px]"
        align="end"
        sideOffset={12}
        alignOffset={-16}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data &&
            data.data.map((project) => (
              <DropdownMenuItem key={project.id} asChild>
                <Link
                  href={`/org/${orgSlug}/project/${project.slug}`}
                  className="cursor-pointer"
                >
                  <Avatar className="size-4">
                    {project.avatarUrl && (
                      <AvatarImage src={project.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{project.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/org/${orgSlug}/create-project`}
            className="cursor-pointer"
          >
            <PlusCircle className="size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
