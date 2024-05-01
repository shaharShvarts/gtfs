const GetParams = (params) => {
  try {
    const env = params.find((val) => val.startsWith("--env="))?.split("=")[1];
    if (!env) {
      throw new Error(
        "The environment the command should run under ('dev' | 'stg' | 'prod')"
      );
    }

    let baseUrl;
    switch (env) {
      case "dev":
        baseUrl = "https://api-test1.hopon.co/mot";
        break;
      case "stg":
        baseUrl = "https://papi73-staging.hopon.co/mot";
        break;
      case "prod":
        baseUrl = "https://api-prod.hopon.co/mot";
        break;
      default:
        throw new Error(`
          No environment named '${env}' was found
          Please choose from the list ('dev' | 'stg' | 'prod')
          For help please pass the arguments -h or --help
        `);
    }

    const auth = params.find((val) => val.startsWith("--auth"))?.split("=")[1];
    const authorization =
      auth || process.env[`${env.toUpperCase()}_AUTHORIZATION`];

    if (!authorization)
      throw new Error(`
        The authorization is not present or has not been provided.
        Hint:
        To provide the authorization number, 
        you need to add a field to the command in the following format:
        e.g. node [js file] --env=dev --auth=xxxxx. 
        Please replace 'xxxxx' with your unique authorization number.
        `);

    return [baseUrl, env.toLowerCase(), authorization];
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export default GetParams;
