/**
 * Resume Component.
 * 
 * This component allows users to upload their resumes, view the current resume name, 
 * and navigate to a resume viewer. It uses a `Dropzone` to handle file uploads and 
 * makes an API request to upload the file to the server.
 * 
 * - **File Upload**: The component allows users to upload a new resume, which will be 
 *   sent to the backend through a POST request.
 * - **Current Resume**: Displays the name of the current resume if available. A link 
 *   to view the resume is also provided.
 * 
 * @component
 * @example
 * return (
 *   <Resume />
 * )
 */
import React, { useState } from "react";
import axios from "axios";
import ResumeDropzone from "../../components/Resume/ResumeDropzone";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";
/**
 * Resume component handles the upload of user resume and shows the current resume name.
 * 
 * It allows users to:
 * - Upload a resume file using a dropzone.
 * - View the current uploaded resume's name if available.
 * - Submit the resume for upload via a POST request to the server.
 * 
 * @returns {JSX.Element} The rendered Resume component.
 */
const Resume: React.FC = () => {
  // State to store the uploaded file
  const [file, setFile] = useState<File | null>(null);

  // Retrieve current user resume and user ID from the global store
  const resumeName = useUserStore((state) => state.resume); // Current resume name
  const userId = useUserStore((state) => state.id); // Current user ID
  const updateResume = useUserStore((state) => state.updateResume); // Method to update resume in store
  const updateResumeId = useUserStore((state) => state.updateResumeId); // Method to update resume ID in store
  /**
   * Handles the submission of the uploaded resume.
   * 
   * This function constructs a FormData object to send the resume file and user ID to 
   * the backend. Upon success, a success toast is displayed, otherwise, an error toast 
   * is shown.
   * 
   * @async
   * @function handleSubmit
   */
  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("id", userId);

      try {
        // Sending the resume file to the server
        const response = await axios.post(
          "http://localhost:8000/users/uploadresume", // API endpoint for resume upload
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Required for file uploads
            },
          }
        );

        if (response.status === 201) {
          console.log("Resume uploaded successfully");
          toast.success(
            "Resume Uploaded Successfully. Sign out and sign back in to see changes!"
          );
        }
      } catch (error) {
        console.error("Error uploading the resume", error);
        toast.error("Resume could not be uploaded");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-1/3">
          <ResumeDropzone
            onFileUpload={(acceptedFiles) => setFile(acceptedFiles[0])}
          />
          <div className="flex flex-row">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded"
            >
              Upload Resume
            </button>
          </div>

          {resumeName && (
            <div className="mt-4">
              <p>Current Resume: {resumeName}</p>
              <a
                href={`/resumeviewer/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded"
              >
                View
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resume;
