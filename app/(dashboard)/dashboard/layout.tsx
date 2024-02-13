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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
          className="min-w-[50px] max-w-[75px] transition-all duration-300 ease-in-out border-r"
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
              <CopyAPIAuthorizationDialog value={''} />
            </nav>
          </div>
          <Separator />
          <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 items-center justify-center [&>span]:w-auto [&>svg]:hidden">
              <Button variant="ghost"
                onClick={() => {
                  // setSession(null);
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
        </ResizablePanel>
        <ResizablePanel defaultSize={1095}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}