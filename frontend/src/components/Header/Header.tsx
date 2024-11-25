/**
 * Header Component
 * 
 * The `Header` component is a React functional component that renders the application's header.
 * It includes a sticky navigation bar, dynamically displays menu items based on the user's role and login state, 
 * and integrates with the `useUserStore` state management system.
 *
 * @component
 * @returns {JSX.Element} The header section of the application.
 */
import { useUserStore } from "../../store/UserStore";
import NavBar from "./NavBar";
import NavBarItem from "./NavBarItem";

const Header = () => {
   // Retrieve user's login state and role from the UserStore
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const role = useUserStore((state) => state.role);
  return (
    <>
    {/* Sticky top navigation bar with dynamic styling */}
      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white supports-backdrop-blur:bg-white/95">
        <div className="max-w-8xl mx-auto">
          {/* Header content */}
          <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 mx-4 lg:mx-0">
            <div className="relative flex items-center">
               {/* Logo linking to home or dashboard based on login status */}
              <a
                className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
                href={isLoggedIn ? "/dashboard" : "/"}
              >
                <img
                  alt="logo"
                  src="/images/wolfjobs-logo.png"
                  className="h-10 p-0"
                />
              </a>
              {/* Navigation menu items */}
              <ul className="ml-4 flex space-x-8">
                {/* Conditional rendering of items based on user role and login status */}
                {role == "Manager" && isLoggedIn && (
                  <NavBarItem link="/dashboard" text="My Listings" />
                )}
                {role == "Applicant" && isLoggedIn && (
                  <NavBarItem link="/dashboard" text="My Applications" />
                )}
                {role == "Applicant" && isLoggedIn && (
                  <div>
                    <NavBarItem link="/saved" text="Saved Applications" />
                  </div>
                )}
                {isLoggedIn && <NavBarItem link="/explore" text="All jobs" />}
              </ul>
              <NavBar />
              {/* Navigation bar with additional elements */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
