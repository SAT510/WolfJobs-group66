import { useEffect, useState } from "react";
import JobDetailView from "../../components/Job/JobDetailView";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/UserStore";
import JobsListView from "../../components/Job/JobListView";

const Saved = () => {
  const userId = useUserStore((state) => state.id);
  const [filteredJobList, setFilteredJobList] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch saved jobs
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/users/saveJobList/${userId}`
        );
        if (res.status !== 200) {
          toast.error("Error fetching jobs");
          return;
        }

        res.data.data.sort((a: { jobDeadline: string }, b: { jobDeadline: string }) => new Date(a.jobDeadline).getTime() - new Date(b.jobDeadline).getTime());
          
        setFilteredJobList(res.data.data.filter((job: { saved: boolean; }) => job.saved === true));
      } catch (error) {
        toast.error("Error fetching jobs");
      }
    };

    fetchSavedJobs();
  }, [userId]); // Only re-run if userId changes

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
