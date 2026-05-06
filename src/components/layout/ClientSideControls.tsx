"use client";

import dynamic from "next/dynamic";

const ChatBot = dynamic(() => import("./ChatBot").then(mod => mod.ChatBot), { ssr: false });
const BackToTop = dynamic(() => import("./BackToTop").then(mod => mod.BackToTop), { ssr: false });
const SmoothScroll = dynamic(() => import("./SmoothScroll").then(mod => mod.SmoothScroll), { ssr: false });

export const ClientSideControls = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SmoothScroll>
        {children}
      </SmoothScroll>
      <ChatBot />
      <BackToTop />
    </>
  );
};
