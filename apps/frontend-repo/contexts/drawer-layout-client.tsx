'use client'
import React from "react";
import { DrawerContextProvider } from "./drawer-context";

const DrawerLayoutClient = ({children }: { children: React.ReactNode}) => {
  return <DrawerContextProvider>{children}</DrawerContextProvider>;
}

export default DrawerLayoutClient;