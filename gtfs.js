import Help from "./utils/help.js";
import GetParams from "./src/getParams.js";
import TestValidNames from "./utils/testValidNames.js";
import WriteResults from "./utils/writeResults.js";
import GtfsBot from "./src/gtfsBot.js";
import GetServices from "./src/getServices.js";

(async () => {
  const [node, script, ...params] = process.argv;
  if (params.find((val) => val == "-h" || val == "--help")) {
    return console.log(Help("suburban_cities"));
  }

  const [baseEnvironment, environment, authorization] = GetParams(params) || [];
  if (!baseEnvironment) return;

  const Services = GetServices(baseEnvironment);

  // const services = [
  //   {
  //     serviceName: "train_stations",
  //     endpoint: `${baseEnvironment}/api_gateway/station_service/train_stations/me`,
  //     entry: "train_stations",
  //     condition: "stop_name",
  //     fields: ["stop_code", "stop_id", "stop_lon", "stop_lat", "stop_name"],
  //   },
  //   {
  //     serviceName: "suburban_cities",
  //     endpoint: `${baseEnvironment}/profiles/suburbanResidentCities`,
  //     entry: "suburbanResidentCities",
  //     condition: "name_trans",
  //     fields: ["id", "name", "name_trans"],
  //   },
  // ];

  let testResult = [];
  for (const service of Services) {
    const { hasPassed, serviceName, invalid_names } = await TestValidNames(
      service,
      authorization
    );

    if (!hasPassed) {
      testResult.push({ [serviceName]: invalid_names });
      WriteResults(environment, serviceName, invalid_names);
    }
  }

  // const test = await GtfsBot(environment, testResult);
  // console.error(test);

  console.log("done");
})();
