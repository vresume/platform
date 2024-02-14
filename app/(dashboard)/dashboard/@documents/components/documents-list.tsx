"use client"
import { useEffect, useState } from 'react';
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { cn } from '~/common/utils/tailwind';


export async function DocumentsList() {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const getDocuments = await fetch(`${window.location.origin}/api/documents`);
      if (!getDocuments.ok) {
        console.error('Issues fetching documents', getDocuments.statusText);
      } else {
        setDocuments(await getDocuments.json());
      }
    })();
  }, []);

  return (
    <>
      {
        documents.map((document: any) => {
          return (
            <button
              key={document.id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                document.selectedDocumentId === document.id && "bg-muted"
              )}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{document.title}</div>
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      document.selectedDocumentId === document.id
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
      }
    </>
  );
}
