import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
  const resObj = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
    },
  });

  if (!resObj.ok) {
    throw new Error("Coudnt fetch the RSSFeed!!");
  }

  const result = await resObj.text();
  const parser = new XMLParser({ processEntities: false });
  const parsed = parser.parse(result);

  // console.log(parsed);

  const channel = parsed.rss.channel;

  if (!channel) {
    throw new Error("channel field is missing!!");
  }

  if (!channel.title || !channel.link || !channel.description) {
    throw new Error("Some of These Fields is missing: title , link or description!!");
  }

  const title = channel.title;
  const link = channel.link;
  const description = channel.description;

  let items: any[] = [];
  if ("item" in channel) {
    if (Array.isArray(channel.item)) items = channel.item;
    else items.push(channel.item);
  }

  let Final: RSSFeed = {
    channel: {
      title: title,
      link: link,
      description: description,
      item: [],
    },
  };
  items.forEach((item) => {
    if (item.title && item.link && item.description && item.pubDate) {
      const itemm: RSSItem = { title: item.title, link: item.link, description: item.description, pubDate: item.pubDate };
      Final.channel.item.push(itemm);
    }
  });

  return Final;
}

export async function createFeed() {}
