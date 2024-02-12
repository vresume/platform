import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Document } from "~/app/(dashboard)/dashboard/data";
import { serverConfig } from "~/config/server";

const GET = withApiAuthRequired(async (req: NextRequest) => {
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
});

export { GET };
