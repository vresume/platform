import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: "https://opentalent.onrender.com",
      prompt: "login",
      scope: "openid profile email offline_access",
    },
    returnTo: "/dashboard",
  }),
  signup: handleLogin({
    authorizationParams: {
      audience: "https://opentalent.onrender.com",
      prompt: "login",
      screen_hint: "signup",
      scope: "openid profile email offline_access",
    },
    returnTo: "/dashboard",
  }),
});
