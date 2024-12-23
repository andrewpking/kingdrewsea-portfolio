import '../styles.scss';

interface MdxPageProps {
    children?: React.ReactNode;
}

export default function MdxPage ({ children }: MdxPageProps) {
    return (
        <main id="main-content" tabIndex={-1} className="project-page">
            {children}
        </main>
    );
}