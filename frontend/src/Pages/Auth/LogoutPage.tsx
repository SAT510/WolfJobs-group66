/**
 * LogoutPage Component
 *
 * This component is responsible for handling the user logout process.
 * It clears user data from both local storage and the application state
 * via the `useUserStore` hook. After clearing the data, it redirects
 * the user to the login page.
 *
 * The `useEffect` hook ensures that this process occurs immediately
 * after the component mounts, meaning when the user navigates to the
 * `LogoutPage`.
 *
 * @component
 * @returns {JSX.Element} An empty JSX element (no UI is rendered).
 */
import { useEffect } from "react";
import { useUserStore } from "../../store/UserStore";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  // Accessing the state update functions from the user store
  const updateName = useUserStore((state) => state.updateName);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const updateRole = useUserStore((state) => state.updateRole);
  const updateDob = useUserStore((state) => state.updateDob);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updatePhonenumber = useUserStore((state) => state.updatePhonenumber);
  const updateId = useUserStore((state) => state.updateId);
  const updateAvailability = useUserStore((state) => state.updateAvailability);
  const updateGender = useUserStore((state) => state.updateGender);
  const updateHours = useUserStore((state) => state.updateHours);
  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);
  // Navigation hook to redirect the user after logout
  const navigate = useNavigate();
  useEffect(() => {
    // Clearing local storage to remove any persisted user data
    localStorage.clear();
    // Updating the user store to reset all user-related state to default values
    updateName("");
    updateAddress("");
    updateRole("");
    updateDob("");
    updateSkills("");
    updatePhonenumber("");
    updateId("");
    updateAvailability("");
    updateGender("");
    updateHours("");
    updateIsLoggedIn(false);
    // Redirecting the user to the login page after logout
    navigate("/login");
    // Logging out activity in the console for debugging purposes
    console.log("Logged out");
  }, []);
  // This component does not render any UI
  return <></>;
};

export default LogoutPage;
