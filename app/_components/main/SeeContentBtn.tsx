import { useData } from "@/app/_providers/QuizProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const SeeContentBtn = () => {
  const {
    promptSummary,
    contentPrompt,
    titlePrompt,
    loading,
    refetchQuizGenerator,
  } = useData();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>See Content</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{titlePrompt}</DialogTitle>
            <DialogDescription className="text-[14px] leading-5 font-normal text-black">
              {contentPrompt}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
