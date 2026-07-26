import os from "os";
import { readConfig, setUser } from "./config";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/commands";
import { argv, exit } from "node:process";
import { argon2Sync } from "node:crypto";
import { createUser, getUserById } from "./lib/db/queries/user";
import { handlerLogin } from "./commands/loginHandler";
import { handlerRegister } from "./commands/registerHandler";
import { handlerReset } from "./commands/resetHandler";
import { handlerUsers } from "./commands/usersHandler";
import { handlerAgg } from "./commands/aggHandler";
import { handlerAddFeed } from "./commands/addFeedHandler";
import { handlerFeeds } from "./commands/feedsHandler";
import { handlerFollow } from "./commands/followHandler";
import { handlerFollowing } from "./commands/followingHandler";
import { middlewareLoggedIn } from "./middleware/middlewareLoggedIn";

async function main() {
  // setUser("omar");
  // console.log(readConfig());

  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));

  const args = argv.slice(2);

  // await createUser("omar");
  // console.log(await getUserById("omar"));
  if (args.length < 1) {
    console.log("Please Provide The Name of the Command!!");
    exit(1);
  }

  await runCommand(registry, args[0], ...args.slice(1));
  process.exit(0);
}

await main();

// print process.argv
