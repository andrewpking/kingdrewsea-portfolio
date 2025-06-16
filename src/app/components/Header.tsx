import Link from "next/link";
import { pages } from "./pages";
import PageMetadata from "./Metadata";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const navigationLinks = Object.values(pages).map((project: PageMetadata) => ({
    href: project.href,
    text: project.title,
  }));

  return (
    <div>
      <div className="h-16 md:h-20 w-full">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
      </div>
      <header className="w-full shadow-sm fixed top-0 z-10">
        <div className="max-w-7xl min-w-[100vw] py-2 sm:py-6 md:py-0 mx-auto">
          <nav
            aria-label="Main navigation"
            className="flex items-center h-0 justify-evenly md:justify-center md:h-auto"
          >
            {/* Desktop menu */}
            <ul className="hidden md:flex md:max-w-7xl md:justify-center md:space-x-4 md:flex-1 md:grid-rows">
              {navigationLinks.map((link) => (
                <li
                  key={link.href}
                  className="py-4 w-full block content-center"
                >
                  <Link
                    href={link.href}
                    className="px-3 py-2 w-full inline-block text-center"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <MobileMenu navigationLinks={navigationLinks} />
        </div>
      </header>
    </div>
  );
}
