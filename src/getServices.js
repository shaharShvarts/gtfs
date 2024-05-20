import Colors from "../utils/colors.js";
import Services from "../utils/services.js";

const GetServices = (serviceName) => {
  try {
    if (serviceName) {
      const service = Services.filter(({}, i) => i == serviceName);

      if (!service.length)
        throw new Error(`
          Service not found - please pass -h or --help for more information.`);
      return service;
    }

    return Services;
  } catch (error) {
    const num = error.message.split(`\n`).length;
    return console.error(
      Colors.FgBrightRed,
      `${error.stack.split("\n")[num]}
      ${error.message}`,
      Colors.Reset
    );
  }
};

export { Services };
export default GetServices;
