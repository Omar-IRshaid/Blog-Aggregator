import { CommandHandler, UserCommandHandler } from "src/commands/commands";
import { readConfig } from "src/config";
import { getUserById } from "src/lib/db/queries/user";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async (cmdName: string, ...args: string[]) => {
    const config = readConfig();
    const currentUser = await getUserById(config.currentUserName);
    if (!currentUser) {
      throw new Error("This user doesnt Exist!!");
    }

    await handler(cmdName, currentUser, ...args);
  };
}
