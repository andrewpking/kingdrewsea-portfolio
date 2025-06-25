interface OpenGraphMetadata {
  type: "website" | "article" | "profile";
  locale?: string;
  siteName?: string;
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt: string;
  }[];
}

export default interface PageMetadata {
  // Basic metadata
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  date: string;
  authors: string;
  openGraph?: OpenGraphMetadata;
}
