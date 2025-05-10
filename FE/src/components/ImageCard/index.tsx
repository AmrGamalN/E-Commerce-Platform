import React from "react";
import Image from "next/image";
import { FaRotateRight } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import { IoCloseOutline } from "react-icons/io5";
import { imageCardStyles } from "./classNames";

type ImageCardProps = {
  imgSrc: string;
  rotateDeg: number;
  onDelete?: () => void;
  onRotate?: () => void;
};

const ImageCard = ({ imgSrc, onDelete, onRotate, rotateDeg }: ImageCardProps) => {
  return (
    <div className="relative group">
      {/* Image Container */}
      <div className={imageCardStyles.cardStyle}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="Uploaded image preview"
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ transform: `rotate(${rotateDeg}deg)` }} // Apply rotation
            priority
          />
        ) : (
          // Loading State
          <div className="flex items-center justify-center h-full">
            <ImSpinner8 size={24} className="animate-spin text-gray-500" />
          </div>
        )}
      </div>

      {/* Image Actions */}
      {imgSrc && (
        <div className={imageCardStyles.imageAction}>
          {/* Remove Button */}
          <button onClick={onDelete} className={imageCardStyles.removeBtn} aria-label="Delete image">
            <IoCloseOutline size={16} />
          </button>

          {/* Rotate Button */}
          <button onClick={onRotate} type="button" className={imageCardStyles.rotateBtn} aria-label="Rotate image">
            <FaRotateRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
