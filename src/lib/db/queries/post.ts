import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { feed_follows, feeds, posts, users } from "../schema";
import { UUID } from "node:crypto";

export async function createPost(title: string, url: string, description: string, published_at: Date, feed_id: string) {
  const [result] = await db.insert(posts).values({ title, url, description, published_at, feed_id }).returning();
  return result;
}

export async function getPostsForUser(user_id: string, lim: number = 2) {
  const final = await db.select().from(posts).innerJoin(feed_follows, eq(feed_follows.feed_id, posts.feed_id)).where(eq(feed_follows.user_id, user_id)).orderBy(desc(posts.published_at)).limit(lim);
  return final;
}

// export async function getUserById(name: string) {
//   const [result] = await db.select().from(users).where(eq(users.name, name));

//   return result;
// }

// export async function resetUsersTable() {
//   await db.delete(users);
// }

// export async function getUsers() {
//   const result = await db.select().from(users);
//   return result;
// }
