/**
 * Saved Component
 *
 * This component displays a list of jobs that the user has saved. It fetches the saved jobs from 
 * an API endpoint and sorts them by the job deadline, then filters out the jobs that are marked as saved.
 * 
 * It includes:
 * - Fetching saved jobs from the API.
 * - Displaying a list of saved jobs with the `JobsListView` component.
 * - Displaying detailed information of a selected job using the `JobDetailView` component.
 *
 * @component
 * @example
 * return (
 *   <Saved />
 * )
 */
import { useEffect, useState } from "react";
import JobDetailView from "../../components/Job/JobDetailView"; // Job details component
import axios from "axios"; // HTTP client for API requests
import { toast } from "react-toastify"; // Notification library for error messages
import { useUserStore } from "../../store/UserStore"; // Custom store hook to access the user's data
import JobsListView from "../../components/Job/JobListView"; // Component to display the list of jobs
/**
 * Saved Component Function
 * 
 * This function component fetches the list of jobs saved by the user, sorts them by deadline, 
 * and passes the filtered job list to the `JobsListView` component. It also renders the `JobDetailView` 
 * component to show detailed information of a selected job.
 */
const Saved = () => {
  // Accessing the userId from the custom store hook
  const userId = useUserStore((state) => state.id);
  // State to store the list of filtered jobs that are saved
  const [filteredJobList, setFilteredJobList] = useState<Job[]>([]);

  useEffect(() => {
    /**
     * Fetches the saved jobs for the current user from the API.
     * Sorts the jobs by the deadline and filters out the jobs that are saved.
     * Displays an error toast if there is an issue with the API request.
     */
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/users/saveJobList/${userId}`
        );
        // If the request fails (status code other than 200), display an error message
        if (res.status !== 200) {
          toast.error("Error fetching jobs");
          return;
        }
        // Sort the jobs by their deadline in ascending order
        res.data.data.sort(
          (a: { jobDeadline: string }, b: { jobDeadline: string }) =>
            new Date(a.jobDeadline).getTime() -
            new Date(b.jobDeadline).getTime()
        );
        // Filter and update the state with the saved jobs
        setFilteredJobList(
          res.data.data.filter((job: { saved: boolean }) => job.saved === true)
        );
      } catch (error) {
        // Show error if the API request fails
        toast.error("Error fetching jobs");
      }
    };
    // Call the function to fetch saved jobs on component mount and when userId changes
    fetchSavedJobs();
  }, [userId]); // Re-run the effect only if userId changes

  return (
    <>
      <div className="content bg-slate-50">
        <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
          {/* Pass the saved jobs to the JobsListView */}
          <JobsListView
            jobsList={filteredJobList}
            title={"Saved Applications"}
          />
          <JobDetailView />
        </div>
      </div>
    </>
  );
};

export default Saved;
