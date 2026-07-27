import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";
import { UUID } from "node:crypto";

export async function createFeed(name: string, url: string, user_id: string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: user_id }).returning();
  return result;
}

export async function getFeedByUrl(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));

  return result;
}

export async function markFeedFetched(feed_id: string) {
  await db.update(feeds).set({ updatedAt: new Date(), lastFetchedAt: new Date() }).where(eq(feeds.id, feed_id));
}

export async function getFeeds() {
  const result = await db.select().from(feeds).innerJoin(users, eq(users.id, feeds.user_id));
  return result;
}

export async function getNextFeedToFetch() {
  const [result] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`)
    .limit(1);
  return result;
}
