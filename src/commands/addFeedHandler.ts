import { createFeedFollow } from "src/lib/db/queries/feedfollow";
import { readConfig } from "../config";
import { createFeed } from "../lib/db/queries/feed";
import { getUserById } from "../lib/db/queries/user";
import { Feed, User } from "../lib/db/schema";

export async function handlerAddFeed(cmdName: string, currentUser: User, ...args: string[]) {
  if (args.length < 2) {
    throw new Error("Please provide more information!!");
  }

  const [name, url] = args;

  const feed: Feed = await createFeed(name, url, currentUser.id);
  const feedFollow = await createFeedFollow(currentUser.id, feed.id);
  printFeed(feed, currentUser);
}

export function printFeed(feed: Feed, currentUser: User) {
  console.log(`User Name: ${currentUser.name} User Id : ${currentUser.id}`);
  console.log(`Feed Name: ${feed.name} User Id : ${feed.user_id} Feed URL : ${feed.url}`);
}
