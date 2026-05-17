import type { Metadata } from "next";

/**
 * UI-specific data for project cards, preview components, and page headings.
 *
 * These fields are for display in React components. Next.js Metadata objects
 * are generated from this data via generateProjectMetadata().
 */
export interface ProjectData {
  title: string;
  description: string;
  /** Cover / hero image URL — also used as the OpenGraph image. */
  image: string;
  imageAlt: string;
  /** Canonical route URL (e.g. "/projects/win11-rufus"). */
  href: string;
  /** ISO 8601 date string for display (e.g. "2026-05-17"). */
  date: string;
  /** Comma-separated author names for display. */
  authors: string;
}

const SITE_NAME = "Drew King - Portfolio";

/**
 * Converts a ProjectData record into a Next.js Metadata object.
 *
 * Use this inside generateMetadata() in each project page:
 * ```ts
 * export async function generateMetadata(): Promise<Metadata> {
 *   return generateProjectMetadata(projects.win11);
 * }
 * ```
 */
export function generateProjectMetadata(data: ProjectData): Metadata {
  return {
    title: `${data.title} - Drew King`,
    description: data.description,
    authors: data.authors.split(", ").map((name) => ({ name })),
    openGraph: {
      type: "article",
      title: data.title,
      description: data.description,
      locale: "en_US",
      siteName: SITE_NAME,
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: data.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image],
    },
  };
}

/**
 * Navigation links for the site header.
 */
export const navLinks = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
  { href: "/projects", title: "Projects" },
  { href: "/Drew_King-CV.pdf", title: "CV" },
];

/**
 * Project card data for all portfolio projects.
 * Used by PreviewCard, Project, and PageHeading components.
 */
export const projects: Record<string, ProjectData> = {
  win11: {
    title: "Install Windows 11 on almost anything",
    description:
      "A tutorial covering clean installation of Windows 11 using Rufus, including prep, driver backup, and Intel Mac hardware support.",
    image: "/images/mba-win11.jpg",
    imageAlt:
      "A screenshot of a 2013 MacBook Air, running Windows 11 with a light color scheme and a boat dock background.",
    href: "/projects/win11-rufus",
    date: "2026-05-17",
    authors: "Drew King, Claude",
  },
  HighSpeedRail: {
    title: "High Speed Rail",
    description: "Visualization reimagining the future of travel",
    image: "/images/high-speed-rail-cover.png",
    imageAlt:
      "A screenshot of the High Speed Rail project, showing a map of the United States with a train route drawn on it.",
    href: "/projects/high-speed-rail",
    date: "2024-12-15",
    authors: "Drew King, Joey Krueger, Jack Rosenbloom",
  },
  kbcs: {
    title: "KBCS Theme",
    description: "WordPress theme update following accessibility principles",
    image: "/images/KBCS_Menu-Bar_Flow.png",
    imageAlt:
      'Three screenshots stitched together of the KBCS website with voiceover output at the bottom. All three screenshots show a similar appearing website with a brown menu bar on top with three elements: a hamburger menu button, the KBCS logo outlined in white which reads "91.3 KBCS", and a listen icon. Below is a now-playing widget on a grey background that says "Roots Rock and Soul with Iaan Hughes" and a banner below for the show which has an orange background and red highly stylized text on top of a record player.',
    href: "/projects/kbcs",
    date: "2024-12-15",
    authors: "Drew King, Sama Khalid, Colin Xiao, Sophia Lin",
  },
  MindMii: {
    title: "MindMii",
    description: "Talk calmly, when you're ready.",
    image: "/images/mindmii/MindMii_Cover.png",
    imageAlt:
      "A banner created in Figma of MindMii screens on a phone, with 8 pages oriented in an eight by two grid and skewed to the right.",
    href: "/projects/mindmii",
    date: "2024-03-07",
    authors: "Drew King, Lee Janzen, Christoph Bendix",
  },
  ResiTogether: {
    title: "ResiTogether",
    description:
      "App prototype to improve employment among formerly incarcerated persons",
    image: "/images/resitogether/ResiTogether_cover.png",
    imageAlt:
      "Screenshots of ResiTogether final design with the logo and job search pages displayed on a phone in a grid layout that is intentionally styled off-center for each column of the grid.",
    href: "/projects/resitogether",
    date: "2023-06-05",
    authors:
      "Drew King, Weather Nguyen, Taylor Richmond, Julie McUne, Jessica Wang",
  },
  SLScreens: {
    title: "SL Screens",
    description: "Investigating the use of screens in Super Learner ensembles",
    image: "/images/lasso_vs_sl.png",
    imageAlt: "A chart comparing the performance of SL with screens and Lasso",
    href: "/projects/sl-screens",
    date: "2021-08-08",
    authors: "Drew King, Brian D Williamson, Ying Huang",
  },
};
