/**
 * NoJobSelected component
 * 
 * This component is displayed when no job is selected. It shows a centered message 
 * indicating that there is nothing to show and prompts the user to select a job 
 * for more details. The component also includes an icon to visually reinforce the message.
 *
 * @returns {JSX.Element} The rendered JSX for the "No Job Selected" screen.
 */
const NoJobSelected = () => {
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div className="flex flex-col ">
          <div className="h-12 w-12 -m-1 mb-0">
            <img src="images/eva_slash-outline.svg" />
          </div>
          <div className="text-[#CBCBCB]">Nothing to show!</div>
          <div className="text-[#CBCBCB]">Select a job for more details</div>
        </div>
      </div>
    </>
  );
};

export default NoJobSelected;
