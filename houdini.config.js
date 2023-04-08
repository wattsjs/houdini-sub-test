/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  watchSchema: {
    url: "https://api.betwatch.com/query",
    headers: {
      "X-Guest-Id": "abc123",
    },
  },
  plugins: {
    "houdini-svelte": {},
  },
  scalars: {
    Time: {
      type: "Date",
      unmarshal(value) {
        return new Date(value);
      },
      marshal(value) {
        return value.getTime();
      },
    },
  },
};

export default config;
