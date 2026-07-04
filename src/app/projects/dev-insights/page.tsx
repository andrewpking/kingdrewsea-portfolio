import type { Metadata } from "next";
import { projects, generateProjectMetadata } from "../../components/pages";

export async function generateMetadata(): Promise<Metadata> {
  return generateProjectMetadata(projects.devInsights);
}

export default function Page() {
  return (
    <div className="project-page row-start-2 flex flex-col justify-center">
      <h1>My Development Inisghts Dashboard</h1>
      <p>
        Ever wonder if that post on bluesky made a difference in how your repo
        is doing? I seek to answer that question here...
      </p>
    </div>
  );
}
