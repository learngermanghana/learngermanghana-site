This repository hosts the Learn Language Education Academy marketing site (German + French programs in Ghana).

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content updates

### Classes, fees, and schedules
* Edit class offerings, schedules, and fees in `src/data/content.ts`.
  * `upcomingClasses` drives the homepage "Next start date" and class cards.
  * `tuitionFeesGHS` and `goetheExamFeesGHS` power the tuition section.

### Site copy and metadata
* Update global SEO metadata (title/description/keywords) in `src/app/layout.tsx`.
* Update homepage hero copy and CTAs in `src/app/page.tsx`.

### Navigation + global links
* Update the main navigation links in `src/components/Navbar.tsx`.
* Update external links (Falowen, WhatsApp, register portal) in `src/lib/site.ts`.

## Chat widget setup (cheap bot option)

Add any hosted chat widget script (for example, Tawk.to, Crisp, Intercom) by setting the environment variable below:

```bash
NEXT_PUBLIC_CHAT_WIDGET_SRC="https://embed.tawk.to/your-property-id/your-widget-id"
```

The script is injected globally via the RootLayout (`src/app/layout.tsx`). Remove the environment variable to disable the widget.

## Deployment

Deploy using the standard Next.js build commands (for example on Vercel or another Node hosting provider).
