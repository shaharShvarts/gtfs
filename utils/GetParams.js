const GetParams = (params) => {
  let info;
  if (params.find((val) => val == "-h" || val == "--help")) {
    info = `
        Description:
        Testing of translations of cities according to the selected environment ('dev' | 'stg' | 'prod').

        Usage:
        node suburbanResidentCities --env=[environment] [options]
        e.g ->> node suburbanResidentCities --env=dev --auth=85eb848ac702070bdb50a6f27ac518157755898a

        Options:
        -h, --help        Display help for the given command.
        [--auth]          Force to use specific authorization.
        --env[mandatory]  The environment the command should run under ('dev' | 'stg' | 'prod').
    `;
    return [info];
  }

  const auth = params.find((val) => val.startsWith("--auth"))?.split("=")[1];
  const env = params.find((val) => val.startsWith("--env="))?.split("=")[1];

  // If the argument(--env) is not provided
  if (!env) {
    info =
      "The environment the command should run under ('dev' | 'stg' | 'prod')";
    return [info];
  }

  const undefinedEnvironment = `
        No environment named '${env}' was found
        Please choose from the list ('dev' | 'stg' | 'prod')
        For help please pass the arguments -h or --help
  `;

  const baseUrl =
    process.env[`${env.toUpperCase()}_BASE_URL`] || undefinedEnvironment;
  const authorization =
    auth || process.env[`${env.toUpperCase()}_AUTHORIZATION`];
  return [baseUrl, env.toLowerCase(), authorization];
};

export default GetParams;
