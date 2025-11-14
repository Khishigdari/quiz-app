"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useData } from "@/app/_providers/QuizProvider";
const QuizSaveLeave = () => {
  const router = useRouter();
  const { loading } = useData();

  const goToHomePage = () => {
    router.push("/");
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <Bookmark /> Save and leave
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-6">
          <AlertDialogHeader>
            <AlertDialogTitle>You are about to leave!</AlertDialogTitle>
            <p className="text=sm leading-5 text-[#B91C1C]">
              If you press 'Leave', you will leave this quiz.
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-between w-full">
            <AlertDialogCancel className="">Go back</AlertDialogCancel>
            <AlertDialogAction
              onClick={goToHomePage}
              // disabled={loading}
            >
              {/* {loading ? "Leaving quiz..." : "Save and leave"} */}
              Save and leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizSaveLeave;
