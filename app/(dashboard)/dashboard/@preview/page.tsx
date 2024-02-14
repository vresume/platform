"use client"
import { toast } from 'sonner';
import format from "date-fns/format"
import { useState } from 'react';
import { Trash2 } from "lucide-react";
import DOMPurify from 'dompurify';

import { Separator } from "~/common/components/ui/separator";
import { Skeleton } from '~/common/components/ui/skeleton';
import { useBuilder } from '~/common/hooks/use-builder';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/common/components/ui/tooltip';
import { Button } from '~/common/components/ui/button';
import { Textarea } from '~/common/components/ui/textarea';
import { Label } from '~/common/components/ui/label';
import { Switch } from '~/common/components/ui/switch';
import { ReloadIcon } from '@radix-ui/react-icons';


const Fallback = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[50px] w-full rounded-xl flex flex-col items-start gap-2 transition-all" />
      <Skeleton className="h-[50px] w-full rounded-xl flex flex-col items-start gap-2 transition-all" />
      <Skeleton className="h-[50px] w-full rounded-xl flex flex-col items-start gap-2 transition-all" />
    </div>
  )
}


export default function BuilderPreviewPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [doc] = useBuilder();
  const [query, setQuery] = useState<string>('');

  const createNewVersion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setIsLoading(true)
      e.preventDefault()

      const res = await fetch(`${window.location.origin}/api/documents/${doc.selectedId}/versions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: doc.selectedId,
          version: doc.selectedVersion,
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
    doc.selectedId ?
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
        {doc.selectedVersionId ? (
          <div className="flex flex-1 flex-col max-h-[calc(100%-4rem)] overflow-hidden">
            <div className="flex items-start p-4">
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(doc.selected?.updatedAt!), "PPpp")}
              </div>
            </div>
            <Separator />
            <div className="flex-1 whitespace-pre-wrap p-4 text-xs overflow-auto">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(doc.selected?.data ?? 'No data found for this version.')
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
                    <Button onClick={createNewVersion} disabled={isLoading} size="sm" className="ml-auto">
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
      </div > :
      isLoading ? <Fallback /> : null
  )
}