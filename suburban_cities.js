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

  const [baseUrl, env, authorization] = GetParams(params) || [];
  if (!baseUrl || !env || !authorization) return;

  const invalid_names = {};
  const url = `${baseUrl}/profiles/suburbanResidentCities`;
  try {
    for (const test of RegexTest) {
      const language = test.lang;
      const regex = new RegExp(test.regex);

      const gtfs = await Gtfs(url, language, authorization);
      if (!gtfs) return;
      const suburbanResidentCities = gtfs.data.suburbanResidentCities;
      for (const city of suburbanResidentCities) {
        if (!regex.test(city.name_trans)) {
          if (!hebRegex.test(city.name_trans)) {
            !invalid_names[language] && (invalid_names[language] = []);
            invalid_names[language].push({
              city_id: city.id,
              city_name: city.name,
              city_name_trans: city.name_trans,
            });
          }
        }
      }
      !invalid_names[language] && (invalid_names[language] = "Passed QA");
    }
    WriteResults("./response/suburban_cities", env, invalid_names);
  } catch (err) {
    console.log(err);
  }
})();
