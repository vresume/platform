"use client"
import { toast } from 'sonner';
import { Suspense, useEffect, useState } from 'react';
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { Search } from "lucide-react";

import { Input } from "~/common/components/ui/input";
import { Separator } from "~/common/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/common/components/ui/tabs";
import { Skeleton } from '~/common/components/ui/skeleton';
import { ScrollArea } from '~/common/components/ui/scroll-area';
import { cn } from '~/common/utils/tailwind';
import { Document, useBuilder } from '~/common/hooks/use-builder';
import { EmptyPlaceholder } from './components/empty-placeholder';


const Fallback = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[50px] w-full rounded-xl flex flex-col items-start gap-2 transition-all" />
      <Skeleton className="h-[50px] w-full rounded-xl flex flex-col items-start gap-2 transition-all" />
      <Skeleton className="h-[50px] w-full rounded-xl flex flex-col items-start gap-2 transition-all" />
    </div>
  )
}


export default function BuilderDocumentsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [doc, setDoc] = useBuilder();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [versions, setVersions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const getDocuments = await fetch(`${window.location.origin}/api/documents`);
      if (!getDocuments.ok) {
        console.error('Issues fetching documents', getDocuments.statusText);
        toast('Issues fetching documents');
      } else {
        setDocuments(await getDocuments.json());
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (doc.selectedId) {
        setIsLoading(true);
        const getVersions = await fetch(`${window.location.origin}/api/documents/${doc.selectedId}/versions`);
        if (!getVersions.ok) {
          console.error('Issues fetching versions', getVersions.statusText);
          toast('Issues fetching versions');
        } else {
          setVersions(await getVersions.json());
        }
        setIsLoading(false);
      }
    })();
  }, [doc.selectedId]);

  return (
    <Tabs defaultValue="resumes">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Builder
          <span className="text-muted-foreground text-xs font-light"> v0.1.0</span>
        </h1>
        <TabsList className="ml-auto">
          <TabsTrigger value="resumes" className="text-zinc-600 dark:text-zinc-200">Resumes</TabsTrigger>
          <TabsTrigger value="versions" className="text-zinc-600 dark:text-zinc-200">Versions</TabsTrigger>
        </TabsList>
      </div>
      <Separator />
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div>
      <TabsContent value="resumes" className="m-0">
        <ScrollArea className="h-screen border-border">
          <div className="flex flex-col gap-2 p-4 pt-0">
            <Suspense fallback={<Fallback />}>
              {
                documents.length ?
                  documents.map((document) => {
                    return (
                      <button
                        key={document.id}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                          doc.selectedId === document.id && "bg-muted"
                        )}
                        onClick={() => {
                          setDoc({
                            ...doc,
                            selectedId: document.id,
                          });
                        }}
                      >
                        <div className="flex w-full flex-col gap-1">
                          <div className="flex items-center">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{document.title}</div>
                            </div>
                            <div
                              className={cn(
                                "ml-auto text-xs",
                                doc.selectedId === document.id
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {formatDistanceToNow(new Date(document.updatedAt), {
                                addSuffix: true,
                              })}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                  : isLoading ? <Fallback /> : <EmptyPlaceholder />
              }
            </Suspense>
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="versions" className="m-0">
        <ScrollArea className="h-screen border-border">
          <div className="flex flex-col gap-2 p-4 pt-0">
            <Suspense fallback={<Fallback />}>
              {
                isLoading ? <Fallback /> : versions.length ? versions.filter(
                  (selected) => selected.documentId === doc.selectedId
                ).map(
                  (selected) => (
                    <button
                      key={selected.id}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                        doc.selectedVersionId === selected.version && "bg-muted"
                      )}
                      onClick={() => {
                        setDoc({
                          ...doc,
                          selectedVersionId: selected.id,
                          selected,
                          selectedVersion: selected.version,
                        });
                      }}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">v{selected.version}</div>
                          </div>
                          <div
                            className={cn(
                              "ml-auto text-xs",
                              doc.selectedVersionId === selected.version
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {formatDistanceToNow(new Date(selected.updatedAt), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                ) : null
              }
            </Suspense>
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}