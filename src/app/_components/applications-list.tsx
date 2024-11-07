import { Client, cacheExchange, fetchExchange, gql } from "@urql/core";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const client = new Client({
  url: "https://grants-stack-indexer-v2.gitcoin.co/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      "content-type": "application/json",
    },
  },
});

const APPLICATIONS_QUERY = gql`
  query MyQuery {
    applications(
      first: 10
      orderBy: CREATED_AT_BLOCK_DESC
      filter: {
        createdByAddress: {
          equalTo: "0xf3002e97f5ba36bd219c5cb41e6104cff114e351"
        }
      }
    ) {
      anchorAddress
      status
      createdByAddress
      metadata
    }
  }
`;

export async function ApplicationsList() {
  const applications = await client
    .query(APPLICATIONS_QUERY, {})
    .toPromise()
    .then((r) =>
      Object.values(
        r.data.applications.reduce(
          (acc, x) => ({
            ...acc,
            [x.metadata.application.project.id]: x,
          }),
          {},
        ),
      ),
    );

  console.log(applications);

  return (
    <div>
      {applications.map((application) => {
        const { project } = application.metadata.application;
        return (
          <div key={application.id} className="flex items-center gap-2">
            <Avatar className="size-16">
              <AvatarImage src={`https://${project.logoImg}.ipfs.dweb.link`} />
              <AvatarFallback>{project.title}</AvatarFallback>
            </Avatar>
            <h3 className="underline">{project.title}</h3>
            <pre>
              {JSON.stringify(
                application.metadata.application.project,
                null,
                2,
              )}
            </pre>
          </div>
        );
      })}
    </div>
  );
}
