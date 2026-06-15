export type HeroSlide = {
  id: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  accent?: string;
  textColor?: "light" | "dark";
  overlayStyle?: "gradient" | "solid" | "none";
  layout?: "left_text" | "center_text" | "right_text";
};

const endpoint = "https://us-central1-sedifex-web.cloudfunctions.net/v1IntegrationHeroSlides";

export async function getSedifexHeroSlides(): Promise<HeroSlide[]> {
  const storeId = process.env.SEDIFEX_STORE_ID;
  const apiKey = process.env.SEDIFEX_WEBSITE_INTEGRATION_KEY;
  if (!storeId || !apiKey) return [];

  try {
    const url = new URL(endpoint);
    url.searchParams.set("storeId", storeId);
    url.searchParams.set("placement", "home_hero");
    url.searchParams.set("limit", "10");
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${apiKey}`,
        "X-Sedifex-Contract-Version": "2026-04-13",
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const data = (await response.json()) as { ok?: boolean; slides?: HeroSlide[] };
    return data.ok && Array.isArray(data.slides) ? data.slides.filter((slide) => slide.id && slide.title) : [];
  } catch {
    return [];
  }
}
