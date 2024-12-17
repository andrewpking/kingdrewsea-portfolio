// Code for embedding Figma designs in the blog post

interface FigmaEmbedProps {
    src: string;
    title: string;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> =({ src, title }) => {
    return (
      <div className="w-full aspect-video relative">
        <iframe
          className="w-full h-full absolute inset-0"
          style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
          src={src}
          title={title}
          allowFullScreen
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    );
  }

export default FigmaEmbed;