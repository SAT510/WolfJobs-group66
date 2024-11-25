import { Button } from "@mui/material";
import { useUserStore } from "../../store/UserStore";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import JobScreening from "./JobScreening";
import JobGrading from "./JobGrading";
import JobRating from "./JobRating";
import JobFinalReview from "./JobFinalReview";
import { toast } from "react-toastify";
/**
 * JobManagerView component handles the display and management of a specific job,
 * including actions such as closing, deleting, editing, and reviewing candidates.
 * It also manages the different views (screening, grading, rating, and final review) for a job.
 *
 * @param {Object} props - The component's props.
 * @param {Job} props.jobData - The data related to the job to manage.
 * @returns {JSX.Element} The rendered component.
 */
const JobManagerView = (props: any) => {
  const { jobData }: { jobData: Job } = props; // Destructure job data from props
  const role = useUserStore((state) => state.role); // Fetch user role from store
  const userId = useUserStore((state) => state.id); // Fetch user ID from store
  // Initialize state for managing query parameters and the current view
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewManager, setViewManager] = useState("job-screening");
  // Use effect hook to set the view manager based on search parameters
  useEffect(() => {
    const jobManager: string = searchParams.get("view") || "job-screening";
    setViewManager(jobManager); // Update the view when searchParams or jobData changes
  }, [searchParams, jobData]);
  /**
   * Handles closing the job by making an API request to close it.
   *
   * @param {Event} e - The event object.
   */
  const handleCloseJob = (e: any) => {
    e.preventDefault();
    console.log("Close job");

    const body = {
      jobid: jobData._id, // Send job ID to close the job
    };
     // Make API request to close the job
    axios
      .post("http://localhost:8000/api/v1/users/closejob", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to apply");
          return;
        }
        toast.success("Job closed");
        location.reload(); // Reload the page to reflect the job status change
      });
  };
  /**
   * Handles deleting the job by making an API request to delete it.
   *
   * @param {Event} e - The event object.
   */
  const handleDeleteJob = (e: any) => {
    e.preventDefault();
    console.log("Delete job");

    const body = {
      jobid: jobData._id, // Send job ID to delete the job
    };
    // Make API request to delete the job
    axios
      .delete("http://localhost:8000/api/v1/users/deletejob", { data: body })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to delete job");
          return;
        }
        toast.success("Job deleted");
        location.reload(); // Reload the page to reflect the job deletion
      })
      .catch((err) => {
        toast.error("Error deleting job"); // Error handling
      });
  };
  /**
   * JobEditForm component allows the editing of job details such as name, description, location, etc.
   * 
   * @param {Object} jobData - The current job data to be edited.
   * @param {Function} onSave - Callback function to handle the save action after editing.
   * @returns {JSX.Element} The rendered form for job editing.
   */
  const JobEditForm = ({ jobData, onSave }: any) => {
    const [formData, setFormData] = useState({
      name: jobData.name,
      description: jobData.description,
      type: jobData.type,
      location: jobData.location,
      requiredSkills: jobData.requiredSkills,
      pay: jobData.pay,
    });
    /**
     * Handles changes to the form input fields.
     *
     * @param {Event} e - The event object.
     */
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Update form data with the new value
      }));
    };
    /**
     * Handles form submission to save the edited job data.
     *
     * @param {Event} e - The event object.
     */
    const handleSubmit = (e: any) => {
      e.preventDefault();
      onSave(formData); // Trigger the save callback with updated form data
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {/* Form input fields for editing job details */}
        <div style={{ flex: 1, minWidth: "250px" }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: "250px" }}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: "250px" }}>
          <label>Location</label>
          <textarea
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <label>Location</label>
          <textarea
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: "250px" }}>
          <label>Pay</label>
          <textarea
            name="pay"
            value={formData.pay}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: "250px" }}>
          <label>Required Skills</label>
          <textarea
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Save Changes
          </Button>
        </div>
      </form>
    );
  };
  /**
   * Handles saving the edited job data after a successful form submission.
   *
   * @param {Object} updatedData - The updated job data to save.
   */
  const handleSaveJobEdit = (updatedData: any) => {
    const body = {
      jobid: jobData._id,
      ...updatedData, // Merge updated data with existing job data
    };
    // Make API request to update the job
    axios
      .put("http://localhost:8000/api/v1/users/editjob", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to update job");
          return;
        }
        toast.success("Job updated");
        setViewManager("job-screening"); // Switch back to screening view after saving
      })
      .catch((err) => {
        toast.error("Error updating job"); // Error handling
      });
  };

  return (
    <>
      {role === "Manager" &&
        userId === jobData.managerid &&
        jobData.status === "open" && (
          <div className="m-4">
            <div className="mx-2">
              <Button
                onClick={handleCloseJob}
                type="button"
                variant="outlined"
                style={{
                  color: "#FF5353",
                  borderColor: "#FF5353",
                  textTransform: "none",
                  fontSize: "16px",
                  minWidth: "200px",
                  margin: "10px",
                }}
              >
                {/* Button for closing jobs */}
                Close job
              </Button>
              <Button
                onClick={handleDeleteJob}
                type="button"
                variant="outlined"
                style={{
                  color: "#FF5353",
                  borderColor: "#FF5353",
                  textTransform: "none",
                  fontSize: "16px",
                  minWidth: "200px",
                  margin: "10px",
                }}
              >
                {/* Button for deleting jobs */}
                Delete job
              </Button>
              <Button
                onClick={() => setViewManager("job-edit")}
                type="button"
                variant="outlined"
                style={{
                  color: "#FF5353",
                  borderColor: "#FF5353",
                  textTransform: "none",
                  fontSize: "16px",
                  minWidth: "200px",
                  margin: "10px",
                }}
              >
                {/* Button for switching between different job views */}
                Edit Job
              </Button>
            </div>
            {/* Button for navigating to the "job-grading" view */}
            <div className="text-2xl my-4">Candidates Review</div>
            <div className="flex flex-row justify-around">
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-screening" });
                }}
                type="button"
                variant={viewManager === "job-screening" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  borderColor: viewManager === "job-screening" ? "" : "#FF5353",
                  color:
                    viewManager === "job-screening" ? "#FFFFFF" : "#FF5353",
                  backgroundColor:
                    viewManager === "job-screening" ? "#FF5353" : "",
                }}
              >
                {/* Button for navigating to the "job-rating" view */}
                Screening
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-grading" });
                }}
                type="button"
                variant={viewManager === "job-grading" ? "contained" : "text"}
                // style={{ maxWidth: "500px" }}
                fullWidth={true}
                style={{
                  borderColor: viewManager === "job-grading" ? "" : "#FF5353",
                  color: viewManager === "job-grading" ? "#FFFFFF" : "#FF5353",
                  backgroundColor:
                    viewManager === "job-grading" ? "#FF5353" : "",
                }}
              >
                {/* Button for navigating to the "job-final-review" view */}
                Grading
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-rating" });
                }}
                type="button"
                variant={viewManager === "job-rating" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  // borderColor: viewManager === "job-rating" ? "" : "#FF5353",
                  color: viewManager === "job-rating" ? "#FFFFFF" : "#FF5353",
                  backgroundColor:
                    viewManager === "job-rating" ? "#FF5353" : "",
                }}
              >
                {/* Button for navigating to the "rating" view */}
                Rating
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-final-review" });
                }}
                type="button"
                variant={
                  viewManager === "job-final-review" ? "contained" : "text"
                }
                fullWidth={true}
                style={{
                  borderColor:
                    viewManager === "job-final-review" ? "" : "#FF5353",
                  color:
                    viewManager === "job-final-review" ? "#FFFFFF" : "#FF5353",
                  backgroundColor:
                    viewManager === "job-final-review" ? "#FF5353" : "",
                }}
              >
                {/* Button for navigating to the "job-final-review" view */}
                Review
              </Button>
            </div>
          </div>
        )}
        {/* Conditional rendering of job-related components based on the current view */}
      <div className="m-4">
        {viewManager === "job-screening" && <JobScreening jobData={jobData} />}
        {viewManager === "job-grading" && <JobGrading jobData={jobData} />}
        {viewManager === "job-rating" && <JobRating jobData={jobData} />}
        {viewManager === "job-final-review" && (
          <JobFinalReview jobData={jobData} />
        )}
        {viewManager === "job-edit" && (
          <JobEditForm jobData={jobData} onSave={handleSaveJobEdit} />
        )}
      </div>
    </>
  );
};

export default JobManagerView;
