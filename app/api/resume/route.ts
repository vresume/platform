import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { serverConfig } from "~/config/server";

const GET = withApiAuthRequired(async () => {
  const session = await getSession();
  const response = await fetch(serverConfig.url + "/resume", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const result = await response.json();
  return NextResponse.json(result);
});

export { GET };
