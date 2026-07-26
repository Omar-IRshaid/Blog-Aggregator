import { fetchFeed } from "./lib/rss";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  const result = await fetchFeed("https://www.wagslane.dev/index.xml");
  const res = JSON.stringify(result);
  console.log(res);
}
