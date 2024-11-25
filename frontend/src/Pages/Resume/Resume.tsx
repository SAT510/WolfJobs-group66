
import { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";

// Import styles for react-pdf
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set up pdf worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
/**
 * ResumeViewer Component
 * 
 * This component fetches and displays a PDF resume for a specific applicant. 
 * It allows users to navigate through the pages of the resume and view its content.
 * The component fetches the resume from the server based on the applicant's ID
 * passed in the URL parameters.
 *
 * @component
 * @example
 * return (
 *   <ResumeViewer />
 * )
 */
function ResumeViewer() {
  // Extract the applicantId from the URL parameters using react-router's useParams
  // get the applicant id
  const { applicantId } = useParams();

  const [numPages, setNumPages] = useState<number | null>(null); // Total number of pages in the resume
  const [pageNumber, setPageNumber] = useState<number>(1); // Current page number
  const [resumeUrl, setResumeUrl] = useState<string | null>(null); // Blob URL for the resume PDF

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  /**
   * Handles the successful loading of the PDF document.
   * Sets the total number of pages in the resume.
   *
   * @param {Object} param0 - The event object containing the number of pages in the document.
   * @param {number} param0.numPages - The number of pages in the loaded PDF.
   */
  function goToPreviousPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : 1
    );
  }
  /**
   * Goes to the previous page of the resume if it's not the first page.
   */
  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber < (numPages || 0) ? prevPageNumber + 1 : prevPageNumber
    );
  }
  /**
   * Fetches the resume PDF from the server and sets the URL for the document.
   * Uses the applicantId from the URL to get the corresponding resume.
   * 
   * The resume is fetched as a blob and converted into a URL object.
   */
  useEffect(() => {
    async function getResume() {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/applicantresume/${applicantId}`,
          {
            responseType: "blob", // Expecting the response to be a blob (binary data)
          }
        );
        // Create a temporary object URL for the fetched resume blob
        const resumeBlobUrl = URL.createObjectURL(response.data);
        setResumeUrl(resumeBlobUrl);
      } catch (error) {
        console.error("Error fetching resume", error);
      }
    }
    getResume();
  }, [applicantId]); // The effect runs whenever the applicantId changes

  /**
   * Cleanup the blob URL to free up resources when the component is unmounted.
   */
  useEffect(() => {
    return () => {
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl); // Revoke the object URL to avoid memory leaks
      }
    };
  }, [resumeUrl]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {resumeUrl && (
        <div className="border-2 border-black shadow-lg">
          <Document file={resumeUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded-l hover:bg-red-700"
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <p className="mx-2">
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={goToNextPage}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded-r hover:bg-red-700"
          disabled={pageNumber >= (numPages || 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ResumeViewer;