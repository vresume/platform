import { File } from "lucide-react"
import { Button } from "~/common/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog"
import { Input } from "~/common/components/ui/input"
import { Label } from "~/common/components/ui/label"
import { toast } from "sonner"
import { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation'
import { cn } from "~/common/utils/tailwind"
import { DocumentCreateButton } from "./document-create-button"


export function EmptyPlaceholder({ showInfo, hide }: { showInfo?: boolean, hide?: boolean }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    try {
      setIsLoading(true)
      const data = new FormData();

      const url = document.getElementById('url') as HTMLInputElement;
      const resume = document.getElementById('resume') as HTMLInputElement;
      const title = document.getElementById('title') as HTMLInputElement;
      const description = document.getElementById('description') as HTMLInputElement;

      data.append('extras', url.value);
      data.append('title', title.value);
      data.append('description', description.value);
      if (resume && resume.files?.length) {
        data.append('document', resume.files[0]);
      }

      const res = await fetch(`${window.location.origin}/api/documents`, {
        method: 'POST',
        body: data
      });

      if (!res.ok) {
        throw new Error('Failed to create resume')
      }

      setIsLoading(false)
      setIsOpen(false)

      location.reload();
      toast('Your resume is ready to be viewed')
    } catch (error) {
      setIsLoading(false)
      toast((error as any).message)
    }
  }

  return (
    <div
      className={cn(
        "flex h-[50px] shrink-0 items-center justify-center rounded-md border border-dashed",
        "h-[450px]"
      )}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <File className="h-10 w-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No resumes created</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not created any resumes. Add one below.
        </p>
        <DocumentCreateButton isOpen={isOpen} setIsOpen={setIsOpen} handleCreate={handleCreate} isLoading={isLoading} />
      </div>
    </div>
  )
}