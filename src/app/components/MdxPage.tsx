import '../styles.scss';

interface MdxPageProps {
    children?: React.ReactNode;
}

export default function MdxPage ({ children }: MdxPageProps) {
    return (
        <main className="project-page">
            {children}
        </main>
    );
}