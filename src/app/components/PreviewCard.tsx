import Image from 'next/image';
import Link from 'next/link';
import PageMetadata from './Metadata';

interface PreviewCardProps {
    meta: PageMetadata;
}
  
  
  
const PreviewCard: React.FC<PreviewCardProps> = ({ meta: metadata }) => {
    return (
        <div itemScope itemType ="https://schema.org/CreativeWork">
        <Link
            href={metadata.href}
            className="card-content group flex flex-col overflow-hidden rounded-lg"
        >
            <div itemScope itemType='https://schema.org/ImageObject' className="relative h-48 w-full">
                <Image
                    itemProp='thumbnail'
                    src={metadata.image}
                    alt={metadata.imageAlt}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-2 p-4 card-text">
                <h3 itemProp='name' className="font-semibold card-title">
                    {metadata.title}
                </h3>
                <time className='text-sm' itemProp='dateCreated' dateTime={metadata.date}>{metadata.date}</time>
                <p itemProp='caption' className="line-clamp-2">
                    {metadata.description}
                </p>
            </div>
        </Link>
        </div>
    );
}

export default PreviewCard;