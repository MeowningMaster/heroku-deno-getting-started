const DEFAULT_PORT = 8080;
const envPort = Deno.env.get("PORT");
export const port = envPort ? Number(envPort) : DEFAULT_PORT;
if (isNaN(port)) {
  console.error("Port is not a number.");
  Deno.exit(1);
}