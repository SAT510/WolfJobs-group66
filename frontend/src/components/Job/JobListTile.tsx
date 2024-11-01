import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { useApplicationStore } from "../../store/ApplicationStore";
import { useUserStore } from "../../store/UserStore";
import Bookmark from "../../../public/svg/Bookmark";

const JobListTile = (props: any) => {
  // const { data, action }: { data: Job; action: string | undefined } = props;
  const { data }: { data: Job } = props;
  let action = "view-more";

  const getMatchStatus = (job: Job) => {
    let matchStatus = {
      text: "Low Match",
      style: { backgroundColor: "#FF5757", color: "white" },
    };

    const skills = useUserStore((state) => state.skills);
    if (skills && job.requiredSkills) {
      const applicantSkillsArray = skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase());
      const requiredSkillsArray = job.requiredSkills
        .split(",")
        .map((skill) => skill.trim().toLowerCase());
      const isMatch = requiredSkillsArray.some((skill) =>
        applicantSkillsArray.includes(skill)
      );

      if (isMatch) {
        matchStatus = {
          text: "Match",
          style: { backgroundColor: "#00E000", color: "white" },
        };
      }
    }

    return matchStatus;
  };

  const [active, setActive] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useUserStore((state) => state.id);

  const userRole = useUserStore((state) => state.role);

  const applicationList: Application[] = useApplicationStore(
    (state) => state.applicationList
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const temp: Application | undefined = applicationList.find(
      (item: Application) =>
        item.jobid === data._id && item.applicantid === userId
    );
    setApplication(temp || null);
    console.log("Found Application:", temp);
  }, [data, applicationList, userId]);

  const affilation = data.managerAffilication;
  const role = data.name;
  const jobType = data?.type?.split("-")?.join(" ");
  const pay = data.pay || "0";

  useEffect(() => {
    const id = searchParams.get("jobId");
    setActive(data._id === id);
  }, [searchParams]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setSearchParams({ jobId: data._id });
  };

  const getAffiliationTag = (tag: string) => {
    return tag.split("-").join(" ");
  };

  const getAffiliationColour = (tag: string) => {
    if (tag === "nc-state-dining") {
      return "bg-[#FF2A2A]/10";
    } else if (tag === "campus-enterprises") {
      return "bg-[#91B0FF]/10";
    } else if (tag === "wolfpack-outfitters") {
      return "bg-[#FBD71E]/10";
    }
    return "bg-[#FF2A2A]/10";
  };

  // const isClosed = data.status !== "0";

  const handleKnowMore = (e: any) => {
    e.stopPropagation();
    console.log("Know more");
  };
  const handleFillQuestionnaire = (e: any) => {
    e.stopPropagation();
    console.log("Fill Questionnaire");
  };
  const handleViewApplication = (e: any) => {
    e.stopPropagation();
    console.log("View Application");
  };

  const toggleBookmark = () => {
    setIsBookmarked(true);
  };

  return (
    <div className="my-3" onClick={handleClick}>
      <div
        className={`p-3 bg-white rounded-xl shadow-sm ${
          active ? "border-black" : "border-white"
        } border`}
      >
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 ">
              <div
                className={`w-fit ${getAffiliationColour(
                  affilation
                )} rounded-2xl px-3 py-0`}
              >
                <p className="inline text-xs " style={{ width: "fit-content" }}>
                  {getAffiliationTag(affilation).toUpperCase()}
                </p>
              </div>
              {userRole === "Applicant" && (
                <div
                  className={`ml-2 rounded-full   flex-0 px-3 py-0`}
                  style={getMatchStatus(data).style}
                >
                  <p className="inline text-xs">{getMatchStatus(data).text}</p>
                </div>
              )}
              <a
                className="mr-3 flex-1 w-[2.0625rem] overflow-hidden md:w-auto items-end justify-end content-end"
                onClick={toggleBookmark}
              >
                <div className="flex justify-end ">
                  <Bookmark fill={isBookmarked ? "black" : "grey"} />
                </div>
              </a>
            </div>
            <div className="w-full">
              {/* style={{ flex:1,flexDirection: 'row', backgroundColor: "blue" }} */}

              <div className="flex flex-row justify-between">
                <div className="pl-2">
                  <p className="text-base">
                    <b>Role:</b> {role}
                  </p>

                  <p className="text-base">
                    <b>Job Status:</b>

                    <span
                      className={`${
                        data.status === "closed" ? "text-[#FF5353]" : ""
                      }`}
                    >
                      &nbsp;<span className="capitalize">{data.status}</span>
                    </span>
                  </p>

                  <p className="text-base">
                    <b>Type:</b> <span className="capitalize"> {jobType} </span>
                  </p>

                  <p className="text-base">
                    {userRole === "Applicant" &&
                      ((application !== null &&
                        application?.status === "accepted") ||
                      application?.status === "rejected" ? (
                        <span className="capitalize">
                          <b>Application Status:</b>&nbsp;{application?.status}
                        </span>
                      ) : (
                        <>
                          <b>Application Status:</b>&nbsp;"In Review"
                        </>
                      ))}
                  </p>
                </div>

                <div className="h-1"></div>

                <div className="flex flex-col text-right justify-end ">
                  <p className="text-3xl">{pay}$/hr</p>

                  <div className="h-1"></div>

                  <div className="flex text-right">
                    {action === "view-more" || !action ? (
                      <p
                        className="inline-flex items-center flex-row-reverse text-xs text-[#656565] inset-x-0"
                        onClick={handleKnowMore}
                      >
                        <HiOutlineArrowRight />
                        Know more&nbsp;
                      </p>
                    ) : (
                      <></>
                    )}

                    {action === "view-questionnaire" ? (
                      <p
                        className="inline-flex items-center flex-row-reverse text-xs text-[#00B633]"
                        onClick={handleFillQuestionnaire}
                      >
                        <HiOutlineArrowRight />
                        Fill Questionnaire&nbsp;
                      </p>
                    ) : (
                      <></>
                    )}

                    {action === "view-application" ? (
                      <p
                        className="inline-flex items-center flex-row-reverse text-xs text-[#656565]"
                        onClick={handleViewApplication}
                      >
                        <HiOutlineArrowRight />
                        View Application&nbsp;
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListTile;
