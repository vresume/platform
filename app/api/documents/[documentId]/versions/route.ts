import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { serverConfig } from "~/common/config/server";

const GET = withApiAuthRequired(async (req: NextRequest) => {
  const session = await getSession();
  const documentId = req.nextUrl.pathname.split("/")[3];

  const fetchVersions = await fetch(
    serverConfig.url + `/documents/${documentId}/versions`,
    {
      method: "GET",
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

  const fetchVersionsJson = await fetchVersions.json();
  return NextResponse.json(fetchVersionsJson);
});

const POST = withApiAuthRequired(async (req: NextRequest) => {
  const session = await getSession();
  const body = await req.json();

  const res = await fetch(
    serverConfig.url + `/documents/${body.id}/versions/${body.version}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        query: body.query,
        selected: body.selected,
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json(await res.json(), { status: res.status });
  }

  return NextResponse.json(await res.json());
});

export { GET, POST };
