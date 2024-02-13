export default function Layout({
  children,
  documents,
  preview,
}: {
  children: React.ReactNode
  documents: React.ReactNode
  preview: React.ReactNode
}) {
  return (
    <>
      {children}
      {documents}
      {preview}
    </>
  )
}