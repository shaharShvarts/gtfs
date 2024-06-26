import "dotenv/config";
import Colors from "../utils/colors.js";
import Help from "../utils/help.js";

const GetParams = (params) => {
  try {
    if (params.find((val) => val == "-h" || val == "--help")) {
      return console.log(Colors.FgCyan, Help, Colors.Reset);
    }

    const env = params
      .find((val) => val.startsWith("--env="))
      ?.split("=")[1]
      .toLowerCase();
    if (!env) {
      throw new Error(`
        The environment the command should run under ('dev' | 'stg' | 'prod')`);
    }

    const serviceName = params
      .find((val) => val.startsWith("--service="))
      ?.split("=")[1];

    const auth = params.find((val) => val.startsWith("--auth"))?.split("=")[1];
    const authorization =
      auth || process.env[`${env.toUpperCase()}_AUTHORIZATION`];

    if (!authorization)
      throw new Error(`
        The authorization is not present or has not been provided for environment named '${env}'.
        To provide the authorization number, 
        you need to add a field to the command in the following format:
        e.g. node [js file] --env=dev [--auth=xxxxx] [--service=n]. 
        Please replace 'xxxxx' with your unique authorization number.
        `);

    return [env, authorization, serviceName];
  } catch (error) {
    const num = error.message.split(`\n`).length;
    return console.error(
      Colors.FgMagenta,
      `${error.stack.split("\n")[num]}
       ${error.message}`,
      Colors.Reset
    );
  }
};

export default GetParams;
