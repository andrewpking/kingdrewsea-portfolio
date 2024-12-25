import { Metadata } from 'next';
import '../styles.scss';

interface MdxPageProps {
    children?: React.ReactNode;
}

// Force static rendering
export const dynamic = 'force-static';
export const revalidate = false;

// Static metadata
export const generateMetadata = (): Metadata => {
    return {
        other: {
            'Cache-Control': 'public, max-age=31536000, immutable'
        }
    };
};

export default function MdxPage({ children }: MdxPageProps) {
    return (
        <main id="main-content" tabIndex={0} className="project-page row-start-2 flex flex-col justify-center">
            {children}
        </main>
    );
}