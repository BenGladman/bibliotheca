import path from "node:path";
import { createServer, isRunnableDevEnvironment } from "vite";

async function main() {
  const server = await createServer({
    appType: "custom",
    environments: {
      nodeRunnerEnv: {},
    },
  });

  const env = server.environments.nodeRunnerEnv;

  if (!isRunnableDevEnvironment(env)) {
    console.error("Vite environment is not runnable.");
    process.exit(1);
  }

  const scriptPath = path.join(import.meta.dirname, process.argv[2]);
  await env.runner.import(scriptPath);
  process.exit(0);
}

main();
