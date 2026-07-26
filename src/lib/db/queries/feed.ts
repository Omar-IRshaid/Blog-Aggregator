import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";
import { UUID } from "node:crypto";

export async function createFeed(name: string, url: string, user_id: string) {
  const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: user_id }).returning();
  return result;
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
