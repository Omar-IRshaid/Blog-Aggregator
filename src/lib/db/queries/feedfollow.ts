import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { and, eq } from "drizzle-orm";

export async function createFeedFollow(user_id: string, feed_id: string) {
  const [result] = await db.insert(feed_follows).values({ user_id, feed_id }).returning();
  const final = await db.select().from(feed_follows).innerJoin(users, eq(users.id, feed_follows.user_id)).innerJoin(feeds, eq(feeds.id, feed_follows.feed_id));
  return final;
}

export async function getFeedFollowsForUser(user_id: string) {
  const final = await db.select().from(feed_follows).innerJoin(users, eq(users.id, feed_follows.user_id)).innerJoin(feeds, eq(feeds.id, feed_follows.feed_id)).where(eq(feed_follows.user_id, user_id));
  return final;
}

export async function deleteFeedFollow(user_id: string, feed_id: string) {
  await db.delete(feed_follows).where(and(eq(feed_follows.user_id, user_id), eq(feed_follows.feed_id, feed_id)));
}
