import "dotenv/config";
import Help from "./utils/help.js";
import Gtfs from "./utils/gtfsRequest.js";
import GetParams from "./utils/getParams.js";
import RegexTest from "./utils/regexTest.js";
import WriteResults from "./utils/writeResults.js";

(async () => {
  const [node, script, ...params] = process.argv;
  if (params.find((val) => val == "-h" || val == "--help")) {
    return console.log(Help("suburban_cities"));
  }

  try {
    const [baseUrl, env, authorization] = GetParams(params) || [];
    if (!baseUrl || !authorization) return;

    const invalid_names = {};
    const hebRegex = RegexTest.find((entry) => entry.lang === "he").regex;
    const endpoint = `${baseUrl}/profiles/suburbanResidentCities`;
    for (const test of RegexTest) {
      const { lang, regex } = test;
      const gtfs = await Gtfs(endpoint, lang, authorization);
      if (!gtfs) return;
      const suburbanResidentCities = gtfs.data.suburbanResidentCities;
      for (const city of suburbanResidentCities) {
        if (!regex.test(city.name_trans)) {
          if (!hebRegex.test(city.name_trans)) {
            !invalid_names[lang] && (invalid_names[lang] = []);
            invalid_names[lang].push({
              city_id: city.id,
              city_name: city.name,
              city_name_trans: city.name_trans,
            });
          }
        }
      }
      !invalid_names[lang] && (invalid_names[lang] = "Passed QA");
    }
    WriteResults(
      "./response/suburban_cities",
      env,
      invalid_names,
      "suburbanResidentCities"
    );
  } catch (err) {
    console.log(err);
  }
})();
