import { useState } from "react";
import Image from "next/image";
import { FC } from "react";

interface MagnifyImageProps {
  src: string;
  alt: string;
  angle: string;
  magnifierSize?: number;
  zoomLevel?: number;
  containerClassName?: string;
}

const MagnifyImage: FC<MagnifyImageProps> = ({
  src = "/assets/images/itemCard/defaultImg.png",
  alt,
  angle,

  magnifierSize = 150,
  zoomLevel = 3,
  containerClassName = "relative w-full h-full",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0, show: false });
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const clientX =
      e.type === "touchmove" ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      e.type === "touchmove" ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setPosition({ x, y, show: true });
  };

  const handleLeave = () => setPosition({ ...position, show: false });
  return (
    <div
      className={containerClassName}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchEnd={handleLeave}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          style={{ zIndex: 10, transform: `rotate(${angle}deg)` }}
        />
      ) : null}
      {position.show && (
        <div
          style={{
            position: "absolute",
            top: `${position.y - magnifierSize / 2}px`,
            left: `${position.x - magnifierSize / 2}px`,
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: `-${position.x * zoomLevel - magnifierSize / 2}px -${
              position.y * zoomLevel - magnifierSize / 2
            }px`,
            border: "2px solid #ccc",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      )}
    </div>
  );
};

export default MagnifyImage;
