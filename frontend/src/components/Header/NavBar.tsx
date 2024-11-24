import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import NavBarItem from "./NavBarItem";
/**
 * NavBar Component
 *
 * Renders a navigation bar based on the user's login status and role.
 * - Displays different links depending on the user's role (`Applicant` or others).
 * - Shows notification counts for accepted and rejected applications if the user is an `Applicant`.
 *
 * Features:
 * - Dynamically fetches application notifications for `Applicant` users.
 * - Displays links for profile, resume upload, notifications, and logout.
 *
 * Dependencies:
 * - `useUserStore`: Custom hook to manage user authentication state and role.
 * - `axios`: For making API requests.
 * - `NavBarItem`: Subcomponent used to render individual navigation links.
 *
 * @component
 * @returns {JSX.Element} The NavBar UI.
 */

const NavBar = () => {
  // Get the user's login status and role from the user store.
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const role = useUserStore((state) => state.role);
  // State for tracking notification count.
  const [notificationCount, setNotificationCount] = useState(0);
  /**
   * useEffect hook
   *
   * Runs when `isLoggedIn` or `role` changes. If the user is logged in and has the
   * role of `Applicant`, it fetches application data from the server and calculates
   * the number of accepted and rejected applications.
   */
  useEffect(() => {
    if (isLoggedIn && role === "Applicant") {
      axios
        .get("http://localhost:8000/api/v1/users/fetchapplications")
        .then((res) => {
          if (res.status === 200) {
            const applications = res.data.application;
            // Calculate the count of accepted applications.
            const acceptedCount = applications.filter(
              (app: { status: string; }) => app.status === "accepted"
            ).length;
            // Calculate the count of rejected applications.
            const rejectedCount = applications.filter(
              (app: { status: string; }) => app.status === "rejected"
            ).length;
            // Update the notification count state.
            setNotificationCount(acceptedCount + rejectedCount);
          }
        })
        .catch((error) => {
          console.error("Error fetching applications:", error);
        });
    }
  }, [isLoggedIn, role]);
   /**
   * Render the navigation bar UI.
   * - Displays links based on the user's login status and role.
   * - Shows notification count for `Applicant` users.
   */

  return (
    <>
      <div className="relative items-center hidden ml-auto lg:flex">
        <nav className="text-sm font-semibold leading-6 text-slate-700 ">
          <ul className="flex space-x-8">
            {/* Profile link for logged-in users */}
            {isLoggedIn && <NavBarItem link="/profile" text="Profile" />}
            {/* Resume upload link for Applicant users */}
            {isLoggedIn && role == "Applicant" && (
              <NavBarItem link="/resume" text="Upload Resume" />
            )}
            {/* Notifications link for Applicant users with notification count */}
            {isLoggedIn && role === "Applicant" && (
              <NavBarItem
                link="/notifications"
                text={`Notifications (${notificationCount})`}
              />
            )}
            {/* Logout link for logged-in users */}
            {isLoggedIn && <NavBarItem link="/logout" text="Log Out" />}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
