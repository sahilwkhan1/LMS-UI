"use client";
import React from "react";
import Heading from "../utils/Heading";
import TutorSidebar from "../components/Tutor/sidebar/TutorSidebar";
import DashboardHero from "../components/Tutor/DashboardHero";
import TutorProtected from "../hooks/tutorProtected";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <TutorProtected>
        <Heading
          title="LMS - Tutor"
          description="LMS is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <TutorSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </TutorProtected>
    </div>
  );
};

export default page;
