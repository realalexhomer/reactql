import ApolloClient from "apollo-client";
import createState from "./state";
import getCount from "@/queries/getCount";
import incrementCount from "@/mutations/incrementCount";
import { InMemoryCache } from "apollo-cache-inmemory";

const initializeApolloClient = () => {
  const cache = new InMemoryCache();
  const link = createState(cache);
  return new ApolloClient({
    cache,
    link,
  });
};

describe("getCount", () => {
  it("has a default count of 0", () => {
    const client = initializeApolloClient();
    expect(client.readQuery({query: getCount}))
      .toEqual(expect.objectContaining({ state: { count: 0, __typename: "State" } }));
    console.log(client.readQuery({query: getCount}));
  });
});

describe("incrementCount", () => {
  const client = initializeApolloClient();
  client.mutate({mutation: incrementCount})
    .then(result => {
      expect(result.toEqual(expect.objectContaining({ state: { count: 1, __typename: "State" } })));
    });
});
