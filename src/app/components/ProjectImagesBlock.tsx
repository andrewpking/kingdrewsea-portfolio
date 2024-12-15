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
    <div className={`project-images-block flex ${direction === 'row' ? 'flex-col' : 'flex-row'}`} style={{ maxHeight }}>
      {images.map((image, index) => (
        <div key={index} className={`flex ${direction === 'row' ? 'flex-col' : 'flex-row'} gap-2`} style={{ maxWidth: `${width * 100/ images.length + 50}px` }}>
          <div className="image-container block">
            <Image src={image.src} alt={image.alt} width={width * 100} height={400} className="image" />
            <p className={`inline w-${width * 100} overflow-none whitespace`}>{image.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectImagesBlock;