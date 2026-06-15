const DEFAULT_API_BASE_URL =
  "https://us-central1-sedifex-web.cloudfunctions.net";
const DEFAULT_CONTRACT_VERSION = "2026-04-13";
const HOMEPAGE_PLACEMENT = "home_hero";
const SLIDE_LIMIT = 10;

export type HeroSlide = {
  id: string;
  storeId?: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  accent: string;
  textColor: "light" | "dark";
  overlayStyle: "gradient" | "solid" | "light" | "none";
  layout: "left_text" | "center_text" | "right_text";
  priority?: number;
  updatedAt?: string;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function safeHttpUrl(value: unknown): string | undefined {
  const raw = optionalString(value);
  if (!raw) return undefined;

  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

function safeHref(value: unknown): string | undefined {
  const raw = optionalString(value);
  if (!raw) return undefined;

  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  if (raw.startsWith("mailto:") || raw.startsWith("tel:")) return raw;
  return safeHttpUrl(raw);
}

function safeAccent(value: unknown): string {
  const raw = optionalString(value);
  return raw && /^(?:#[0-9a-f]{3}|#[0-9a-f]{4}|#[0-9a-f]{6}|#[0-9a-f]{8})$/i.test(raw)
    ? raw
    : "#fbbf24";
}

function normalizeSlide(value: unknown): HeroSlide | null {
  if (!isRecord(value)) return null;

  const id = optionalString(value.id);
  const title = optionalString(value.title);
  const imageUrl = safeHttpUrl(value.imageUrl);

  if (!id || (!title && !imageUrl)) return null;

  const textColor = value.textColor === "dark" ? "dark" : "light";
  const overlayStyle =
    value.overlayStyle === "solid" ||
    value.overlayStyle === "light" ||
    value.overlayStyle === "none"
      ? value.overlayStyle
      : "gradient";
  const layout =
    value.layout === "center_text" || value.layout === "right_text"
      ? value.layout
      : "left_text";

  return {
    id,
    storeId: optionalString(value.storeId),
    title: title ?? "Featured update",
    eyebrow: optionalString(value.eyebrow),
    subtitle: optionalString(value.subtitle),
    ctaLabel: optionalString(value.ctaLabel),
    ctaHref: safeHref(value.ctaHref),
    secondaryCtaLabel: optionalString(value.secondaryCtaLabel),
    secondaryCtaHref: safeHref(value.secondaryCtaHref),
    imageUrl,
    mobileImageUrl: safeHttpUrl(value.mobileImageUrl),
    accent: safeAccent(value.accent),
    textColor,
    overlayStyle,
    layout,
    priority:
      typeof value.priority === "number" && Number.isFinite(value.priority)
        ? value.priority
        : undefined,
    updatedAt: optionalString(value.updatedAt),
  };
}

export async function getHomepageHeroSlides(): Promise<HeroSlide[]> {
  const storeId = process.env.SEDIFEX_STORE_ID?.trim();
  const apiKey = process.env.SEDIFEX_WEBSITE_INTEGRATION_KEY?.trim();

  // Missing configuration intentionally keeps the existing local homepage hero.
  if (!storeId || !apiKey) return [];

  const baseUrl = (
    process.env.SEDIFEX_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
  const contractVersion =
    process.env.SEDIFEX_CONTRACT_VERSION?.trim() || DEFAULT_CONTRACT_VERSION;

  const url = new URL(`${baseUrl}/v1IntegrationHeroSlides`);
  url.searchParams.set("storeId", storeId);
  url.searchParams.set("placement", HOMEPAGE_PLACEMENT);
  url.searchParams.set("limit", String(SLIDE_LIMIT));

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${apiKey}`,
        "X-Sedifex-Contract-Version": contractVersion,
        Accept: "application/json",
      },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4500),
    });

    if (!response.ok) {
      console.error(
        `Sedifex homepage hero request failed with status ${response.status}.`,
      );
      return [];
    }

    const payload: unknown = await response.json();
    if (
      !isRecord(payload) ||
      payload.ok !== true ||
      !Array.isArray(payload.slides)
    ) {
      console.error(
        "Sedifex homepage hero returned an unexpected response shape.",
      );
      return [];
    }

    return payload.slides
      .map(normalizeSlide)
      .filter((slide): slide is HeroSlide => slide !== null);
  } catch (error) {
    console.error("Unable to load Sedifex homepage hero slides.", error);
    return [];
  }
}
