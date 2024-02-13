import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { Document } from "~/app/(dashboard)/dashboard/data";
import { serverConfig } from "~/config/server";

const GET = withApiAuthRequired(async (req: NextRequest) => {
  try {
    const session = await getSession();

    const getResumesReq = await fetch(serverConfig.url + "/documents", {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const documents: Document[] = await getResumesReq.json();

    const data = documents.map(async (resume) => {
      const versions = await fetch(
        serverConfig.url + `/documents/${resume.id}/version`,
        {
          cache: "force-cache",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      return await versions.json();
    });

    const versions = (await Promise.all(data)).flat();
    return NextResponse.json({
      resumes: documents,
      versions,
    });
  } catch (error) {
    return NextResponse.json({
      resumes: [],
      versions: [],
    });
  }
});

const POST = withApiAuthRequired(async (req: NextRequest) => {
  try {
    const session = await getSession();

    const body = await req.json();
    const response = await fetch(
      serverConfig.url + `/documents/${body.id}/version/${body.version}`,
      {
        cache: "force-cache",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: body.query,
          selected: body.selected,
        }),
      }
    );
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
  }
});

export { GET, POST };
