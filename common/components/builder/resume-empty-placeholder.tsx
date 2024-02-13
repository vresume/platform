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
import { cn } from "~/common/lib/tailwind"


export function ResumeEmptyPlaceholder({ showInfo, hide }: { showInfo?: boolean, hide?: boolean }) {
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
        showInfo &&
        "h-[450px]",
        hide && "hidden"
      )}
    >

      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {
          showInfo ? (
            <>
              <File className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No resumes created</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You have not created any resumes. Add one below.
              </p>
            </>
          ) : null
        }
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="relative" onClick={() => setIsOpen(true)}>
              Create Resume
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Resume</DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs">
                Copy and paste the job feed URL and upload your original resume.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input disabled={isLoading} id="title" placeholder="Title" />
              </div>
              <div className="grid gap-2">
                <Input disabled={isLoading} id="description" placeholder="Description" />
              </div>
              <div className="grid gap-2">
                <Input disabled={isLoading} id="url" placeholder="https://jobs.netflix.com/jobs/316087589" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Input
                  disabled={isLoading}
                  id="resume"
                  type="file"
                  accept=".pdf"
                />

              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={isLoading}>
                {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}