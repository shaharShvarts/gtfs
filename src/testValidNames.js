import Gtfs from "./gtfsRequest.js";
import RegexTest from "../utils/regexTest.js";
import Colors from "../utils/colors.js";

const TestValidNames = async (env, service, authorization) => {
  const { name, endpoint, entry, condition, fields } = service;

  const baseUrl = process.env[`${env.toUpperCase()}_ENVIRONMENT`];
  const url = `${baseUrl}${endpoint}`;

  try {
    let hasPassed = true;
    const invalid_names = {};
    const hebRegex = RegexTest.find((obj) => obj.lang === "he").regex;

    for (const test of RegexTest) {
      const { lang, regex } = test;
      const gtfsObject = await Gtfs(url, lang, authorization);
      if (!gtfsObject) return;
      const testNames = gtfsObject.data[entry];

      for (const name of testNames) {
        const fieldsObject = {};
        if (!regex.test(name[condition])) {
          if (!hebRegex.test(name[condition])) {
            !invalid_names[lang] && (invalid_names[lang] = []);
            fields.forEach((Field) => {
              fieldsObject[Field] = name[Field];
            });
            hasPassed = false;
            invalid_names[lang].push(fieldsObject);
          }
        }
      }
      // !invalid_names[lang] && (invalid_names[lang] = "Passed QA");
    }

    return { hasPassed, name, invalid_names };
  } catch (error) {
    const num = error.message.split(`\n`).length;
    console.error(
      Colors.FgRed,
      `${error.stack.split("\n")[num]}
    ${error.message}`,
      Colors.Reset
    );
  }
};

export default TestValidNames;
