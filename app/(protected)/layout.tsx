"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HomeSideBar from "../_components/home/HomeSideBar";
import React, { useEffect, useState } from "react";
import { QuizProvider } from "../_providers/QuizProvider";
import { ArticleType } from "@/lib/types";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // console.log(user, "Clerkkkkkkkkkkkkkkk");
  // console.log(user.id, "useridddddddddddd");

  const getArticles = async () => {
    setLoading(true);
    const result = await axios.get("/api/summarizer");
    const data = await result.data;
    // console.log(data, "data");
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (!user) return;
    const createUser = async () => {
      try {
        await axios.post("/api/users", {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
        });
        const result = await axios.get("/api/users");
        // console.log(result, "get requesttttttt");
        // console.log(result.data.users);
      } catch (err) {
        console.error(err);
      }
    };
    createUser();
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  return (
    <SidebarProvider className="bg-white" open={open} onOpenChange={setOpen}>
      <HomeSideBar open={open} />
      <main>
        <div>
          {!open ? (
            <div
              className="pt-18 px-4 h-screen border border-[#E4E4E7]"
              onClick={getArticles}
            >
              <SidebarTrigger className="w-6 h-6" />
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
      <QuizProvider>{children}</QuizProvider>
    </SidebarProvider>
  );
}
