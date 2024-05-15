import "dotenv/config";
import Colors from "../utils/colors.js";
import { WebClient } from "@slack/web-api";

const GtfsBot = async (filePaths, env) => {
  // Checking if array is empty
  const hasAllPassed = !filePaths.length;

  const token = process.env.SLACK_BOT_TOKEN;
  const client = new WebClient(token);
  const channel_id = process.env.SLACK_CHANNEL_ID;

  try {
    const result = await client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel_id,
      text: hasAllPassed
        ? `*GTFS passed QA in ${env}* ✅`
        : `*GTFS failed QA in ${env}* ❌`,
    });
    console.log(result.message.text);

    if (!hasAllPassed) {
      for (const filePath of filePaths) {
        const result = await client.files.uploadV2({
          channel_id,
          file: filePath,
          filename: filePath.split("/").pop(),
        });
        console.log(result);
      }
    }
  } catch (error) {
    const num = error.message.split(`\n`).length;
    console.error(
      Colors.FgMagenta,
      `${error.stack.split("\n")[num]}
    ${error.message}`,
      Colors.Reset
    );
  }
};

export default GtfsBot;
