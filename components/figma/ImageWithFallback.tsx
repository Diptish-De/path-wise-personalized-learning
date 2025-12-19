import React from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, fallbackSrc, className }) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => fallbackSrc && setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;
