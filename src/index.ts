import os from "os";
import { readConfig, setUser } from "./config";
import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { argv, exit } from "node:process";
import { argon2Sync } from "node:crypto";
import { createUser, getUserById } from "./lib/db/queries/user";
import { handlerLogin } from "./loginHandler";
import { handlerRegister } from "./registerHandler";
import { handlerReset } from "./resetHandler";
import { handlerUsers } from "./usersHandler";
import { handlerAgg } from "./aggHandler";
import { handlerAddFeed } from "./addFeedHandler";

async function main() {
  // setUser("omar");
  // console.log(readConfig());

  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", handlerAddFeed);

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
