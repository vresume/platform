import format from "date-fns/format"
import {
  Trash2,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"
import { Switch } from "~/components/ui/switch"
import { Textarea } from "~/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { ResumeVersion } from "~/app/(dashboard)/dashboard/data"
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { toast } from "sonner"
import { ReloadIcon } from "@radix-ui/react-icons"

interface BuilderDisplayProps {
  version: ResumeVersion | null | undefined
}

export function BuilderDisplay({ version }: BuilderDisplayProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')

  const handleCreateNewVersion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setIsLoading(true)
      e.preventDefault()

      const res = await fetch(`${window.location.origin}/api/resume/version`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: version?.documentId,
          version: version?.version,
          query,
          selected: '[]'
        })
      })

      if (!res.ok) {
        throw new Error('Failed to create resume')
      }

      setIsLoading(false)

      location.reload();
      toast('Your resume is ready to be viewed')
    } catch (error) {
      setIsLoading(false)
      toast((error as any).message)
    }
  }

  return (
    <div className="flex flex-col border-l border-r border-border h-screen">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!document}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Move to trash</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
        </div>
      </div>
      <Separator />
      {version ? (
        <div className="flex flex-1 flex-col max-h-[calc(100%-4rem)] overflow-hidden">
          <div className="flex items-start p-4">
            {version.updatedAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(version.updatedAt), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-xs overflow-auto">

            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(version.data)
              }}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                overflowY: 'scroll'
              }}
            />

          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="p-4"
                  placeholder={`Update the bio section to include hackathon wins, and add a link to the project on GitHub.`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mail to self
                  </Label>
                  <Button onClick={handleCreateNewVersion} disabled={isLoading} size="sm" className="ml-auto">
                    {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Create new version
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div >
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No version selected
        </div>
      )
      }
    </div >
  )
}
