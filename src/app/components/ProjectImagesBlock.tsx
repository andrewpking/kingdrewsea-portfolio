import Image from 'next/image';
import { ReactNode } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
}

interface ProjectImagesBlockProps {
  images: ImageProps[];
  direction?: 'row' | 'column';
  width: number;
  maxHeight: number;
  caption?: string;
  children?: ReactNode;
}

const ProjectImagesBlock: React.FC<ProjectImagesBlockProps> = ({ images, direction = 'row', width, maxHeight, caption, children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-row ">
      <section className="flex-1">
        <div className={`grid gap-6 ${
          direction === 'row' 
            ? `grid-cols-1 ${
                images.length > 1 ? 'md:grid-cols-2' : ''
              } ${
                images.length > 3 ? 'lg:grid-cols-3' : ''
              } ${
                images.length > 4 ? 'lg:grid-cols-5' : ''
              }`
            : 'grid-cols-1'
        }`}>
          {images.map((image, index) => (
            <div key={index} 
                 className={`flex flex-col ${
                   direction === 'column' ? 'mb-6' : ''
                 }`}>
              <div className="w-full" style={{ maxWidth: `${width * 100}px` }}>
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  width={width * 100}
                  height={maxHeight}
                  className="rounded-lg w-full"
                />
              </div>
              {image.caption && (
                <p className="text-sm italic text-gray-200">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
        {caption && (
          <p className="mt-4 text-sm italic text-gray-200">{caption}</p>
        )}
      </section>
      {children && (
        <div className="flex-1 p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProjectImagesBlock;