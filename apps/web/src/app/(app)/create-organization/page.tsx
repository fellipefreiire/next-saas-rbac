import { Header } from '@/components/header'

import { OrganizationForm } from './_components/organization-form'

export default function page() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-2xl font-bold">Create organization</h1>

        <OrganizationForm />
      </main>
    </div>
  )
}
