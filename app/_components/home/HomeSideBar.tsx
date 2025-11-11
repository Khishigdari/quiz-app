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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
};

const HomeSideBar = ({ open }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const getArticles = async () => {
    setLoading(true);
    const result = await axios.get("/api/summarizer");
    const data = await result.data;
    // console.log(data);
    console.log(data.articles, "data");
    setArticles(data.articles);
    setLoading(false);
  };
  // console.log(articles, " articles");
  useEffect(() => {
    getArticles();
  }, []);

  // const goToHistory = () => {
  //   router.push("/history");
  // };

  const handleSelectedArticle = (id: number) => {
    setSelectedId(id);
    router.push(`/history?id=${id}`);
  };

  const selectedArticle = articles.find((article) => article.id === Number(id));

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
          <SidebarGroupContent className="overflow-y-auto">
            <SidebarMenu>
              {articles?.map((article) => {
                // console.log("AAA", article);
                return (
                  <SidebarMenuItem key={article.id}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => handleSelectedArticle(article.id)}
                      className={`cursor-pointer ${
                        selectedArticle?.id === article.id
                          ? "bg-gray-100 font-semibold"
                          : ""
                      }`}
                    >
                      <span className="cursor-default truncate">
                        {article.title}
                      </span>
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
