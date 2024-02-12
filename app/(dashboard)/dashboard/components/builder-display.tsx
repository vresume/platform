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

interface BuilderDisplayProps {
  version: ResumeVersion | null | undefined
}

export function BuilderDisplay({ version }: BuilderDisplayProps) {

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
            <div className="flex items-start gap-4 text-sm">
              <div className="grid gap-1">
                {/* <div className="font-semibold">{document.title}</div>
                <div className="line-clamp-1 text-xs">{document.description}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {document.versionId}
                </div> */}
              </div>
            </div>
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
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Create new version
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No version selected
        </div>
      )}
    </div>
  )
}
