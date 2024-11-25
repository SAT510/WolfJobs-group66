/**
 * ResumeViewer Component
 * This component is responsible for displaying a PDF resume for an applicant. It fetches the resume file from a backend API using the applicant's ID from the URL parameters.
 * The resume is rendered page by page, and the user can navigate between pages using "Previous" and "Next" buttons.
 *
 * Dependencies:
 * - react-pdf: for rendering PDF files.
 * - axios: for making API requests to fetch the resume.
 * - react-router-dom: for accessing URL parameters.
 *
 * @component
 * @example
 * return <ResumeViewer />
 */
import { useState, useEffect } from "react";
import axios from "axios";
// Import styles for react-pdf
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";

// Import styles for react-pdf
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set up pdf worker for rendering
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeViewer() {
  /**
   * Extract applicantId from the URL parameters.
   * This ID is used to fetch the applicant's resume.
   */
  // get the applicant id
  const { applicantId } = useParams();
  // State variables to manage document state
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  /**
   * Callback function triggered when the document has loaded successfully.
   * Updates the number of pages in the document.
   *
   * @param {Object} param - The object containing the number of pages in the document.
   * @param {number} param.numPages - The total number of pages in the document.
   */
  function goToPreviousPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : 1
    );
  }
  /**
   * Function to go to the previous page of the PDF.
   * Prevents navigating before page 1.
   */
  function goToNextPage() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber < (numPages || 0) ? prevPageNumber + 1 : prevPageNumber
    );
  }
  /**
   * Fetch the applicant's resume from the backend API.
   * The resume is fetched as a Blob and converted to a URL for use in the Document component.
   */
  useEffect(() => {
    async function getResume() {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/applicantresume/${applicantId}`,
          {
            responseType: "blob", // Expecting a binary Blob response (PDF)
          }
        );
        const resumeBlobUrl = URL.createObjectURL(response.data); // Convert the Blob to a URL
        setResumeUrl(resumeBlobUrl); // Set the resume URL for the Document component
      } catch (error) {
        console.error("Error fetching resume", error); // Log any errors during the fetch
      }
    }
    getResume(); // Call the fetch function when the component mounts
  }, [applicantId]); // Re-run the effect if the applicantId changes
  /**
   * Cleanup function to revoke the Blob URL when the component unmounts or when the resumeUrl changes.
   */
  // Cleanup the blob URL
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
          {/* Render the PDF document with the current page number */}
          <Document file={resumeUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        {/* Button to go to the previous page */}
        <button
          onClick={goToPreviousPage}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded-l hover:bg-red-700"
          disabled={pageNumber <= 1}
        >
          Previous
          {/* Button to go to the next page */}
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
