import React, { useCallback } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
/**
 * ResumeDropzone Component
 *
 * A drag-and-drop file upload area for handling PDF file uploads. It accepts only
 * PDF files with a maximum size limit of 15 MB. Once files are dropped, they are
 * passed to the parent component via the `onFileUpload` callback. The component
 * also handles file rejections by logging errors.
 *
 * @component
 * @example
 * // Usage of ResumeDropzone component
 * <ResumeDropzone onFileUpload={(files) => console.log(files)} />
 *
 * @param {Object} props - The props for the component
 * @param {Function} props.onFileUpload - Callback function to handle the uploaded files.
 *        It is called with the array of accepted files.
 *
 * @returns {JSX.Element} The rendered component
 */
interface ResumeDropzoneProps {
  onFileUpload: (files: File[]) => void;
}
/**
 * ResumeDropzone functional component that uses react-dropzone for file uploading.
 *
 * The component handles drag-and-drop or click-to-select file uploads. It accepts
 * only PDF files and limits the file size to 15MB. Upon file drop or selection,
 * it calls the provided `onFileUpload` callback with the accepted files.
 * If any files are rejected (e.g., due to type or size), the error is logged in
 * the console.
 *
 * @param {ResumeDropzoneProps} props - The props for this component
 * @returns {JSX.Element} The rendered dropzone area
 */
const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({ onFileUpload }) => {
  // Callback to handle file drop and rejection
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Pass the accepted files to the parent component via the onFileUpload callback
      onFileUpload(acceptedFiles);

      // Handle any file rejections, such as invalid file type or size
      fileRejections.forEach((file) => {
        console.error(`File rejected: ${file.file.name}`);
        // Here, we could also display a message to the user, like an error alert
      });
    },
    [onFileUpload] // Include onFileUpload as a dependency to ensure the callback is updated
  ); // Don't forget to include onFileUpload in the dependencies array
  // Configuration for the dropzone, including accepted file types and size limits
  const dropzoneOptions: DropzoneOptions = {
    onDrop, // The callback to call when files are dropped
    accept: { "application/pdf": [".pdf"] }, // Accept only PDF files
    maxSize: 15 * 1024 * 1024, // Set maximum file size to 15 MB
  };
  // Hook to get props and state from react-dropzone
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
    >
      {/* Spread the input props to the hidden file input */}
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-700">Drop the files here ...</p>
      ) : (
        <p className="text-gray-700">
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default ResumeDropzone;
