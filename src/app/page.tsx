import { HydrateClient } from "~/trpc/server";
import { ApplicationsList } from "./_components/applications-list";

export default async function Home() {
  return (
    <HydrateClient>
      <ApplicationsList />
    </HydrateClient>
  );
}
