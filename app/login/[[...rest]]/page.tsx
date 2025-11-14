"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  console.log("rendering");
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <SignIn />
    </div>
  );
};

export default Page;
