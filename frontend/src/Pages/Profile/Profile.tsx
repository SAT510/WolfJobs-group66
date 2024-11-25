/* eslint-disable @typescript-eslint/no-explicit-any */

// import CreateIcon from '@mui/';
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useUserStore } from "../../store/UserStore";
import { useState } from "react";
import ProfileEdit from "./ProfileEdit";
/**
 * Profile component that displays user profile information.
 *
 * The component retrieves user profile data from a global store using the `useUserStore` hook.
 * It displays the user's information in a non-editable format by default and allows the user to
 * switch to an edit mode where they can update their profile via the `ProfileEdit` component.
 *
 * @returns {JSX.Element} The Profile component with user data and edit functionality.
 */
const Profile = () => {
  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const unityid = useUserStore((state) => state.unityid);
  const studentid = useUserStore((state) => state.studentid);
  const address = useUserStore((state) => state.address);
  const role = useUserStore((state) => state.role);
  const skills = useUserStore((state) => state.skills);
  const projects = useUserStore((state) => state.projects);
  const experience = useUserStore((state) => state.experience);
  const phonenumber = useUserStore((state) => state.phonenumber);
  const affiliation = useUserStore((state) => state.affiliation);
  const availability = useUserStore((state) => state.availability);
  const gender = useUserStore((state) => state.gender);
  const hours = useUserStore((state) => state.hours);
  const resume = useUserStore((state) => state.resume);
  // Define the width for the profile card.
  const widthCard = "700px";
  // State to toggle between edit and view mode.
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center bg-gray-50 "
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div
          className="flex flex-col p-4 py-4 pb-20 m-6 mx-10 overflow-y-scroll bg-white rounded-xl"
          style={{ width: `${widthCard}` }}
        >
          <div
            className="relative h-0"
            style={{ left: `calc(${widthCard} - 60px)`, top: "9px" }}
          >
            {editMode ? (
              <AiOutlineClose
                onClick={(e: any) => {
                  e.preventDefault();
                  setEditMode(false);
                }}
              />
            ) : (
              <BiSolidPencil
                onClick={(e: any) => {
                  e.preventDefault();
                  setEditMode(true);
                }}
              />
            )}
          </div>
          <div className="my-2 text-xl border-b">Profile</div>
          {!editMode && (
            <>
              <div>
                <span className="text-lg">Name: </span>
                <span className="text-gray-500">{name || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Email: </span>
                <span className="text-gray-500">{email || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Unityid: </span>
                <span className="text-gray-500">{unityid || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Studentid: </span>
                <span className="text-gray-500">{studentid || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Role: </span>
                <span className="text-gray-500">{role || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Skills: </span>
                <span className="text-gray-500">{skills || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Projects: </span>
                <span className="text-gray-500">{projects || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Experience: </span>
                <span className="text-gray-500">{experience || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Address: </span>
                <span className="text-gray-500">{address || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Phone Number: </span>
                <span className="text-gray-500">{phonenumber || " -- "}</span>
              </div>
              {!!affiliation && (
                <div>
                  <span className="text-lg">Affiliation: </span>
                  <span className="text-gray-500">
                    {affiliation || " -- "}{" "}
                  </span>
                </div>
              )}
              <div>
                <span className="text-lg">Availability: </span>
                <span className="text-gray-500">{availability || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Gender: </span>
                <span className="text-gray-500">{gender || " -- "}</span>
              </div>
              <div>
                <span className="text-lg">Resume: </span>
                <span className="text-gray-500">{resume || " -- "}</span>
              </div>
              {/* <div>
                <span className="text-lg">Hours: </span>
                <span className="text-gray-500">{hours || " -- "}</span>
              </div> */}
            </>
          )}
          {editMode && (
            <ProfileEdit
              props={{
                name,
                email,
                unityid,
                studentid,
                address,
                role,
                skills,
                projects,
                experience,
                phonenumber,
                affiliation,
                availability,
                gender,
                hours,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
