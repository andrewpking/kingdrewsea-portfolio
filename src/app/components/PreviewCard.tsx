import Image from 'next/image';
import Link from 'next/link';
import PageMetadata from './Metadata';

interface PreviewCardProps {
    meta: PageMetadata;
}
  
  
  
const PreviewCard: React.FC<PreviewCardProps> = ({ meta: metadata }) => {
    return (
        <Link 
            href={metadata.href}
            className="card-content group flex flex-col overflow-hidden rounded-lg"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={metadata.image}
                    alt={metadata.imageAlt}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h3 className="font-semibold card-title">
                    {metadata.title}
                </h3>
                <p className="line-clamp-2">
                    {metadata.description}
                </p>
            </div>
        </Link>
    );
}

export default PreviewCard;