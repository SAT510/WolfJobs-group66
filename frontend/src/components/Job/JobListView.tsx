import { useEffect } from "react";
import JobListTile from "./JobListTile";
/**
 * `JobsListView` component to render a list of jobs with a title.
 * This component accepts a list of jobs and a title as props, and it displays each job
 * using the `JobListTile` component. It also logs the list of jobs to the console every time it changes.
 *
 * @param {Object} props - The component's props.
 * @param {Array<Job>} props.jobsList - The list of jobs to display.
 * @param {string} [props.title="All jobs"] - The title to display above the list of jobs. Defaults to "All jobs".
 *
 * @returns {JSX.Element} The rendered JSX component displaying the list of jobs.
 */
const JobsListView = (props: any) => {
  const { jobsList, title } = props;
  // Log the jobsList whenever it changes
  useEffect(() => {
    console.log(jobsList);
  }, [jobsList]);

  return (
    <>
      <div className="w-4/12 bg-white/60 overflow-y-scroll overflow-x-hidden pt-2 px-9">
        <div className="text-2xl py-4">{title || "All jobs"}</div>
        {jobsList?.map((job: Job) => {
          return <JobListTile data={job} key={job._id} />;
        })}
      </div>
    </>
  );
};

export default JobsListView;
