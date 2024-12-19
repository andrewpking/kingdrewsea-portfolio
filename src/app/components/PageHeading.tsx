import type PageMetadata from './Metadata';
import Image from 'next/image';

interface PageHeadingProps {
    metadata: PageMetadata;
}

export default function PageHeading ({metadata}: PageHeadingProps) {
    return (
        <>
            <div className="image-head-container relative md:mt-20 md:pt-4 sm:mt-12 sm:pt-0">
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
                    <p className="hidden sm:block text-center">
                        {metadata.description}
                    </p>
                </div>
            </div>
        
            {/* Visible only on screens smaller than md */}
            <p className="sm:hidden text-center px-4 py-6">
                {metadata.description}
            </p>
        </>
    )
}