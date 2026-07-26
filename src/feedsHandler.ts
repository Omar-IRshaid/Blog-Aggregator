import { readConfig } from "./config";
import { getFeeds } from "./lib/db/queries/feed";
import { getUsers } from "./lib/db/queries/user";

// export async function handlerUsers(cmdName: string, ...args: string[]) {
//   const result = await getUsers();
//   const config = readConfig();
//   const currentUserName = config.currentUserName;

//   result.forEach((user) => {
//     if (user.name === currentUserName) console.log(`* ${user.name} (current)`);
//     else console.log(`* ${user.name}`);
//   });
// }

export async function handlerFeeds(cmdName: string, ...args: string[]) {
  const result = await getFeeds();
  result.forEach((entry) => {
    console.log(`The name of the Feed: ${entry.feeds.name}\nThe Url of the Feed: ${entry.feeds.url}\nThe name of the User: ${entry.users.name}\n\n`);
  });
}
