"use client";
import { type PropsWithChildren, useEffect } from "react";

function useMobileHeightFix() {
  useEffect(() => {
    function setHeight() {
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);
}

export function MobileLayoutFix({ children }: PropsWithChildren) {
  useMobileHeightFix();
  return (
    <div
      className="min-h-screen"
      // className={
      //   "flex min-h-screen flex-col justify-center bg-gray-100 font-mono"
      // }
    >
      <div
        // className="app container relative mx-auto flex h-screen max-w-md flex-col overflow-hidden bg-white md:rounded-xl md:shadow-2xl"
        style={{ maxHeight: 851, height: `calc(var(--vh, 1vh) * 100)` }}
      >
        {children}
      </div>
    </div>
  );
}
