import "dotenv/config";
import Help from "./utils/help.js";
import Gtfs from "./utils/gtfsRequest.js";
import GetParams from "./utils/getParams.js";
import RegexTest from "./utils/regexTest.js";
import WriteResults from "./utils/writeResults.js";
const hebRegex = new RegExp("^[\u0590-\u05FF 0-9'-/].*$");

(async () => {
  const [node, script, ...params] = process.argv;
  if (params.find((val) => val == "-h" || val == "--help")) {
    return console.log(Help("suburban_cities"));
  }

  try {
    const [baseUrl, env, authorization] = GetParams(params) || [];
    if (!baseUrl || !env || !authorization) return;

    const invalid_names = {};
    const url = `${baseUrl}/api_gateway/station_service/train_stations/me`;
    for (const test of RegexTest) {
      const language = test.lang;
      const regex = new RegExp(test.regex);

      const gtfs = await Gtfs(url, language, authorization);
      if (!gtfs) return;
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
    WriteResults("./response/train_stations", env, invalid_names);
  } catch (err) {
    console.log(err);
  }
})();
