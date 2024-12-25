import PreviewCard from "./components/PreviewCard";
import { projects } from "./components/pages";
import PageMetadata from "./components/Metadata";
import "./styles.scss";

export default function Home() {
  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] sm:mt-4 font-[family-name:var(--font-geist-sans)]">
        <main id="main-content" tabIndex={-1} className="row-start-2 flex flex-col items-center justify-center gap-6">
          <h1 className="text-center">
            Drew King&apos;s Portfolio
          </h1>
          <p className="text-center tiny:px-4 sm:px-16">
            I am an aspiring software engineer with a degree in Computer Science from the Paul G Allen School. I am passionate about creating software that is both beautiful and accessible. I have experience with a variety of technologies and am always learning. I am currently looking for a full-time UX Engineering role.
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