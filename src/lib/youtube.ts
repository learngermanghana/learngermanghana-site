export type YouTubeLesson = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string | null;
};

const CHANNEL_HANDLE_URL = "https://www.youtube.com/@LLEAGhana/videos";
const CHANNEL_FEED_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getTag(block: string, tag: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(
    new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`),
  );

  return match ? decodeXml(match[1].trim()) : "";
}

function resolveChannelId(html: string) {
  const patterns = [
    /"channelId":"(UC[\w-]+)"/,
    /"externalId":"(UC[\w-]+)"/,
    /<meta\s+itemprop="channelId"\s+content="(UC[^"]+)"/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export async function getLatestYouTubeLessons(limit = 6): Promise<YouTubeLesson[]> {
  try {
    const channelResponse = await fetch(CHANNEL_HANDLE_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; LearnLanguageEducationAcademy/1.0; +https://www.learngermanghana.com)",
      },
      next: { revalidate: 60 * 60 },
    });

    if (!channelResponse.ok) return [];

    const channelHtml = await channelResponse.text();
    const channelId = resolveChannelId(channelHtml);

    if (!channelId) return [];

    const feedResponse = await fetch(`${CHANNEL_FEED_URL}${channelId}`, {
      next: { revalidate: 30 * 60 },
    });

    if (!feedResponse.ok) return [];

    const feedXml = await feedResponse.text();
    const entries = Array.from(feedXml.matchAll(/<entry>([\s\S]*?)<\/entry>/g))
      .map((entry) => entry[1] ?? "")
      .filter(Boolean)
      .slice(0, limit);

    return entries
      .map((entry) => {
        const id = getTag(entry, "yt:videoId");
        const title = getTag(entry, "title");
        const publishedAt = getTag(entry, "published") || null;

        if (!id || !title) return null;

        return {
          id,
          title,
          url: `https://www.youtube.com/watch?v=${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          publishedAt,
        };
      })
      .filter((lesson): lesson is YouTubeLesson => lesson !== null);
  } catch {
    return [];
  }
}
