import Gtfs from "../src/gtfsRequest.js";
import RegexTest from "../utils/regexTest.js";
const hebRegex = new RegExp("^[\u0590-\u05FF 0-9'-/].*$");
const url = "https://api-test1.hopon.co/mot/profiles/suburbanResidentCities";

(async () => {
  const invalid_names = { suburbanResidentCities: {} };
  for (const test of RegexTest) {
    const language = test.lang;
    const regex = new RegExp(test.regex);

    const gtfs = await Gtfs(url, language);
    const suburbanResidentCities = gtfs.data.suburbanResidentCities;
    for (const city of suburbanResidentCities) {
      if (!regex.test(city.name_trans)) {
        if (!hebRegex.test(city.name_trans)) {
          !invalid_names.suburbanResidentCities[language] &&
            (invalid_names.suburbanResidentCities[language] = []);
          invalid_names.suburbanResidentCities[language].push({
            city_id: city.id,
            city_name: city.name,
            city_name_trans: city.name_trans,
          });
        }
      }
    }
    !invalid_names.suburbanResidentCities[language] &&
      (invalid_names.suburbanResidentCities[language] = "Passed QA");
  }

  console.table(JSON.stringify(invalid_names));
})();
