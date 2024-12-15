import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  caption: string;
}

interface ProjectImagesBlockProps {
  images: ImageProps[];
  direction?: 'row' | 'column';
  width: number;
  maxHeight: string;
}

const ProjectImagesBlock: React.FC<ProjectImagesBlockProps> = ({ images, direction = 'row', width, maxHeight, caption, children }) => {
  return (
    <div className="flex flex-row gap-4">
      <section className={`inline-flex flex-col mb-4 `} style={{maxHeight: `${maxHeight + 200} px`, maxWidth: `${width * 100 * images.length + 50} px`}}>
        <div className={`inline-flex ${direction === 'row' ? 'flex-row' : 'flex-col'} mb-4 `} style={{maxHeight: `${maxHeight} px`, maxWidth: `${width * 100 * images.length + 50} px`}}>
          {images.map((image, index) => (
            <div key={index} className={`image-container flex flex-col p-4`} style={{ maxWidth: `${width * 100+ 50 }px` }}>
              <Image src={image.src} alt={image.alt} width={width * 100} height={400} className="border image" style={{ maxWidth: `${width * 100+ 50 }px`}} />
              {image.caption && <p className={`float-left w-${width * 100} whitespace italic small mb-2`}>{image.caption}</p>}
            </div>
          ))}
        </div>
        <div className="block clear-both">
          <p className={`float-left w-${width * 100} whitespace italic small mb-2`}>{caption}</p>
        </div>
      </section>

      <div className="children-container inline float-right p-4">
        {children}
      </div>
    </div>

  );
};

export default ProjectImagesBlock;