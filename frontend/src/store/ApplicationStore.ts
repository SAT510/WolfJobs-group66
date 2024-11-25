import { create } from "zustand";
// Type definition for the application state in the store
/**
 * Represents the state of the application store.
 *
 * @typedef {Object} ApplicationState
 * @property {Application[]} applicationList - The list of applications stored in the state.
 */
type ApplicationState = {
  applicationList: Application[];
};
// Type definition for the actions that can modify the application state
/**
 * Represents the actions available in the application store.
 *
 * @typedef {Object} ApplicationAction
 * @property {Function} updateApplicationList - A function to update the application list in the state.
 */
type ApplicationAction = {
  updateApplicationList: (name: ApplicationState["applicationList"]) => void;
};
// Zustand store for managing the application state
/**
 * A Zustand store that manages the application list state and provides actions to update it.
 *
 * This store contains:
 * - `applicationList`: The state representing the list of applications.
 * - `updateApplicationList`: A function to update the `applicationList` state.
 *
 * @returns {ApplicationState & ApplicationAction} The current state and actions to update it.
 */
export const useApplicationStore = create<
  ApplicationState & ApplicationAction
>()((set) => ({
  applicationList: [],
  /**
   * Action to update the application list in the store.
   *
   * This function is called to replace the current application list with a new one.
   *
   * @param {Application[]} applicationList - The new list of applications to be set in the state.
   */
  updateApplicationList: (applicationList: Application[]) => {
    set(() => ({ applicationList: applicationList }));
  },
}));
