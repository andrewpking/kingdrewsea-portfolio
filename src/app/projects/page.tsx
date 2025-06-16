import PreviewCard from "../components/PreviewCard";
import { projects } from "../components/pages";
import PageMetadata from "../components/Metadata";
// import Image from "next/image";
import "../styles.scss";

export default function Home() {
  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] sm:mt-4 font-[family-name:var(--font-geist-sans)]">
        <main className="row-start-2 flex flex-col items-center justify-center gap-6">
          <h1 className="text-center">Projects</h1>
          <p>
            Each of these projects were completed during my undergraduate
            education. Click on one to learn more.
          </p>
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
