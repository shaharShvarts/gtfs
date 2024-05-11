import "dotenv/config";
import Colors from "../utils/colors.js";
import GetHelp from "../utils/getHelp.js";

const GetParams = (params) => {
  try {
    if (params.find((val) => val == "-h" || val == "--help")) {
      return console.log(Colors.FgCyan, GetHelp, Colors.Reset);
    }

    const environment = params
      .find((val) => val.startsWith("--env="))
      ?.split("=")[1];
    if (!environment) {
      throw new Error(`
        The environment the command should run under ('dev' | 'stg' | 'prod')`);
    }

    const serviceName = params
      .find((val) => val.startsWith("--service="))
      ?.split("=")[1];

    const auth = params.find((val) => val.startsWith("--auth"))?.split("=")[1];
    const authorization =
      auth || process.env[`${environment.toUpperCase()}_AUTHORIZATION`];

    if (!authorization)
      throw new Error(`
        The authorization is not present or has not been provided for environment named '${environment}'.
        Hint:
        To provide the authorization number, 
        you need to add a field to the command in the following format:
        e.g. node [js file] --env=dev --auth=xxxxx. 
        Please replace 'xxxxx' with your unique authorization number.
        `);

    return [environment.toLowerCase(), authorization, serviceName];
  } catch (error) {
    return console.error(Colors.FgBrightRed, error.message);
  }
};

export default GetParams;
