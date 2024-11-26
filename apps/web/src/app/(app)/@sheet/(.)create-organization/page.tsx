import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { OrganizationForm } from '../../create-organization/_components/organization-form'

export default async function page() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <OrganizationForm />
      </InterceptedSheetContent>
    </Sheet>
  )
}
