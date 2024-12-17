import Image from 'next/image';
import Link from 'next/link';
import Metadata from './Metadata';

interface PreviewCardProps {
    metadata: Metadata;
}
  
  
  
const PreviewCard: React.FC<PreviewCardProps> = ({ metadata }) => {
    return (
        <Link 
            href={metadata.href}
            className="card-content group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={metadata.image}
                    alt={metadata.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="flex flex-col gap-2 p-4">
                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {metadata.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                    {metadata.description}
                </p>
            </div>
        </Link>
    );
}

export default PreviewCard;