import { getPostsForUser } from "src/lib/db/queries/post";
import { User } from "src/lib/db/schema";

export async function handlerBrowse(cmdName: string, currentUser: User, ...args: string[]) {
  const limit: number = args.length > 0 ? parseInt(args[0]) : 2;

  const posts = await getPostsForUser(currentUser.id, limit);
  posts.forEach((post) => {
    console.log(post.posts.title);
  });
}
