import fs from "fs";
import "dotenv/config";
import Gtfs from "./utils/gtfsRequest.js";
import GetParams from "./utils/GetParams.js";
import RegexTest from "./utils/regexTest.js";
const hebRegex = new RegExp("^[\u0590-\u05FF 0-9'-/].*$");

(async () => {
  const [node, script, ...params] = process.argv;
  const [baseUrl, env, authorization, info] = GetParams(params);

  if (info) return console.log(info);
  if (!authorization) return console.log(baseUrl);

  const invalid_names = {};
  const url = `${baseUrl}/api_gateway/station_service/train_stations/me`;
  try {
    for (const test of RegexTest) {
      const language = test.lang;
      const regex = new RegExp(test.regex);

      const gtfs = await Gtfs(url, language, authorization);
      const train_stations = gtfs.data.train_stations;
      for (const station of train_stations) {
        if (!regex.test(station.stop_name)) {
          if (!hebRegex.test(station.stop_name)) {
            !invalid_names[language] && (invalid_names[language] = []);
            invalid_names[language].push({
              stop_code: station.stop_code,
              stop_id: station.stop_id,
              stop_lon: station.stop_lon,
              stop_lat: station.stop_lat,
              stop_name: station.stop_name,
            });
          }
        }
      }
      !invalid_names[language] && (invalid_names[language] = "Passed QA");
    }
  } catch (error) {
    console.log(error);
  }

  const result = {
    environment: `${env}`,
    train_stations: invalid_names,
  };

  fs.writeFile(
    `./response/train_stations/${env}.json`,
    JSON.stringify(result),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );
  console.log(JSON.stringify(result));
})();
