import Image from "next/image";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="row-start-4 flex gap-6 flex-wrap items-center justify-center p-4">
      <nav className="sm:row-start-4 sm:flex gap-16 sm:flex-wrap">
        <a
          className="mb-4 sm:mb-0 flex items-center gap-2"
          href="https://linkedin.com/in/kingdrewsea"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/LinkedIn.png"
            alt="LinkedIn logo in blue"
            width={16}
            height={16}
            aria-hidden="true"
          />
          LinkedIn
        </a>

        <a
          className="mb-4 sm:mb-0 flex items-center gap-2"
          href="https://github.com/andrewpking"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/github.svg"
            alt="Github logo"
            width={16}
            height={16}
            aria-hidden="true"
            className="dark:invert transition-[filter] duration-300"
          />
          GitHub
        </a>

        <a
          className="mb-4 sm:mb-0 flex items-center gap-2"
          href="https://bsky.app/profile/drewking.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/Bluesky_Logo.svg"
            alt="Bluesky logo"
            width={16}
            height={16}
            aria-hidden="true"
            className="transition-[filter] duration-300"
          />
          Bluesky
        </a>

        <a
          className="mb-4 sm:mb-0 flex items-center gap-2"
          href="mailto:me@drewking.dev"
        >
          <MdEmail aria-hidden="true" size={16} />
          Email
        </a>
      </nav>
    </footer>
  );
}
