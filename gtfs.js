import GtfsBot from "./src/gtfsBot.js";
import GetParams from "./src/getParams.js";
import GetServices from "./src/getServices.js";
import WriteResults from "./src/writeResults.js";
import TestValidNames from "./src/testValidNames.js";

(async () => {
  const [node, script, ...params] = process.argv;

  const [env, authorization, serviceName] = GetParams(params) || [];
  if (!authorization) return;

  const Services = GetServices(serviceName);
  if (!Services) return;

  const filePaths = [];
  const dirPath = `./response`;
  const fileType = ".json";
  for (const service of Services) {
    const { hasPassed, name, invalid_names } =
      (await TestValidNames(env, service, authorization)) || {};

    if (!name) return;

    if (!hasPassed) {
      const fileName = `${env}-${name}${fileType}`;
      const fullPath = `${dirPath}/${fileName}`;
      filePaths.push(fullPath);
      WriteResults(dirPath, fullPath, env, name, invalid_names);
    }
  }

  if (!serviceName) {
    await GtfsBot(filePaths, env);
  }

  console.log("done");
})();
