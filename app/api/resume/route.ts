import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { serverConfig } from "~/config/server";

const GET = withApiAuthRequired(async () => {
  const session = await getSession();
  const response = await fetch(serverConfig.url + "/resume", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const result = await response.json();
  return NextResponse.json(result, { status: response.status });
});

const POST = withApiAuthRequired(async (req: NextRequest) => {
  const session = await getSession();
  const response = await fetch(serverConfig.url + "/resume", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: await req.formData(),
  });
  const result = await response.json();
  return NextResponse.json(result, { status: response.status });
});

export { GET, POST };
