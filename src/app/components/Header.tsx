import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16">
                    <ul className="flex space-x-8">
                        <li>
                            <Link href="/high-speed-rail" 
                                className="px-3 py-2 text-sm font-medium">
                                High Speed Rail
                            </Link>
                        </li>
                        <li>
                            <Link href="/mindmii" 
                                className="px-3 py-2 text-sm font-medium">
                                MindMii
                            </Link>
                        </li>
                        <li>
                            <Link href="/resitogether" 
                                className="px-3 py-2 text-sm font-medium">
                                ResiTogether
                            </Link>
                        </li>
                        <li>
                            <Link href="/kbcs" 
                                className="px-3 py-2 text-sm font-medium">
                                KBCS Theme
                            </Link>
                        </li>
                        <li>
                            <Link href="/sl-screens" 
                                className="px-3 py-2 text-sm font-medium">
                                SL Screens
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}