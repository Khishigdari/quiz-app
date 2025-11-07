"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArticleType } from "@/lib/types";
import axios from "axios";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
};

const HomeSideBar = ({ open }: Props) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const getArticles = async () => {
    setLoading(true);
    const result = await axios.get("/api/summarizer");
    const data = await result.data;
    console.log(data.articles.rows, "data");
    setArticles(data.articles.rows);
    setLoading(false);
  };
  console.log(articles, " articles");
  useEffect(() => {
    getArticles();
  }, []);

  const goToHistory = () => {
    router.push("/history");
  };

  return (
    <Sidebar className="z-10">
      <SidebarContent className="pt-14 bg-white">
        <SidebarGroup>
          <div className="flex justify-between items-center">
            <SidebarGroupLabel className="text-5 leading-7 font-semibold text-foreground">
              History
            </SidebarGroupLabel>
            {open ? <SidebarTrigger className="w-6 h-6" /> : ""}
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {articles?.map((article) => {
                console.log("AAA", article);
                return (
                  <SidebarMenuItem key={article.id}>
                    <SidebarMenuButton asChild onClick={goToHistory}>
                      {/* <a href={article.url}>
                    <item.icon /> */}
                      <span className="cursor-default">{article.title}</span>
                      {/* </a> */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSideBar;
