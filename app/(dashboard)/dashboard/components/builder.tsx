"use client"
import React, { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  DoorOpenIcon,
  File,
  Hammer,
  HandCoins,
  Inbox,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Trash2,
  Users2,
  WebhookIcon,
} from "lucide-react"

import { AccountSwitcher } from "~/app/(dashboard)/dashboard/components/account-switcher"
import { BuilderDisplay } from "~/app/(dashboard)/dashboard/components/builder-display"
import { BuilderList } from "~/app/(dashboard)/dashboard/components/builder-list"
import { Nav } from "~/app/(dashboard)/dashboard/components/nav"
import { Document, ResumeVersion } from "~/app/(dashboard)/dashboard/data"
import { useBuilder } from "~/app/(dashboard)/dashboard/use-builder"
import { cn } from "~/lib/tailwind"
import { Separator } from "~/components/ui/separator"
import { Input } from "~/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"
import { TooltipProvider } from "~/components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable"
import { Session } from '@auth0/nextjs-auth0';
import { CopyAPIAuthorizationDialog } from '~/components/copy-api-authorization-dialog';
import { ThemeToggle } from '~/components/marketing/theme-toggle';

interface BuilderProps {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export default withPageAuthRequired(function MailPage({
  defaultLayout = [265, 440, 655],
  navCollapsedSize,
}: BuilderProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(true)
  const [selectedDocument, setSelectedDocument] = useBuilder()
  const [session, setSession] = useState<Session | null>(null);

  const [documents, setDocuments] = useState<Document[]>([])
  const [versions, setVersions] = useState<ResumeVersion[]>([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${window.location.origin}/api/session`);
      setSession(await res.json());

      const x0 = await fetch(`${window.location.origin}/api/resume/version`);
      const x0Data = await x0.json();

      console.log(x0Data);

      setDocuments(x0Data.resumes);
      setVersions(x0Data.versions);
    })();
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="items-stretch max-h-[calc(100vh)]"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          className={cn(isCollapsed && "min-w-[50px] max-w-[75px] transition-all duration-300 ease-in-out border-r")}
        >
          <div className={cn("flex h-[56px] items-center justify-center", isCollapsed ? 'h-[56px]' : 'px-2')}>
            <AccountSwitcher isCollapsed={isCollapsed} accounts={[
              {
                label: session?.user?.name,
                email: session?.user?.email,
                icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title>iCloud</title>
                  <path
                    d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
                    fill="currentColor"
                  />
                </svg>,
              }
            ]} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Editor",
                label: "",
                icon: Hammer,
                variant: "default",
              },
              {
                title: "Agency",
                label: "",
                icon: DoorOpenIcon,
                variant: "ghost",
              },
              {
                title: "Billing",
                label: "",
                icon: HandCoins,
                variant: "ghost",
              },
              {
                title: "Settings",
                label: "",
                icon: Settings,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 items-center justify-center [&>span]:w-auto [&>svg]:hidden">
              <CopyAPIAuthorizationDialog value={session?.accessToken ?? ''} />
            </nav>
          </div>
          <Separator />
          <ThemeToggle />

        </ResizablePanel>
        {/* <Separator /> */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
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
              <BuilderList items={documents} />
            </TabsContent>
            <TabsContent value="versions" className="m-0">
              <BuilderList items={
                versions.length ? versions.filter(
                  (item) => item.documentId === selectedDocument.selectedDocumentId
                ).map(
                  (item) => ({
                    id: item.id,
                    title: documents.find((d) => d.id === item.id)?.title ?? 'v' + item.version,
                    description: documents.find((d) => d.id === item.id)?.description ?? item.prompt,
                    updatedAt: item.updatedAt,
                  })
                ) : []
              } />

              {/* <BuilderList items={
                versions.length ? versions.map(
                  (item) => ({
                    id: item.id,
                    title: documents.find((d) => d.id === item.id)?.title ?? 'Hello WOrld',
                    description: documents.find((d) => d.id === item.id)?.description ?? 'Bye',
                    updatedAt: item.updatedAt,
                    version: String(item.version),
                  })
                ) : []
              } /> */}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <BuilderDisplay
            version={
              versions.find(
                (item) => item.version === selectedDocument.selectedVersion
              )
            }
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
});

