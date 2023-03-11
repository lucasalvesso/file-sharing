import { execa } from "execa";
import * as fs from "fs";

(async () => {
  try {
    await execa("git", ["checkout", "--orphan", "gh-pages"]);

    console.log("Building started...");
    await execa("npm", ["run", "build", "--prefix", "frontend"]);

    // Understand if it's dist or build folder
    const folderPath = "./frontend/dist";
    if (!fs.existsSync(folderPath)) {
      process.exit(1);
    }
    await execa("git", ["--work-tree", folderPath, "add", "--all"]);
    await execa("git", ["--work-tree", folderPath, "commit", "-m", "gh-pages"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    await execa("rm", ["-r", folderPath]);
    await execa("git", ["checkout", "-f", "master"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed, check your settings");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
