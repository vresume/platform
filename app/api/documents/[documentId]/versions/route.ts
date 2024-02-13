import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { ResumeVersion } from "~/hooks/data";
import { serverConfig } from "~/common/config/server";

const GET = withApiAuthRequired(async (req: NextRequest) => {
  const session = await getSession();
  const documentId = req.nextUrl.pathname.split("/")[3];

  const fetchVersions = await fetch(
    serverConfig.url + `/documents/${documentId}/versions`,
    {
      method: "GET",
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  if (!fetchVersions.ok) {
    return NextResponse.json(await fetchVersions.json(), {
      status: fetchVersions.status,
    });
  }

  const fetchVersionsJson: ResumeVersion[] = await fetchVersions.json();
  return NextResponse.json(fetchVersionsJson);
});

export { GET };
