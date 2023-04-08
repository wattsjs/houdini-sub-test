import { HoudiniClient, subscription } from "$houdini";
import { createClient } from "graphql-ws";

export default new HoudiniClient({
  url: "https://api.betwatch.com/query",
  fetchParams({ session }) {
    return {
      headers: {
        "X-Guest-Id": "abc123",
      },
    };
  },
  plugins: [
    subscription(() =>
      createClient({
        url:
          import.meta.env.VITE_GRAPHQL_WS_ENDPOINT ||
          "wss://api.betwatch.com/sub",
        keepAlive: 10000,
        shouldRetry: () => true,
        retryAttempts: 10,
        connectionParams: async () => {
          return {
            apiKey: "1ef0ffd6-67be-4f72-aae9-5c49b9f9c39b",
          };
        },
      })
    ),
  ],
});
