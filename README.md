# Personal Portfolio & Blog

A modern, lightning-fast static personal portfolio and blog built with [Astro](https://astro.build/), React, and Tailwind CSS. Features a minimal cyberpunk aesthetic and generates a 100% static site (SSG) that can be hosted anywhere.

## Features

- **Modern Stack**: Built with Astro 6.0, React 19, TypeScript, and Tailwind CSS 3.
- **Minimal Cyberpunk Design**: Clean layouts, high-contrast themes, and specialized typography.
- **Static Site Generation (SSG)**: Zero backend dependencies. Compiles to pure HTML, CSS, and JS for maximum performance and security.
- **Static Blog System**:
  - Markdown-based posts handled safely by Astro Content Collections.
  - Automatic paginated routing (`/page/2`).
  - Pre-rendered tag pages (`/tag/astro/1`).
- **Instant Client-Side Search**: Full-text search indexing powered by **[Pagefind](https://pagefind.app/)**. Indexes statically during the post-build step without requiring any server APIs.
- **Smooth Navigation**: Utilizes Astro's native `ClientRouter` (ViewTransitions) for seamless SPA-like page transitions.
- **Perfect Theme Persistance**: Vanilla DOM-based Dark/Light toggler preventing FOUC (Flash of Unstyled Content).
- **SEO & Accessibility**: Fully optimized semantic HTML, responsive components via Radix/Shadcn, Sitemap, and RSS/Atom feeds.
- **Universal Hosting**: Ready to jump on any cheap static host like Hostinger, GitHub Pages, Vercel, or Netlify.

## Project Structure

```text
portfolio/
├── src/
│   ├── components/          # Reusable Astro and interactive React components
│   │   ├── about/           # About page modules
│   │   ├── blog/            # Blog components (Sidebar, SearchBar, TagsCloud)
│   │   ├── layout/          # Layout components (ThemeToggle, Navigation)
│   │   └── ui/              # UI primitives (buttons, badges)
│   ├── content/
│   │   └── blog/            # Blog posts in .md format with frontmatter
│   ├── data/                # Static JSON data (experience, skills, projects)
│   ├── layouts/             # Main global layout wrapper (Layout.astro)
│   ├── pages/               # Astro routes (index, about, post/[slug], tag/[tag])
│   ├── styles/              # Global CSS, cyberpunk theme variables, fonts
│   └── utils/               # Utility functions (dates, formats, markdown helpers)
├── public/                  # Raw static assets (favicons, images)
└── (configuration files)    # astro.config.mjs, tailwind.config.js, package.json
```

## Getting Started

### Prerequisites

- Node.js 22+
- `pnpm` 8.x or later (recommended), `npm`, or `yarn`

### Installation

1. Clone the repository and navigate into it:

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:4321](http://localhost:4321) to see the site running locally.

### Production Build & Search Indexing

To see the final site (and to enable Pagefind search functionality which strictly requires a production bundle):

```bash
# Compiles the static site into dist/ and then runs pagefind to index it
pnpm build

# Boot a local server to preview the fully compiled site (Search will work here!)
pnpm preview
```

## Content Management

### Adding a Blog Post

Create a new Markdown (`.md`) file inside the `src/content/blog/` directory:

```yaml
---
title: 'My First Post'
description: 'A brief description of the topic.'
pubDate: 2024-10-24
tags: ['astro', 'typescript', 'cyberpunk']
draft: false
---
Insert your markdown content here...
```

### Editing Static Data

Easily modify your CV and project displays by editing the JSON files located inside `src/data/`:

- `projects.json`
- `experience.json`
- `skills.json`

## Deployment

Since this project outputs pure static files (`output: 'static'` inside `astro.config.mjs`), deployment is extremely easy.

- **Static Hosts**: You can upload the contents of the `dist/` folder via FTP to Hostinger, cPanel, or AWS S3.
- **Modern Edge Hosts**: When using Vercel, Netlify, or Cloudflare Pages, simply point the build command to `pnpm build` and the output directory to `dist/`.

No serverless functions or databases need to be architected.

## License

MIT
