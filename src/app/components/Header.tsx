import Link from 'next/link';
import { projects } from './pages';
import PageMetadata from './Metadata';
import MobileMenu from './MobileMenu';

export default function Header() {

    const navigationLinks = Object.values(projects).map((project: PageMetadata) => ({
        href: project.href,
        text: project.title,
    }));

    return (
        <header className="w-full shadow-sm fixed top-0 z-50">
            <div className="max-w-7xl min-w-[100vw] py-2 md:py-0 mx-auto">
                <Link href="/" className='portfolio-title hidden md:block md:my-4'>
                    <p className='ml-2 text-center'>Drew King&apos;s Portfolio</p>
                </Link>
                <nav aria-label="Main navigation" className="flex items-center justify-evenly md:justify-center h-auto">
                    {/* Desktop menu */}
                    <ul className="hidden md:flex md:max-w-7xl md:justify-center md:space-x-4 md:flex-1 md:justify-center md:grid-rows">
                        {navigationLinks.map((link) => (
                            <li key={link.href} className='py-4 w-full block content-center'>
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
    );
}