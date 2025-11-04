import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, ChevronLeft, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
const SummerizedContent = () => {
  return (
    <div>
      <div>
        <Link href={"/"}>
          <Button variant={"outline"} className="mb-6">
            <ChevronLeft />
          </Button>
        </Link>
      </div>

      <Card className="p-7">
        <CardHeader className="p-0">
          <div className="flex gap-2 items-center">
            <Sparkles />
            <CardTitle>Article Quiz Generator</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 p-0">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <BookOpen className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Summarized content
              </p>
            </div>
            <h3 className="text-6 leading-8 font-semibold">Title</h3>
            <p>
              Genghis Khan, born Temüjin around 1162, was the founder of the
              Mongol Empire. After his father's death, Temüjin's family was left
              in poverty, and he later killed his half-brother to secure his
              position. He built alliances with leaders like Jamukha and
              Toghrul, and despite being defeated in battle and briefly under
              the Jin dynasty, he rose to power by defeating rivals. By 1206,
              after overcoming the Naiman tribe and executing Jamukha, Temüjin
              became the undisputed ruler of the Mongol steppe, eventually
              leading a series of successful military campaigns that expanded
              his empire across China and Central Asia.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <FileText className="w-[11px] h-[13px]" />
              <p className="text-muted-foreground text-[14px] leading-5 font-semibold">
                Article Content
              </p>
            </div>
            <p>
              Genghis Khan[a] (born Temüjin; c. 1162 – August 1227), also known
              as Chinggis Khan,[b] was the founder and first khan of the Mongol
              Empire. After spending most of his life uniting the Mongol tribes,
              he launched a series of military campaigns, conquering large parts
              of China and Central Asia. Born between 1155 and 1167 and given
              the name Temüjin, he was the eldest child of Yesugei, a Mongol
              chieftain of the Borjigin clan, and his wife Hö'elün. When Temüjin
              was eight, his father died and his family was abandoned by its
              tribe. Reduced to near-poverty, Temüjin killed his older
              half-brother to secure his familial position. His charismatic
              personality helped to attract his first followers and to form
              alliances with two prominent steppe leaders named Jamukha and
              Toghrul; they worked together to retrieve Temüjin's newlywed wife
              Börte, who had been kidnapped by raiders. As his reputation grew,
              his relationship with Jamukha deteriorated into open warfare.
              Temüjin was badly defeated in c. 1187, and may have spent the
              following years as a subject of the Jin dynasty; upon reemerging
              in 1196, he swiftly began gaining power. Toghrul came to view
              Temüjin as a threat and launched a surprise attack on him in 1203.
              Temüjin retreated, then regrouped and overpowered Toghrul; after
              defeating the Naiman tribe and executing Jamukha, he was left as
              the sole ruler on the Mongolian steppe.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start p-0">
          <Link href={"/quiz"}>
            <Button type="submit" className="w-content">
              Take a quiz
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SummerizedContent;
