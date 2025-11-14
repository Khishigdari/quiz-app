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
import { RotateCw } from "lucide-react";
import { useData } from "@/app/_providers/QuizProvider";

const QuizRestartBtn = () => {
  const { refetchQuizGenerator, loading } = useData();
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"}>
            <RotateCw /> Restart quiz
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-6">
          <AlertDialogHeader>
            <AlertDialogTitle>You are about to restart!</AlertDialogTitle>
            <p className="text=sm leading-5 text-[#B91C1C]">
              If you press 'Restart', this quiz will restart from the beginning.
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-between w-full">
            <AlertDialogCancel className="">Go back</AlertDialogCancel>
            <AlertDialogAction
              onClick={refetchQuizGenerator}
              disabled={loading}
            >
              {loading ? "Restarting quiz..." : "Restart quiz"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizRestartBtn;
