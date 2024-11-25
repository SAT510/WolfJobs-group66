import { create } from "zustand";
/**
 * Type representing the state of the job list in the store.
 * This state contains a list of jobs that can be managed and updated.
 */
type JobState = {
  /**
   * An array of job objects that is the central piece of state for the store.
   * @type {Job[]}
   */
  jobList: Job[];
};
/**
 * Type representing the actions available in the job store.
 * Actions are functions that can update the state of the store.
 */
type JobAction = {
  /**
   * Updates the `jobList` state with a new list of jobs.
   * @param {Job[]} jobList - The new list of jobs to replace the existing job list.
   * @returns {void}
   */
  updateJobList: (name: JobState["jobList"]) => void;
};
/**
 * Zustand store for managing job-related state.
 * This store holds the list of jobs and provides an action to update that list.
 *
 * @returns {JobState & JobAction} The store with both the current state and actions.
 */
export const useJobStore = create<JobState & JobAction>()((set) => ({
  /**
   * The initial state of the store.
   * Starts with an empty job list.
   */
  jobList: [],
  /**
   * Action to update the job list in the store.
   * This method accepts a new list of jobs and updates the store's `jobList` state.
   *
   * @param {Job[]} jobList - The new job list to update the store with.
   */
  updateJobList: (jobList: Job[]) => {
    set(() => ({ jobList: jobList }));
  },
}));
