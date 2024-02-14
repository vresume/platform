import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "~/common/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "~/common/components/ui/dialog";
import { Button } from "~/common/components/ui/button";
import { DialogHeader, DialogFooter } from "~/common/components/ui/dialog";


interface DocumentCreateButtonProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isLoading: boolean
  handleCreate: () => void
}


export function DocumentCreateButton({ isOpen, setIsOpen, isLoading, handleCreate }: DocumentCreateButtonProps) {
  return (
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
  )
}