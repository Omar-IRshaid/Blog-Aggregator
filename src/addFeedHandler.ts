import { readConfig } from "./config";
import { createFeed } from "./lib/db/queries/feed";
import { getUserById } from "./lib/db/queries/user";
import { Feed } from "./lib/db/schema";
import { printFeed } from "./printFeed";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if (args.length < 2) {
    throw new Error("Please provide more information!!");
  }

  const [name, url] = args;

  const config = readConfig();
  const currentUserName = config.currentUserName;
  const user = await getUserById(currentUserName);
  if (!user) {
    throw new Error("User Not Found!!");
  }
  const feed: Feed = await createFeed(name, url, user.id);
  printFeed(feed, user);
}
