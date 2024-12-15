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

const ProjectImagesBlock: React.FC<ProjectImagesBlockProps> = ({ images, direction = 'row', width, maxHeight }) => {
  return (
    <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'} `} style={{ maxHeight }}>
      {images.map((image, index) => (
        <div key={index} className={`image-container flex flex-col`} style={{ maxWidth: `${width * 100+ 50 }px` }}>
          <Image src={image.src} alt={image.alt} width={width * 100} height={400} className="image" />
          <p className={`inline w-${width * 100} overflow-none whitespace italic small mb-2`}>{image.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectImagesBlock;