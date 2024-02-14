"use client"
import { Hammer, LogOutIcon } from "lucide-react";


import { cn } from "~/common/utils/tailwind";
import { Separator } from "~/common/components/ui/separator"
import { TooltipProvider } from "~/common/components/ui/tooltip"
import { Nav } from "~/common/components/builder/nav";
import { CopyAPIAuthorizationDialog } from "~/common/components/copy-api-authorization-dialog";
import { ThemeToggle } from "~/common/components/marketing/theme-toggle";
import { buttonVariants } from "~/common/components/ui/button";
import { ResizablePanelGroup, ResizablePanel } from "~/common/components/ui/resizable";
import { Button } from '~/common/components/ui/button';
import { Suspense } from "react";
import { LoadingSkeleton } from "~/common/components/loading-skeleton";


export default function Layout({
  children,
  documents,
  preview
}: {
  children: React.ReactNode
  documents: React.ReactNode
  preview: React.ReactNode
}) {

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="items-stretch max-h-[calc(100vh)]"
      >
        <ResizablePanel
          defaultSize={265}
          collapsible={true}
          minSize={15}
          maxSize={20}
          className={cn(
            "hidden transition-all duration-300 ease-in-out border-r",
            "md:block md:min-w-[50px] md:max-w-[75px] md:w-[75px]"
          )}
        >
          <Separator />
          <Nav
            isCollapsed={true}
            links={[
              {
                title: "Editor",
                label: "",
                icon: Hammer,
                variant: "default",
              },
            ]}
          />
          <Separator />

          <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 items-center justify-center [&>span]:w-auto [&>svg]:hidden">
              <div
                className={cn(
                  buttonVariants({ variant: 'outline', size: "icon" }),
                  "h-9 w-9 p-0"
                )}
              >
                <ThemeToggle absolute={false} overrideClass="group z-50" />
              </div>
            </nav>
          </div>
          <Separator />

          <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 items-center justify-center [&>span]:w-auto [&>svg]:hidden">
              <CopyAPIAuthorizationDialog value={''} />
            </nav>
          </div>
          <Separator />

          <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 items-center justify-center [&>span]:w-auto [&>svg]:hidden">
              <Button variant="ghost"
                onClick={() => {
                  window.location.href = '/api/auth/logout';
                }}
                className={cn(
                  buttonVariants({ variant: 'outline', size: "icon" }),
                  "h-9 w-9 p-0"
                )}
              >
                <LogOutIcon className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={440}>
          {documents}
        </ResizablePanel>
        <ResizablePanel defaultSize={655}>
          <Suspense fallback={<LoadingSkeleton />}>
            {preview}
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}