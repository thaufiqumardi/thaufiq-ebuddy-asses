'use client'
import React from "react";
import { DrawerContextProvider } from "@contexts/drawer-context";

const DashboardTemplate = ({children }: { children: React.ReactNode}) => {
  return <DrawerContextProvider>{children}</DrawerContextProvider>;
}

export default DashboardTemplate;