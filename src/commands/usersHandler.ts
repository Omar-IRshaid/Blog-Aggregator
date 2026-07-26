import { readConfig } from "../config";
import { getUsers } from "../lib/db/queries/user";

export async function handlerUsers(cmdName: string, ...args: string[]) {
  const result = await getUsers();
  const config = readConfig();
  const currentUserName = config.currentUserName;

  result.forEach((user) => {
    if (user.name === currentUserName) console.log(`* ${user.name} (current)`);
    else console.log(`* ${user.name}`);
  });
}
