import { readConfig } from "src/config";
import { getFeedFollowsForUser } from "src/lib/db/queries/feedfollow";
import { getUserById } from "src/lib/db/queries/user";
import { User } from "src/lib/db/schema";

export async function handlerFollowing(cmdName: string, currentUser: User, ...args: string[]) {
  const feedFollow = await getFeedFollowsForUser(currentUser.id);

  console.log(`Current user is: ${currentUser.name}`);
  feedFollow.forEach((entry) => {
    console.log(entry.feeds.name);
  });
}
