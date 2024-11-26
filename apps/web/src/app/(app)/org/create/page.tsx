import { OrganizationForm } from '../_components/organization-form'

export default function page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <OrganizationForm />
    </div>
  )
}
