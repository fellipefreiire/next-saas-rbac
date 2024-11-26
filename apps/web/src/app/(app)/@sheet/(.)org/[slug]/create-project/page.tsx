import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/_components/project-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default async function page() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>

        <ProjectForm />
      </InterceptedSheetContent>
    </Sheet>
  )
}
