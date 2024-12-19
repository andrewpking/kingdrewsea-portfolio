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
    <div className={`max-w-7xl mx-auto tiny:block sm:flex flex-row`}>
      <section className={`tiny:block sm:flex-1 ${direction === 'column' ? `w-[${width * 100}px]` : `w-[${width * 100 * images.length}]px`}`}>
        <div className={`grid gap-6 ${
          direction === 'row' 
            ? `grid-cols-1 ${
                images.length > 1 ? 'xs:grid-cols-2' : ''
              } ${
                images.length > 3 ? 'md:grid-cols-3' : ''
              } ${
                images.length > 4 ? 'md:grid-cols-5' : ''
              }`
            : 'grid-cols-1'
        }`}>
          {images.map((image, index) => (
            <div key={index} 
                 className={`flex flex-col ${
                   direction === 'column' ? 'mb-6' : ''
                 }`}>
              <div className="sm:max-w-[700px] md:max-w-[900px] mx-auto">
                <Image 
                  fill={false}
                  src={image.src} 
                  alt={image.alt}
                  width={width * 100}
                  height={maxHeight}
                  className="rounded-lg"
                />
              </div>
              {image.caption && (
                <p className="italic">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
        {caption && (
          <p className="mt-4 italic">{caption}</p>
        )}
      </section>
      {children && (
        <div className="tiny:block sm:flex-1 p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProjectImagesBlock;