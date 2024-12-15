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
    <div className={`project-images-block flex-${direction === 'column' ? 'flex-col' : 'flex-row'} gap-4`} style={{ maxWidth: `${width * 100}px`, maxHeight }}>
      {images.map((image, index) => (
        <div key={index} className={`image-container flex flex-${direction} gap-2`}>
          <Image src={image.src} alt={image.alt} width={width * 100} height={400} className="image" />
          <p className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">{image.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectImagesBlock;