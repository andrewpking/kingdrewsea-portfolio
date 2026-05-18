import type { Metadata } from "next";
import PreviewCard from "./components/PreviewCard";
import { projects, type ProjectData } from "./components/pages";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Drew King - Portfolio",
    description:
      "Software engineer passionate about accessibility and inclusive design. UX Engineering portfolio by Drew King.",
    openGraph: {
      type: "website",
      title: "Drew King - Portfolio",
      description:
        "Software engineer passionate about accessibility and inclusive design.",
      locale: "en_US",
      siteName: "Drew King - Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: "Drew King - Portfolio",
      description:
        "Software engineer passionate about accessibility and inclusive design.",
    },
  };
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] sm:mt-4 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2 flex flex-col items-center justify-center gap-6">
        <h1 id="main-content" className="text-center">
          Drew King&apos;s Portfolio
        </h1>
        <Image
          src="/images/mindmii/Drew.png"
          alt="A photograph of Drew King, a white person with short brown hair, blue eyes, gazing out a window, their face is well lit and they have curtains and a photograph behind them."
          width={200}
          height={200}
          className="rounded-full"
        />
        <p className="text-center tiny:px-4 sm:px-16">
          I am a software engineer with a bachelor’s degree in Computer Science
          from the{" "}
          <a href="https://www.cs.washington.edu/">
            Paul G. Allen School at the University of Washington, Seattle
          </a>
          . I am passionate about designing software that is visually appealing,
          accessible to everyone, and optimized for search engine visibility.
        </p>
        <p className="text-center tiny:px-4 sm:px-16">
          I currently work as a web developer at{" "}
          <a href="https://www.kbcs.fm/">KBCS</a>, a community-focused radio
          station serving the greater Seattle area. I am excited to bring my
          skills to a full-time <b>UX Engineering</b> role to design and
          implement an impactful user experience.
        </p>
        <h2 className="text-center">Projects</h2>
        <p>
          Each of these projects were completed during my undergraduate
          education. Click on one to learn more.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(projects).map((page: ProjectData) => (
            <PreviewCard key={page.href} meta={page} />
          ))}
        </div>
      </div>
    </div>
  );
}
