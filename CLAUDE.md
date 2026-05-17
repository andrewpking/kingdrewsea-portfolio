# Claude Session Log

A record of changes made in this session, the problems they solved, and the decisions behind them.

---

## generateMetadata Refactor

**Problem:** The project used a custom `PageMetadata` interface (`Metadata.ts`) that was structurally separate from Next.js's `Metadata` type. Each project page cast its data directly onto `export const metadata: Metadata = projects.xxx`, which worked but was fragile (extra custom fields silently passed through, no OpenGraph/Twitter metadata was properly generated). There was also no metadata on the home page at all.

**Fix:** Replaced the custom type and `export const metadata` pattern with Next.js's `generateMetadata` function standard throughout the project.

### What changed

**Deleted:**
- `src/app/components/Metadata.ts` — the custom `PageMetadata` interface is gone entirely.

**`src/app/components/pages.ts` — core rewrite:**
- `PageMetadata` renamed to `ProjectData` (same UI fields: `title`, `description`, `image`, `imageAlt`, `href`, `date`, `authors`). The `openGraph` block was removed from individual data entries — it is now generated centrally.
- The old `pages` record (used only for nav) was replaced with a leaner `navLinks` array (`{ href, title }[]`).
- Added `generateProjectMetadata(data: ProjectData): Metadata` — the single source of truth that maps project data into a properly-typed Next.js `Metadata` object, including `authors`, `openGraph`, and `twitter` fields.

**All `page.tsx` files — `export const metadata` → `generateMetadata`:**

| File | Change |
| --- | --- |
| `projects/win11-rufus/page.tsx` | `generateMetadata()` calls `generateProjectMetadata(projects.win11)` |
| `projects/kbcs/page.tsx` | Same pattern |
| `projects/mindmii/page.tsx` | Same pattern |
| `projects/resitogether/page.tsx` | Same pattern |
| `projects/sl-screens/page.tsx` | Same pattern |
| `projects/high-speed-rail/page.tsx` | Same pattern |
| `projects/page.tsx` | `generateMetadata()` with full `openGraph` + `twitter` blocks added |
| `about/page.tsx` | Same, with previously-missing `openGraph` + `twitter` blocks added |
| `page.tsx` (home) | Added `generateMetadata()` — previously had **no metadata at all** |

`layout.tsx` intentionally keeps `export const metadata` — root layouts use it to set `metadataBase`, which Next.js uses to resolve relative image URLs in all child pages.

**Components — imports updated:**
- `Header.tsx`: now imports `navLinks` from `pages.ts` instead of `pages` + `PageMetadata` from `Metadata.ts`.
- `Project.tsx`, `PreviewCard.tsx`, `PageHeading.tsx`: now import `ProjectData` from `pages.ts` instead of `PageMetadata` from the deleted `Metadata.ts`.

---

## styles.scss — `<main>` Selector Update

**Problem:** `styles.scss` was written assuming `<main class="project-page">` — i.e., the `.project-page` class was directly on the `<main>` element. After the previous session's semantic HTML refactor (which hoisted `<main id="main-content">` to the root layout), the actual DOM structure became:

```src/app/layout.tsx#L37-37
<main id="main-content">{children}</main>
```

```src/app/projects/win11-rufus/page.tsx#L9-9
<div className="project-page row-start-2 flex flex-col justify-center">
```

So `.project-page` is now a child `<div>` inside `<main>`, not on `<main>` itself. The old `main.project-page` compound selectors no longer matched anything.

**Fix:** Updated every stale selector in both the light and dark mode blocks.

| Old selector | New selector |
| --- | --- |
| `main, main.project-page { … }` | `main#main-content { … }` |
| `main.project-page nav#toc ul li` | `.project-page nav#toc ul li` |
| `main.project-page p` | `.project-page p` |
| `main.project-page img` | `.project-page img` |
| `main.project-page a, main a` | `.project-page a, main a` |
| `main.project-page ul` | `.project-page ul` |
| `main.project-page ul li, main.project-page ol li` | `.project-page ul li, .project-page ol li` |

Dark mode (`@media (prefers-color-scheme: dark)`) received the same selector corrections.

---

## MDX Heading ID Syntax

**Problem:** `/projects/win11-rufus` was 500ing on every request with an acorn parse error at line 8.

**Root cause:** MDX v2+ reserves `{}` for JavaScript expressions. The `{#id}` custom heading ID syntax (e.g. `## Table of Contents {#table-of-contents}`) was being parsed as a JS expression at the tokenizer level — before any remark plugins could run.

**Fix:** Converted all 29 headings in `win11-rufus/Content.mdx` from markdown syntax to inline JSX with explicit `id` attributes:

```src/app/projects/win11-rufus/Content.mdx#L1-1
<h2 id="table-of-contents">Table of Contents</h2>
```

---

## Table of Contents Refactor

The `<nav id="toc">` block was also using markdown link syntax inside an HTML element, which MDX does not process. Converted in three stages:

1. Replaced markdown links `[Text](#href)` with plain `<a href="#href">Text</a>` tags
2. Wrapped all links in `<ul>`/`<li>` structure
3. Nested sub-section links into child `<ul>` elements grouped by parent section

---

## remark-gfm

**Problem:** Pipe-style markdown tables were not rendering.

**Fix:** Installed `remark-gfm` and registered it in `next.config.ts`:

```next.config.ts#L1-5
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});
```

**Note:** `remark-gfm` and other function-based plugins are not JSON-serializable, which is incompatible with Turbopack's loader option requirements. This led to switching bundlers (see below).

---

## Turbopack → Webpack

**Problem:** Turbopack requires all webpack loader options to be JSON-serializable. Function-based remark/rehype plugins are not, causing:

```
Error: loader does not have serializable options.
```

**In Next.js 15:** removed `--turbopack` from the dev script.
**In Next.js 16:** Turbopack became the default. The correct flag to opt out is `--webpack`:

```package.json#L1-1
"dev": "next dev --webpack",
"build": "next build --webpack"
```

**Note:** Switching to webpack has no effect on SSR — that is a runtime feature of the framework, not the bundler. All rendering modes (SSR, SSG, ISR) remain fully supported.

---

## rehype-prism-plus

Installed `rehype-prism-plus` (preferred over base `rehype-prism` for line number and line highlight support) and registered it as a rehype plugin.

`rehype-prism-plus` uses `refractor` internally — a server-side port of PrismJS — so all syntax highlighting happens at build time. Zero PrismJS JS ships to the browser.

`prismjs` itself is installed only for its CSS theme files:

```src/app/layout.tsx#L1-1
import "prismjs/themes/prism-tomorrow.css";
```

---

## Next.js 16 Upgrade

Upgraded from Next.js 15.2.4 to 16.2.6. Required bumping all `@next/*` packages to matching major versions:

- `@next/mdx`: `^15.1.0` → `^15.3.0` (no stable v16 release exists)
- `@next/third-parties`: `^15.2.4` → `^16.0.0`
- `eslint-config-next`: `15.2.4` → `^16.0.0`

---

## metadata + "use client" Conflict

**Problem:** After upgrading to Next.js 16, all MDX project pages threw:

```
You are attempting to export "metadata" from a component marked with "use client"
```

**Root cause:** In Next.js 16, the MDX compilation pipeline produces output that the SWC compiler flags as a client component, making `export const metadata` invalid in the same file.

**Investigation ruled out:**
- `pages.ts` — plain data, no client code
- `PageHeading.tsx` — clean server component
- `mdx-components.tsx` — no `"use client"` directive
- `@next/mdx` loader — does not add `"use client"` to output
- `@mdx-js/react` — no `"use client"` directive

**Fix (per Next.js docs):** Separate metadata from MDX content entirely. For each project:

1. Renamed `page.mdx` → `Content.mdx` (demoted to a plain component, not a route)
2. Created `page.tsx` as a clean Server Component that owns the `metadata` export and renders `<Content />`
3. Removed `export const metadata` from all MDX files
4. Replaced `<PageHeading metadata={metadata} />` with direct `<PageHeading metadata={projects.xxx} />`

```src/app/projects/win11-rufus/page.tsx#L1-9
import type { Metadata } from "next";
import { projects } from "../../components/pages";
import Content from "./Content.mdx";

export const metadata: Metadata = projects.win11;

export default function Page() {
  return (
    <div className="project-page row-start-2 flex flex-col justify-center">
      <Content />
    </div>
  );
}
```

This pattern was applied to all 6 project routes: `win11-rufus`, `kbcs`, `mindmii`, `resitogether`, `sl-screens`, `high-speed-rail`.

---

## Semantic HTML Refactor — `<main>` Hoisted to Root Layout

**Problem:** `<main>` was being added per-page and per-component inconsistently:
- `MdxPage.tsx` wrapped MDX content in `<main>`
- `projects/page.tsx`, `about/page.tsx`, and `page.tsx` each had their own `<main>`

**Fix:** Hoisted a single `<main id="main-content">` into `src/app/layout.tsx` as the authoritative semantic landmark for the whole site. All per-page `<main>` elements were replaced:

| File | Before | After |
| --- | --- | --- |
| `layout.tsx` | `{children}` | `<main id="main-content">{children}</main>` |
| `page.tsx` (home) | `<main className="...">` | `<div className="...">` |
| `about/page.tsx` | `<main className="...">` | `<div className="...">` |
| `projects/page.tsx` | `<main>` | `<>` (fragment) |
| `MdxPage.tsx` | `<main id="main-content" className="...">` | `<div className="...">` |

---

## MdxPage.tsx Removed

`MdxPage.tsx` was originally used as a wrapper in `mdx-components.tsx` to inject `<main>` and project-page styles around all MDX content. After:

- The `wrapper` was removed from `mdx-components.tsx` (it was causing the client component conflict)
- `<main>` was hoisted to the root layout

...`MdxPage` became redundant. Its Tailwind classes (`project-page row-start-2 flex flex-col justify-center`) were moved directly onto the wrapper `<div>` in each project's `page.tsx`. The file was deleted.

---

## Files Changed Summary

| File | Change |
| --- | --- |
| `src/app/projects/win11-rufus/page.mdx` | Renamed to `Content.mdx` |
| `src/app/projects/win11-rufus/Content.mdx` | Removed metadata export; converted headings to JSX; converted nav to `<ul>`/`<li>`/`<a>` |
| `src/app/projects/win11-rufus/page.tsx` | Created — Server Component with metadata + renders `<Content />` |
| `src/app/projects/kbcs/page.mdx` | Renamed to `Content.mdx`; removed metadata export |
| `src/app/projects/kbcs/page.tsx` | Created |
| `src/app/projects/mindmii/page.mdx` | Renamed to `Content.mdx`; removed metadata export |
| `src/app/projects/mindmii/page.tsx` | Created |
| `src/app/projects/resitogether/page.mdx` | Renamed to `Content.mdx`; removed metadata export |
| `src/app/projects/resitogether/page.tsx` | Created |
| `src/app/projects/sl-screens/page.mdx` | Renamed to `Content.mdx`; removed metadata export |
| `src/app/projects/sl-screens/page.tsx` | Created |
| `src/app/projects/high-speed-rail/page.mdx` | Renamed to `Content.mdx`; removed metadata export |
| `src/app/projects/high-speed-rail/page.tsx` | Created |
| `src/app/components/MdxPage.tsx` | Deleted |
| `src/mdx-components.tsx` | Removed `wrapper`, `dynamic`, `revalidate`, and `MdxPage` import |
| `src/app/layout.tsx` | Added `<main id="main-content">` wrapper; added Prism CSS import |
| `src/app/page.tsx` | Replaced `<main>` with `<div>`; removed outer `<div>` wrapper |
| `src/app/about/page.tsx` | Replaced `<main>` with `<div>` |
| `src/app/projects/page.tsx` | Replaced `<main>` with fragment |
| `next.config.ts` | Added `remarkGfm` and `rehypePrism` plugins |
| `package.json` | Upgraded Next.js to 16; bumped `@next/*` packages; added `remark-gfm`, `rehype-prism-plus`, `prismjs`; switched dev/build scripts to `--webpack` |
