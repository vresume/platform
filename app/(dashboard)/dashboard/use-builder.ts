import { atom, useAtom } from "jotai";

import { Document, ResumeVersion } from "~/app/(dashboard)/dashboard/data";

type Config = {
  selectedDocumentId: Document["id"] | null;
  selectedVersion: ResumeVersion["id"] | null;
};

const configAtom = atom<Config>({
  selectedDocumentId: null,
  selectedVersion: null,
});

export function useBuilder() {
  return useAtom(configAtom);
}
