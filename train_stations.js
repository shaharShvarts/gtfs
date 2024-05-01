import "dotenv/config";
import Help from "./utils/help.js";
import Gtfs from "./utils/gtfsRequest.js";
import GetParams from "./utils/getParams.js";
import RegexTest from "./utils/regexTest.js";
import WriteResults from "./utils/writeResults.js";

(async () => {
  const [node, script, ...params] = process.argv;
  if (params.find((val) => val == "-h" || val == "--help")) {
    return console.log(Help("train_stations"));
  }

  try {
    const [baseUrl, env, authorization] = GetParams(params) || [];
    if (!baseUrl || !authorization) return;

    const invalid_names = {};
    const hebRegex = RegexTest.find((entry) => entry.lang === "he").regex;
    const endpoint = `${baseUrl}/api_gateway/station_service/train_stations/me`;
    for (const test of RegexTest) {
      const { lang, regex } = test;
      const gtfs = await Gtfs(endpoint, lang, authorization);
      if (!gtfs) return;
      const train_stations = gtfs.data.train_stations;
      for (const station of train_stations) {
        if (!regex.test(station.stop_name)) {
          if (!hebRegex.test(station.stop_name)) {
            !invalid_names[lang] && (invalid_names[lang] = []);
            invalid_names[lang].push({
              stop_code: station.stop_code,
              stop_id: station.stop_id,
              stop_lon: station.stop_lon,
              stop_lat: station.stop_lat,
              stop_name: station.stop_name,
            });
          }
        }
      }
      !invalid_names[lang] && (invalid_names[lang] = "Passed QA");
    }
    WriteResults("./response/train_stations", env, invalid_names);
  } catch (err) {
    console.log(err);
  }
})();
