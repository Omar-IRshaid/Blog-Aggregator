import { Feed, User } from "./lib/db/schema";

export function printFeed(feed: Feed, user: User) {
  console.log(`User Name: ${user.name} User Id : ${user.id}`);
  console.log(`Feed Name: ${feed.name} User Id : ${feed.user_id} Feed URL : ${feed.url}`);
}
