import type PageMetadata from './Metadata';
import Image from 'next/image';

interface PageHeadingProps {
    metadata: PageMetadata;
}

export default function PageHeading ({metadata}: PageHeadingProps) {
    return (
        <div itemScope itemType ="https://schema.org/CreativeWork">
            <div itemScope itemType='https://schema.org/ImageObject' className="image-head-container relative md:mt-20 md:pt-4 sm:mt-12 sm:pt-0">
                <Image 
                    itemProp='thumbnail'
                    fill={false}
                    src={metadata.image} 
                    alt={metadata.imageAlt} 
                    width={1120} 
                    height={150}
                    sizes= "width: 100vw, height: 10vh"
                    className="w-full h-[250px] md:h-[200px] object-cover"
                    priority
                />
                <div className="absolute inset-0 overlay"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <h1 itemProp='name' className="text-4xl font-bold">
                        {metadata.title}
                    </h1>
                    <time itemProp='dateCreated' className='hidden sm:block text-sm' dateTime={metadata.date}>{metadata.date}</time>
                    <p itemProp='caption' className="hidden sm:block text-center caption">
                        {metadata.description}
                    </p>
                    <p itemProp='author' className='hidden sm:block text-center text-sm'>{metadata.authors}</p>
                </div>
            </div>
        
            {/* Visible only on screens smaller than md */}
            <div className="sm:hidden flex flex-col items-center justify-center gap-1 py-6">
                <time className='text-center' dateTime={metadata.date}>{metadata.date}</time>
                <p itemProp='caption' className="text-center px-4">
                    {metadata.description}
                </p>
                <p itemProp='authors' className='text-sm'>{metadata.authors}</p>
            </div>
        </div>
    )
}