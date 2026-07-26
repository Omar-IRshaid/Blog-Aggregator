import { User } from "src/lib/db/schema";
import { readConfig } from "../config";
import { getUsers } from "../lib/db/queries/user";
import { getFeedByUrl } from "src/lib/db/queries/feed";
import { deleteFeedFollow } from "src/lib/db/queries/feedfollow";
import { userInfo } from "node:os";

export async function handlerUnfollow(cmdName: string, currentUser: User, ...args: string[]) {
  if (args.length < 1) {
    throw new Error("THere should be more information!!");
  }

  const feed = await getFeedByUrl(args[0]);
  if (!feed) {
    throw new Error("feed doesnt exist!!");
  }

  await deleteFeedFollow(currentUser.id, feed.id);
}
