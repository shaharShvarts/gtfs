import GetParams from "./src/getParams.js";
import TestValidNames from "./src/testValidNames.js";
import WriteResults from "./src/writeResults.js";
import GtfsBot from "./src/gtfsBot.js";
import GetServices from "./src/getServices.js";

(async () => {
  const [node, script, ...params] = process.argv;

  const [environment, authorization, serviceName] = GetParams(params) || [];
  if (!environment) return;

  const Services = GetServices(serviceName) || [];

  let testResult = [];
  for (const service of Services) {
    const { hasPassed, serviceName, invalid_names } =
      (await TestValidNames(environment, service, authorization)) || {};

    if (!serviceName) return;

    if (!hasPassed) {
      testResult.push({ [serviceName]: invalid_names });
      WriteResults(environment, serviceName, invalid_names);
    }
  }

  // const test = await GtfsBot(environment, testResult);
  // console.error(test);

  // console.log("done", testResult);
})();
