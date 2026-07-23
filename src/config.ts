import fs, { fchmod } from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(userName: string) {
  //
  const config = readConfig();
  config.currentUserName = userName;
  writeConfig(config);
}
export function readConfig(): Config {
  //
  const data = fs.readFileSync(getConfigFilePath(), { encoding: "utf8" });
  const rawConfig = JSON.parse(data);

  return validateConfig(rawConfig);
}

function validateConfig(rawConfig: any): Config {
  //
  if ("db_url" in rawConfig && "current_user_name" in rawConfig) {
    return { dbUrl: rawConfig.db_url, currentUserName: rawConfig.current_user_name };
  }
  throw new TypeError("The Json File Is Not Config Type");
  // return "db_url" in rawConfig;
}

function writeConfig(cfg: Config): void {
  //
  const object = { db_url: cfg.dbUrl, current_user_name: cfg.currentUserName };

  fs.writeFileSync(getConfigFilePath(), JSON.stringify(object));
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}
