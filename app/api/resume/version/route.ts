import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Document } from "~/app/(dashboard)/dashboard/data";
import { serverConfig } from "~/config/server";

const GET = withApiAuthRequired(async (req: NextRequest) => {
  try {
    const session = await getSession();
    const config = {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    };

    const getResumesReq = await fetch(serverConfig.url + "/resume", config);
    const resumes: Document[] = await getResumesReq.json();

    const data = resumes.map(async (resume) => {
      const versions = await fetch(
        serverConfig.url + `/resume/${resume.id}/version`,
        config
      );
      return await versions.json();
    });

    const versions = (await Promise.all(data)).flat();
    return NextResponse.json({
      resumes,
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
      serverConfig.url + `/resume/${body.id}/version/${body.version}`,
      {
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
