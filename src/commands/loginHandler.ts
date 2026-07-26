import { exit } from "node:process";
import { setUser } from "../config";
import { getUserById } from "../lib/db/queries/user";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("the login handler expects a single argument, the username.");
    exit(1);
  }
  const user = await getUserById(args[0]);
  if (user === undefined) {
    throw new Error("You need to register before you login!!");
  }
  setUser(args[0]);
  console.log("the user has been set");
}
