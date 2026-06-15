# Sedifex-managed homepage hero

The homepage can load its hero slides from Sedifex Website Builder through `v1IntegrationHeroSlides`.

## Deployment variables

Set these as server-side environment variables in the website hosting project:

```bash
SEDIFEX_STORE_ID="your_store_id"
SEDIFEX_WEBSITE_INTEGRATION_KEY="your_website_integration_key"
```

Optional overrides:

```bash
SEDIFEX_API_BASE_URL="https://us-central1-sedifex-web.cloudfunctions.net"
SEDIFEX_CONTRACT_VERSION="2026-04-13"
```

Do not prefix the integration key with `NEXT_PUBLIC_`; the browser must never receive it.

## Rendering behavior

- More than one active `home_hero` slide renders an accessible carousel.
- One active slide renders a static hero without carousel controls.
- No slides, missing configuration, invalid data, or an API error keeps the existing local homepage hero.
- Desktop and mobile images, primary/secondary CTAs, accent color, text color, overlay style, and text layout are read from Sedifex.
- Slide data is revalidated every 60 seconds.

Manage the content in Sedifex under **Website Builder → Hero**.
