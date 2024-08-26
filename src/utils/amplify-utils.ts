import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import { getCurrentUser } from "aws-amplify/auth/server";
import outputs from "../../amplify_outputs.json";
import { Schema } from "../../amplify/data/resource";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
  authMode: "userPool",
});

export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: {
      cookies,
    },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        return !!user;
      } catch (error) {
        return false;
      }
    },
  });
