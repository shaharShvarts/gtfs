import { services } from "../src/getServices.js";

const serviceList = services.map(
  (service, i) => `${i} - ${service.serviceName}`
).join(`
    `);

const GetHelp = `
    Description:
    Testing of translations of cities according to the selected environment ('dev' | 'stg' | 'prod').

    Usage:
    node [js file] --env=[environment] [options]
    e.g ->> node gtfs --env=dev --auth=85eb848ac888070bdb50a666ac518157755898a

    Options:
    -h, --help        Display help for the given command.
    [--auth]          Force to use specific authorization.
    --env[mandatory]  The environment the command should run under ('dev' | 'stg' | 'prod').
    --service         Let you to run specific service(GtfsBot will not post)
    
    Please choose a service from the list below
    ${serviceList}

`;

export default GetHelp;
