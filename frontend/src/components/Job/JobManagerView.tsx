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

const JobManagerView = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const role = useUserStore((state) => state.role);
  const userId = useUserStore((state) => state.id);

  const [searchParams, setSearchParams] = useSearchParams();
  const [viewManager, setViewManager] = useState("job-screening");

  useEffect(() => {
    const jobManager: string = searchParams.get("view") || "job-screening";
    setViewManager(jobManager);
  }, [searchParams, jobData]);

  const handleCloseJob = (e: any) => {
    e.preventDefault();
    console.log("Close job");

    const body = {
      jobid: jobData._id,
    };

    axios
      .post("http://localhost:8000/api/v1/users/closejob", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to apply");
          return;
        }
        toast.success("Job closed");
        location.reload();
      });
  };
  const handleDeleteJob = (e: any) => {
    e.preventDefault();
    console.log("Delete job");

    const body = {
      jobid: jobData._id,
    };

    axios
      .delete("http://localhost:8000/api/v1/users/deletejob", { data: body })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to delete job");
          return;
        }
        toast.success("Job deleted");
        location.reload();
      })
      .catch((err) => {
        toast.error("Error deleting job");
      });
  };

  const JobEditForm = ({ jobData, onSave }: any) => {
    const [formData, setFormData] = useState({
      name: jobData.name,
      description: jobData.description,
      type: jobData.type,
      location: jobData.location,
      requiredSkills: jobData.requiredSkills,
      pay: jobData.pay,
    });

    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = (e: any) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
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

  const handleSaveJobEdit = (updatedData: any) => {
    const body = {
      jobid: jobData._id,
      ...updatedData,
    };

    axios
      .put("http://localhost:8000/api/v1/users/editjob", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to update job");
          return;
        }
        toast.success("Job updated");
        setViewManager("job-screening");
      })
      .catch((err) => {
        toast.error("Error updating job");
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
                Edit Job
              </Button>
            </div>
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
                Review
              </Button>
            </div>
          </div>
        )}
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
