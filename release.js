const fs = require("fs");
const releaseFolder = "./";
const backendFolder = "./";
const executable =
  process.platform == "win32" ? "wdih.exe" : "wdih";
// const frontendFolder = "./static";

//backend
fs.copyFileSync(
  backendFolder + "/target/release/" + executable,
  releaseFolder + "/" + executable
);
