import React from "react";
import { BiSolidCameraPlus } from "react-icons/bi";
import { AiFillFolderOpen } from "react-icons/ai";
import Paragraph from "@/components/UI/Paragraph";
import { uploadFile } from "./classNames";

type FileUploadProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;

  accetpType: "image" | "file";
  name: string;
  title?: string;
  disabled?: boolean;
};
const UplpoadFile = ({ onChange, onBlur, accetpType, title, name }: FileUploadProps) => {
  return (
    <div>
      <Paragraph color="darkGray" align="left" size="sm" className="font-semibold underline mb-6">
        {title}
      </Paragraph>
      <label
        htmlFor={`upload-${accetpType}`}
        className={`${uploadFile.uploadImages} relative overflow-hidden`}
        // onDragEnter={handleDragEnter}
        // onDragLeave={handleDragLeave}
        // onDragOver={handleDragOver}
        // onDrop={handleDrop}
      >
        <div className={uploadFile.uploadImagesContent}>
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            {accetpType === "image" ? (
              <BiSolidCameraPlus size={34} className="text-gray-400" />
            ) : (
              <AiFillFolderOpen size={34} className="text-gray-400" />
            )}
            <Paragraph size="xs" color="lightGray" align="center" className="font-semibold">
              {accetpType === "image" ? "Upload images" : "Upload files"}
            </Paragraph>
          </div>
          <input
            id={`upload-${accetpType}`}
            type="file"
            name={name}
            accept={`${accetpType}/*`}
            multiple
            className="hidden"
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </label>
      <Paragraph size="sm" color="darkGray" align="center" className="font-semibold my-2">
        Drop files here or click to
        <label htmlFor={`upload-${accetpType}`} className="text-gray-60 underline cursor-pointer mx-1">
          &nbsp;browse&nbsp;
        </label>
        through your machine.
      </Paragraph>
      <Paragraph size="xs" color="lightGray" align="center" className="font-semibold">
        {accetpType == "image"
          ? "Allowed *.jpeg, *.jpg, *.png, *.gif   max size of 3 Mb"
          : "Allowed *.pdf, *.jpg, *.png, *.gif max size of 3 Mb"}
      </Paragraph>
    </div>
  );
};

export default UplpoadFile;
