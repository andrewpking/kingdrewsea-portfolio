import Image from 'next/image';
import Header from './Header';
import PageMetadata from './Metadata';
import Footer from './Footer';
import '../styles.scss';

interface MdxPageProps {
    meta: PageMetadata;
    children?: React.ReactNode;
}

const MdxPage: React.FC<MdxPageProps> = ({ meta, children }) => {
    return (
        <>
            <Header />
            <main className="project-page">
                <div className="image-head-container relative md:mt-20 md:pt-4 sm:mt-12 sm:pt-0">
                    <Image 
                        src={meta.image} 
                        alt={meta.imageAlt} 
                        width={1120} 
                        height={150}
                        className="w-full h-[250px] md:h-[200px] object-cover"
                        priority
                    />
                    <div className="absolute inset-0 overlay"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <h1 className="text-4xl font-bold">
                            {meta.title}
                        </h1>
                        <p className="hidden sm:block text-center">
                            {meta.description}
                        </p>
                    </div>
                </div>

                {/* Visible only on screens smaller than md */}
                <p className="sm:hidden text-center px-4 py-6">
                    {meta.description}
                </p>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default MdxPage;