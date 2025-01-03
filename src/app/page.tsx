import PreviewCard from "./components/PreviewCard";
import { projects } from "./components/pages";
import PageMetadata from "./components/Metadata";
import Image from "next/image";
import "./styles.scss";

export default function Home() {
  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] sm:mt-4 font-[family-name:var(--font-geist-sans)]">
        <main className="row-start-2 flex flex-col items-center justify-center gap-6">
          <h1 id="main-content" className="text-center">
            Drew King&apos;s Portfolio
          </h1>
          <Image src="/images/mindmii/Drew.png" alt="A photograph of Drew King, a white person with short brown hair, blue eyes, gazing out a window, their face is well lit and they have curtains and a photograph behind them." width={200} height={200} className="rounded-full" />
          <p className="text-center tiny:px-4 sm:px-16">
            I am a software engineer with a bachelor’s degree in Computer Science from the <a href="https://www.cs.washington.edu/">Paul G. Allen School at the University of Washington, Seattle</a>. I am passionate about designing software that is visually appealing, accessible to everyone, and optimized for search engine visibility.
          </p>
          <p className="text-center tiny:px-4 sm:px-16">
          I currently work as a web developer at <a href="https://www.kbcs.fm/">KBCS</a>, a community-focused radio station serving the greater Seattle area. I am excited to bring my skills to a full-time <b>UX Engineering</b> role to design and implement an impactful user experience.
          </p>
          <h2 className="text-center">
            Projects
          </h2>
          <p>Each of these projects were completed during my undergraduate education. Click on one to learn more.</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(projects).map((page: PageMetadata) => (
              <PreviewCard key={page.href} meta={page} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}