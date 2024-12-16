import Head from 'next/head';
import Image from 'next/image';
import Header from './Header';
import '../styles.scss';

interface Metadata {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
}

interface MdxPageProps {
    metadata: Metadata;
    children?: React.ReactNode;
}

const MdxPage: React.FC<MdxPageProps> = ({ metadata, children }) => {
    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <Header />
            <main className="project-page">
                <div className="image-head-container relative mt-20">
                    <Image 
                        src={metadata.image} 
                        alt={metadata.imageAlt} 
                        width={1120} 
                        height={150}
                        className="w-full h-[250px] md:h-[200px] object-cover"
                        priority
                    />
                    <div className="absolute inset-0 overlay"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <h1 className="text-4xl font-bold">
                            {metadata.title}
                        </h1>
                        <p className="hidden md:block text-center">
                            {metadata.description}
                        </p>
                    </div>
                </div>

                {/* Visible only on screens smaller than md */}
                <p className="md:hidden text-center px-4 py-6">
                    {metadata.description}
                </p>
                {children}
            </main>
        </>
    );
}

export default MdxPage;