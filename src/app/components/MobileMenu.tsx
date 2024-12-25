'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCollectionsBookmark } from 'react-icons/md';

interface NavigationLink {
    href: string;
    text: string;
}

// Credit to https://daily-dev-tips.com/posts/how-to-use-react-icons-in-nextjs/
export default function MobileMenu ({navigationLinks: navigationLinks}: {navigationLinks: NavigationLink[]}) {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [isOpen]);

    return (
        <div className='md:hidden'>
            {/* Mobile menu button */}
            <nav aria-label="Main navigation" className="flex items-center justify-between w-[80vw] mx-auto h-auto">
            <button 
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
            >
                <GiHamburgerMenu className="h-4 w-4" />
            </button>
            <Link href="/" className='portfolio-title md:hidden'>
            <p className='text-center md:hidden'>Drew King&apos;s Portfolio</p>
            </Link>
            {/* Download resume button */}
            <Link 
                href={'./Resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className='md:hidden'
                download
            >
                <button className="md:hidden flex items-center">
                <MdCollectionsBookmark
                    aria-hidden="true"
                    size={16}
                    />
                    <p className='md:hidden sr-only'>Download Resume</p>
                    </button>
            </Link>
            </nav>
            {/* Mobile menu overlay */}
            <div 
                className={`
                    fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsOpen(false)}
                hidden={!isOpen}
            />

            {/* Mobile menu panel */}
            <aside 
                className={`
                    mobile-menu fixed top-0 left-0 w-64 h-full transform transition-transform md:hidden
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
                hidden={!isOpen}
            >
                <nav className="h-full pt-16 pb-4 px-4">
                    <ul className="space-y-2">
                        {navigationLinks.map((link) => (
                            <li key={link.href}>
                                <Link 
                                    href={link.href}
                                    className="block px-4 py-2 rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </div>
    )
}