import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { serverConfig } from "~/config/server";

const GET = withApiAuthRequired(async () => {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const get = await fetch(serverConfig.url + "/users", {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const getJson = await get.json();

  if (getJson.length === 0) {
    const post = await fetch(serverConfig.url + "/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        nickname: session.user.nickname,
        picture: session.user.picture,
      }),
    });
    return NextResponse.json(
      {
        user: await post.json(),
        session,
      },
      { status: post.status }
    );
  }

  return NextResponse.json(
    {
      user: getJson[0],
      session,
    },
    { status: get.status }
  );
});

export { GET };
