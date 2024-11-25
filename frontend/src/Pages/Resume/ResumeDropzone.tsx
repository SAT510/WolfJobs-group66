import React, { useCallback } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
/**
 * Props for the `ResumeDropzone` component.
 * @interface
 */
interface ResumeDropzoneProps {
  /**
   * Callback function to handle file uploads.
   * @param {File[]} files - Array of files to upload.
   */
  onFileUpload: (files: File[]) => void;
}
/**
 * `ResumeDropzone` is a component that provides a drag-and-drop area for uploading resume files.
 * It uses the `react-dropzone` library to handle file drops and validate file types and size.
 *
 * @param {ResumeDropzoneProps} props - The component's props.
 * @returns {JSX.Element} The rendered JSX for the dropzone component.
 */
const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({ onFileUpload }) => {
  /**
   * Handles the drop event for the files.
   * This function is called when files are dropped or selected by the user.
   * It passes accepted files to the parent component and logs any file rejections.
   *
   * @param {File[]} acceptedFiles - Array of files that were accepted.
   * @param {FileRejection[]} fileRejections - Array of files that were rejected due to invalid type/size.
   */
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Pass the accepted files to the parent component
      onFileUpload(acceptedFiles);

      // Handle any file rejections
      fileRejections.forEach((file) => {
        console.error(`File rejected: ${file.file.name}`);
        // Here you can handle displaying an error message to the user
      });
    },
    [onFileUpload]
  ); // Don't forget to include onFileUpload in the dependencies array

  /**
   * The configuration options for the dropzone, including handling the drop event,
   * file acceptance criteria, and file size limit.
   */

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: { "application/pdf": [".pdf"] }, // Only accept PDF files
    maxSize: 15 * 1024 * 1024, // limit the size to 15mb max to agree with the backend
  };
  // Extract the necessary props from the `useDropzone` hook
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
    >
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
