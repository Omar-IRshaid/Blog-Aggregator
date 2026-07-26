import { exit } from "process";
import { createUser, getUserById } from "../lib/db/queries/user";
import { setUser } from "../config";

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    console.log("the register handler expects a single argument, the username.");
    exit(1);
  }

  const result = await getUserById(args[0]);
  if (result != undefined) {
    throw new Error("This User Already Exist!!");
  }
  const newUser = await createUser(args[0]);
  setUser(args[0]);
  console.log("The User Has Been Created\nthe user has been set");
  console.log(newUser);
}
