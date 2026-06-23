export default {
  "server/**/*.ts": () => ["tsc --noEmit -p server/tsconfig.json"],
  "client/**/*.ts": () => ["tsc --noEmit -p client/tsconfig.json"],
  "**/*.{css,json,js,ts}": ["prettier --write"],
};
