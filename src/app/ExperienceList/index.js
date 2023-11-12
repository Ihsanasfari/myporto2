import React from "react";
import experienceData from "/public/data/experienceData.json";
const ExperienceList = () => {
  return (
    <div className="flex flex-col w-full lg:w-3/5 lg:px-0">
      <h2 className="text-4xl font-semibold pb-8">Experience</h2>
      {experienceData.map((data) => {
        return (
          <>
            <hr className="h-[2px] my-2 bg-primary3 border-0 " />
            <div className="py-4 flex gap-8">
              <span className="font-semibold">{data.year}</span>
              <div className="flex flex-col gap-4 w-3/5 ">
                <span className="text-2xl font-bold">{data.role}</span>
                <span className="font-medium opacity-90">
                  {data.experienceName}
                </span>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ExperienceList;
