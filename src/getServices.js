const GetServices = (baseEnvironment) => {
  const services = [
    {
      serviceName: "train_stations",
      endpoint: `${baseEnvironment}/api_gateway/station_service/train_stations/me`,
      entry: "train_stations",
      condition: "stop_name",
      fields: ["stop_code", "stop_id", "stop_lon", "stop_lat", "stop_name"],
    },
    {
      serviceName: "suburban_cities",
      endpoint: `${baseEnvironment}/profiles/suburbanResidentCities`,
      entry: "suburbanResidentCities",
      condition: "name_trans",
      fields: ["id", "name", "name_trans"],
    },
  ];
  return services;
};

export default GetServices;
