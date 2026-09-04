import * as esbuild from "esbuild"

await esbuild.build({
    entryPoints: ["src/server.ts"],
    outfile: "dist-server/server.js",
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node18",
    sourcemap: true,
    packages: "external",
    external: [],
})