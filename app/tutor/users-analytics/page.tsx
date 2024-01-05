"use client";
import React from "react";
import TutorSidebar from "../../components/Tutor/sidebar/TutorSidebar";
import Heading from '../../utils/Heading';
import DashboardHeader from '../../components/Tutor/DashboardHeader';
import UserAnalytics from '../../../app/components/Tutor/Analytics/UserAnalytics';
import DashboardHero from '@/app/components/Tutor/DashboardHero';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="LMS - Tutor"
        description="LMS is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <TutorSidebar />
        </div>
        <div className="w-[85%]">
          {/* <DashboardHeader /> */}
          <DashboardHero />
          <UserAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
