import Colors from "../utils/colors.js";

const services = [
  {
    serviceName: "train_stations",
    endpoint: `/api_gateway/station_service/train_stations/me`,
    entry: "train_stations",
    condition: "stop_name",
    fields: ["stop_code", "stop_id", "stop_lon", "stop_lat", "stop_name"],
  },
  {
    serviceName: "suburban_cities",
    endpoint: `/profiles/suburbanResidentCities`,
    entry: "suburbanResidentCities",
    condition: "name_trans",
    fields: ["id", "name", "name_trans"],
  },
];

const GetServices = (serviceName) => {
  if (serviceName) {
    const service = services[serviceName];
    if (!service) {
      console.error(
        Colors.FgCyan,
        `Service not found - please pass -h or --help for more information.`,
        Colors.Reset
      );
      return false;
    }
    return [service];
  }
  return services;
};

export { services };
export default GetServices;
