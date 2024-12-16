import Head from 'next/head';
import Image from 'next/image';
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
            <main className="project-page">
                <div className="relative">
                    <Image 
                        src={metadata.image} 
                        alt={metadata.imageAlt} 
                        width={1120} 
                        height={150}
                        className="w-full h-[150px] object-cover"
                        priority
                    />
                    <div className="absolute inset-0 overlay"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold z-10">
                            {metadata.title}
                        </h1>
                        <p className="text-white z-10">
                            {metadata.description}
                        </p>
                    </div>
                </div>
                {children}
            </main>
        </>
    );
}

export default MdxPage;