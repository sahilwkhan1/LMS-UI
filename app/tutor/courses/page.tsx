"use client";
import DashboardHero from "@/app/components/Tutor/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import TutorSidebar from "../../components/Tutor/sidebar/TutorSidebar";
import AllCourses from "../../components/Tutor/Course/AllCourses";
import TutorProtected from "@/app/hooks/tutorProtected";

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
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <TutorSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllCourses />
          </div>
        </div>
      </TutorProtected>
    </div>
  );
};

export default page;
