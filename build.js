const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/app.js"],
    bundle: true,
    external: ["angular", "angularLoad"], // Mark angular and angularLoad as external
    outfile: "01JHU_INST-JHU/js/custom.js", // Output file
  })
  .catch(() => process.exit(1));
