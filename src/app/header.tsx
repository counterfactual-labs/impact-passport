"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";
import { ConnectKitButton } from "connectkit";
import { useIsFetching } from "@tanstack/react-query";
import { Compass, UserIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export function Header() {
  const isFetching = useIsFetching();
  return (
    <>
      <header className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <Link href={`/`} className="mr-8">
            <div className="relative -top-0.5 mr-1">
              <Compass
                className={cn("text-primary-900 absolute left-0 top-0 h-4 w-4")}
              />
              <Compass
                className={cn("h-4 w-4 transition-colors", {
                  ["text-primary-400 animate-ping"]: isFetching,
                })}
              />
            </div>
          </Link>
          {/* <NavLink href={`/projects`}>View Projects</NavLink>
          <NavLink href={`/projects/create`}>Create Project</NavLink> */}
        </div>
        <ConnectKitButton.Custom>
          {({ isConnected, isConnecting, show }) => {
            if (isConnected) {
              return (
                <Button
                  variant="outline"
                  size="icon"
                  icon={UserIcon}
                  onClick={show}
                  className="overflow-hidden rounded-full"
                />
              );
            }
            return (
              <Button
                disabled={isConnecting}
                onClick={show}
                variant="secondary"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            );
          }}
        </ConnectKitButton.Custom>
      </header>
    </>
  );
}

function NavLink({ href, children }: PropsWithChildren<{ href: string }>) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <Button variant="link" className={cn({ ["underline"]: isActive })}>
        {children}
      </Button>
    </Link>
  );
}
