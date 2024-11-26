import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'

import { ProjectForm } from './_components/project-form'

export default async function page() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create project</h1>

      <ProjectForm />
    </div>
  )
}
