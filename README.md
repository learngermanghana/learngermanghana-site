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

## AI LinkedIn auto-post for class updates

This repo includes a GitHub Actions workflow that can automatically publish a LinkedIn post when class data changes in:

- `src/data/content.ts`
- `src/data/classesCatalog.ts`
- `src/lib/classes.ts`

Workflow file: `.github/workflows/linkedin-class-updates.yml`

### Required GitHub secrets

- `OPENAI_API_KEY`
- `LINKEDIN_ACCESS_TOKEN`
- `LINKEDIN_AUTHOR_URN` (for example `urn:li:person:xxxx` or `urn:li:organization:xxxx`)

Save these in **GitHub Actions secrets** (not Codespaces / not Dependabot) when using the workflow in `.github/workflows/linkedin-class-updates.yml`.

Quick path: **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**.

If needed, you can scope them as environment secrets instead (for example `production`) and reference that environment from the workflow.

### Optional configuration

### LinkedIn OAuth redirect URL

A callback page is available at:

- `https://learngermanghana.com/auth/linkedin/callback`
- `http://localhost:3000/auth/linkedin/callback` (for local testing)

Use one or both in your LinkedIn app's authorized redirect URLs, matching exactly.

- Secret: `OPENAI_MODEL` (default: `gpt-4o-mini`)
- Repository variable: `SITE_URL` (default: `https://learngermanghana.com`)
- Repository variable: `REGISTER_URL` (default: `https://falowen.com`)

The agent reads the git diff for class-related files, uses OpenAI to draft one LinkedIn-ready post, then publishes it using LinkedIn's UGC Posts API.

## AI Instagram auto-post for class updates

This repo also includes an Instagram workflow for the same class-data changes.

Workflow file: `.github/workflows/instagram-class-updates.yml`

### Required GitHub secrets (Actions)

- `OPENAI_API_KEY`
- `INSTAGRAM_ACCESS_TOKEN` (Meta Graph API token with Instagram publish permissions)
- `INSTAGRAM_IG_USER_ID` (Instagram Business account ID)

### Required GitHub variables

- `INSTAGRAM_IMAGE_URL` (public image URL used for feed post media)

### Optional configuration

- Secret: `OPENAI_MODEL` (default: `gpt-4o-mini`)
- Repository variable: `SITE_URL` (default: `https://learngermanghana.com`)
- Repository variable: `REGISTER_URL` (default: `https://falowen.com`)

The Instagram agent reads the same class-file diff, generates a caption with OpenAI, creates an Instagram media container, then publishes it.

## Deployment

Deploy using the standard Next.js build commands (for example on Vercel or another Node hosting provider).
