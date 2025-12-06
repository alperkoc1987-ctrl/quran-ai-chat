import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  // Authentication disabled - app works without user accounts
  const user: User | null = null;

  // Note: OAuth authentication is completely disabled.
  // All features use localStorage instead of database.
  // To re-enable authentication, uncomment the following:
  // try {
  //   user = await sdk.authenticateRequest(opts.req);
  // } catch (error) {
  //   user = null;
  // }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
