import { readConfig } from "src/config";
import { getFeedByUrl } from "src/lib/db/queries/feed";
import { createFeedFollow } from "src/lib/db/queries/feedfollow";
import { getUserById } from "src/lib/db/queries/user";
import { User } from "src/lib/db/schema";

export async function handlerFollow(cmdName: string, currentUser: User, ...args: string[]) {
  if (args.length < 1) {
    throw new Error("please provide more information!!");
  }

  const url = args[0];
  const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error("This Feed doesn't exist!!");
  }

  const feedFollow = await createFeedFollow(currentUser.id, feed.id);
}
