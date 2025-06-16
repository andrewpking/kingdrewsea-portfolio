import Link from "next/link";
import PageMetadata from "./Metadata";
import Image from "next/image";

interface ProjectProps {
  metadata: PageMetadata;
  children: React.ReactNode;
}

const Project: React.FC<ProjectProps> = ({ metadata, children }) => {
  return (
    <section className="py-8 border-t border-gray-200 first:border-t-0">
      <div className="md:flex md:gap-8">
        <div className="md:w-1/3 mb-6 md:mb-0 flex-shrink-0">
          <Image
            src={metadata.image}
            alt={metadata.title}
            className="rounded-lg shadow-md w-full"
            width={1200}
            height={630}
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            <Link href={metadata.href}>{metadata.title}</Link>
          </h2>
          <div className="prose prose-gray max-w-none">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Project;
