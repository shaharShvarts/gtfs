import "dotenv/config";
import slack from "@slack/bolt";

const GtfsBot = async (environment, testResult) => {
  const hasAllPassed = testResult.length === 0; // Checking if array is empty

  const app = new slack.App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
  });

  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_CHANNEL,
      text: hasAllPassed
        ? `*GTFS passed QA in ${environment.toUpperCase()}* ✅`
        : `*GTFS failed QA in ${environment.toUpperCase()}* ❌ 
        Here are the results:`,
    });
  } catch (error) {
    return error.message;
  }

  if (!hasAllPassed) {
    for (const results of testResult) {
      const blocks = [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${JSON.stringify(results, null, 2)}`,
          },
        },
      ];

      try {
        await app.client.chat.postMessage({
          token: process.env.SLACK_BOT_TOKEN,
          channel: process.env.SLACK_CHANNEL,
          text: "Gtfs test result",
          blocks,
        });
      } catch (error) {
        return error.message;
      }
    }
  }

  return "The message has been successfully sent to Slack.";
};

export default GtfsBot;
