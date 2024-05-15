const Services = [
  {
    name: "train_stations",
    endpoint: `/api_gateway/station_service/train_stations/me`,
    entry: "train_stations",
    condition: "stop_name",
    fields: ["stop_code", "stop_id", "stop_lon", "stop_lat", "stop_name"],
  },
  {
    name: "suburban_cities",
    endpoint: `/profiles/suburbanResidentCities`,
    entry: "suburbanResidentCities",
    condition: "name_trans",
    fields: ["id", "name", "name_trans"],
  },
];

export default Services;
