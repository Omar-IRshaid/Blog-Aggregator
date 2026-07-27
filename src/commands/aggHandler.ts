import { getNextFeedToFetch, markFeedFetched } from "src/lib/db/queries/feed";
import { fetchFeed } from "../lib/rss";
import { Feed } from "src/lib/db/schema";
import { createPost } from "src/lib/db/queries/post";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length < 1) {
    throw new Error("please provide more information!!");
  }

  const time_between_reqs = args[0];
  const parsed = parseDuration(time_between_reqs);
  if (!parsed) {
    throw new Error("Invalid duration!!");
  }

  console.log(`Collecting feeds every ${time_between_reqs}`);

  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, parsed);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });

  // const result = await fetchFeed("https://www.wagslane.dev/index.xml");
  // const res = JSON.stringify(result);
  // console.log(res);
}

export async function scrapeFeeds() {
  const nextFeed: Feed = await getNextFeedToFetch();
  if (!nextFeed) {
    throw new Error("No feed to fetch!!");
  }
  console.log(`Found a feed to fetch!`);
  const result = await fetchFeed(nextFeed.url);

  await markFeedFetched(nextFeed.id);

  result.channel.item.forEach(async (item) => {
    console.log(item.title);
    // console.log(item.pubDate);
    await createPost(item.title, item.link, item.description, new Date(item.pubDate), nextFeed.id);
  });
}

export function parseDuration(durationStr: string) {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  if (!match) return;
  if (match.length < 3) return;

  const value = Number(match[1]);
  const unit = match[2];

  switch (unit) {
    case "ms":
      return value;
    case "s":
      return value * 1000;
    case "m":
      return value * 1000 * 60;
    case "h":
      return value * 1000 * 60 * 60;
  }
}

function handleError(err: any) {
  console.log("Something went wrong fetching feeds!!");
}
