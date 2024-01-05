"use client";
import React from "react";
import TutorSidebar from "../../components/Tutor/sidebar/TutorSidebar";
import Heading from "../../../app/utils/Heading";
import OrdersAnalytics from "../../components/Tutor/Analytics/OrdersAnalytics";
import DashboardHeader from '../../../app/components/Tutor/DashboardHeader';
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
          <OrdersAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
