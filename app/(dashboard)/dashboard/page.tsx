import { cookies } from "next/headers"

import Builder from "~/app/(dashboard)/dashboard/components/builder"

export default function BuilderPage() {
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? Boolean(collapsed.value) : false

  return (
    <>
      <div className="md:hidden flex items-center justify-center">
        Not Supported on Mobile
      </div>
      <div className="hidden flex-col md:flex">
        <Builder
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}
