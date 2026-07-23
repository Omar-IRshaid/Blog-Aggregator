import { resetUsersTable } from "./lib/db/queries/user";

export async function handlerReset(cmdName: string, ...args: string[]) {
  await resetUsersTable();
  console.log("All the Rows in Users Table is deleted");
}
