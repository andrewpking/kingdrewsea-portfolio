import Image from 'next/image';

interface Image {
  src: string;
  alt: string;
  caption: string;
}

interface ProjectImagesBlockProps {
  images: Image[];
  direction?: 'row' | 'column';
  width: number;
  maxHeight: string;
}

const ProjectImagesBlock: React.FC<ProjectImagesBlockProps> = ({ images, direction = 'row', width, maxHeight }) => {
  return (
    <div className={`project-images-block flex flex-${direction} gap-4`} style={{ maxWidth: `${width * 100}px`, maxHeight }}>
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <Image src={image.src} alt={image.alt} className="image" />
          <p className="caption">{image.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectImagesBlock;