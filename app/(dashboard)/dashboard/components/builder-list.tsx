import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { cn } from "~/lib/tailwind"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Document } from "~/app/(dashboard)/dashboard/data"
import { useBuilder } from "~/app/(dashboard)/dashboard/use-builder"
import { ResumeEmptyPlaceholder } from "./resume-empty-placeholder"
import { RocketIcon } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert"

interface BuilderListProps {
  items: {
    id: Document["id"]
    title: Document["title"]
    description: Document["description"]
    updatedAt: Document["updatedAt"]
  }[]
  showPlaceholder?: boolean
}

export function BuilderList({ items, showPlaceholder }: BuilderListProps) {
  const [document, setDocument] = useBuilder()

  return (
    <ScrollArea className="h-screen border-border">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {
          items.length ?

            <>
              {items.map((item) => {
                return (
                  <button
                    key={item.id}
                    className={cn(
                      "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                      document.selectedDocumentId === item.id && "bg-muted"
                    )}
                    onClick={() => {
                      if (item.title.startsWith('v')) {
                        setDocument({
                          ...document,
                          selectedVersion: parseInt(item.title.slice(1)),
                        })
                      } else {
                        setDocument({
                          ...document,
                          selectedDocumentId: item.id,
                        })
                      }
                    }
                    }
                  >
                    <div className="flex w-full flex-col gap-1">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold">{item.title}</div>
                        </div>
                        <div
                          className={cn(
                            "ml-auto text-xs",
                            document.selectedDocumentId === item.id
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {formatDistanceToNow(new Date(item.updatedAt), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>
                    {
                      item.description && (
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {item.description.substring(0, 300)}
                        </div>
                      )
                    }
                    <div className="flex items-center gap-2">
                    </div>
                  </button>
                )
              })}
              {
                items.length < 3 ? (
                  <ResumeEmptyPlaceholder hide={items[0].title.startsWith('v')} />
                ) : (
                  <Alert variant="default">
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Free Limit Reached</AlertTitle>
                    <AlertDescription className="text-sm">
                      You have reached the limit of resumes you can create. Please upgrade your plan to create more.
                    </AlertDescription>
                  </Alert>
                )
              }
            </>

            :
            showPlaceholder && (<ResumeEmptyPlaceholder />)
        }
        {
          items.length === 0 && (<Alert variant="default">
            <AlertDescription className="text-sm text-center">
              Select a resume to view the versions
            </AlertDescription>
          </Alert>)
        }
      </div>
    </ScrollArea>
  )
}
