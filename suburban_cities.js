import "dotenv/config";
import WriteResults from "./utils/writeResults.js";
import Gtfs from "./utils/gtfsRequest.js";
import GetParams from "./utils/getParams.js";
import RegexTest from "./utils/regexTest.js";
const hebRegex = new RegExp("^[\u0590-\u05FF 0-9'-/].*$");

(async () => {
  const [node, script, ...params] = process.argv;
  const [baseUrl, env, authorization, info] = GetParams(params);

  if (info) return console.log(info);
  if (!authorization)
    return console.log(
      "The authorization is not present or has not been provided."
    );

  const invalid_names = {};
  const url = `${baseUrl}/profiles/suburbanResidentCities`;
  try {
    for (const test of RegexTest) {
      const language = test.lang;
      const regex = new RegExp(test.regex);

      const gtfs = await Gtfs(url, language, authorization);
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
  } catch (err) {
    if (err) throw err;
  }

  const result = {
    environment: `${env}`,
    suburbanResidentCities: invalid_names,
  };

  WriteResults("./response/suburban_cities", env, result);
})();
