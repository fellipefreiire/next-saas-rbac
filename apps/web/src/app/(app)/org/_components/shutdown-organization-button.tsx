import { XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { shutdownOrganizationAction } from '@/http/actions/organization/shutdown-organization-action'

export function ShutdownOrganizationButton() {
  return (
    <form action={shutdownOrganizationAction}>
      <Button type="submit" variant="destructive" className="w-56">
        <XCircle className="mr-2 size-4" />
        Shutdown Organization
      </Button>
    </form>
  )
}
