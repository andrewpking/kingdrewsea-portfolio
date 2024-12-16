"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";


// Credit to https://daily-dev-tips.com/posts/how-to-use-react-icons-in-nextjs/
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/high-speed-rail", text: "High Speed Rail" },
        { href: "/mindmii", text: "MindMii" },
        { href: "/resitogether", text: "ResiTogether" },
        { href: "/kbcs", text: "KBCS Theme" },
        { href: "/sl-screens", text: "SL Screens" }
    ];

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
        <header className="w-full shadow-sm fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <p className='ml-2 text-center hidden md:block'>Drew King&apos;s Portfolio</p>
                <nav className="flex items-center justify-between h-16">
                    {/* Mobile menu button */}
                    <button 
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        <GiHamburgerMenu className="h-6 w-6" />
                    </button>
                    <p className='ml-2 text-center md:hidden'>Drew King&apos;s Portfolio</p>
                    {/* Desktop menu */}
                    <ul className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link 
                                    href={link.href}
                                    className="px-3 py-2 text-sm font-medium"
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

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
                        {links.map((link) => (
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
        </header>
    );
}