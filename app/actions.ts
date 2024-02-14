"use server";

import { Document } from "~/common/hooks/use-builder";

export async function getUser(): Promise<{
  success: boolean;
  data?: any;
  error?: {
    status: number;
    statusText: string;
  };
}> {
  const res = await fetch(`http://localhost:4040/api/users`);

  if (!res.ok) {
    return {
      success: false,
      error: {
        status: res.status,
        statusText: res.statusText,
      },
    };
  }

  return {
    success: true,
    data: await res.json(),
  };
}

export async function getDocuments() {
  try {
    // const res = await fetch(`http://localhost:4040/api/documents`);
    // console.log("res", res);
    return [];
  } catch (error) {
    return [];
  }
}
