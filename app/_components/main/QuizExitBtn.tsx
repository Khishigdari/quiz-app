"use client";
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
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
const QuizExitBtn = () => {
  const router = useRouter();

  const onExitQuiz = () => {
    // localStorage.removeItem("asnwer");
    router.push("summarized");
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"outline"} className="mb-6">
            <X />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-6">
          <AlertDialogHeader>
            <AlertDialogTitle>You are about to log out!</AlertDialogTitle>
            <p className="text=sm leading-5 text-[#B91C1C]">
              If you press 'Cancel', this quiz will restart from the beginning.
            </p>
          </AlertDialogHeader>
          {/* <div className="flex justify-between w-full"> */}
          <AlertDialogFooter className="flex justify-between w-full">
            <AlertDialogCancel className="">Go back</AlertDialogCancel>
            <AlertDialogAction onClick={onExitQuiz} className="">
              Cancel quiz
            </AlertDialogAction>
          </AlertDialogFooter>
          {/* </div> */}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizExitBtn;
