import type { Metadata } from "next";
import { projects, generateProjectMetadata } from "../../components/pages";
import Content from "./Content.mdx";

export async function generateMetadata(): Promise<Metadata> {
  return generateProjectMetadata(projects.ResiTogether);
}

export default function Page() {
  return (
    <div className="project-page row-start-2 flex flex-col justify-center">
      <Content />
    </div>
  );
}
