"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HomeSideBar from "../_components/home/HomeSideBar";
import { useState } from "react";
import { QuizProvider } from "../_providers/QuizProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <SidebarProvider className="bg-white" open={open} onOpenChange={setOpen}>
      <HomeSideBar open={open} />
      <main>
        <div>
          {!open ? (
            <div className="pt-18 px-4 h-screen border border-[#E4E4E7]">
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
