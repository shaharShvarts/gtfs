const Help = (file) => {
  const info = `
            Description:
            Testing of translations of cities according to the selected environment ('dev' | 'stg' | 'prod').
    
            Usage:
            node ${file} --env=[environment] [options]
            e.g ->> node ${file} --env=dev --auth=85eb848ac888070bdb50a6f27ac518157755898a
    
            Options:
            -h, --help        Display help for the given command.
            [--auth]          Force to use specific authorization.
            --env[mandatory]  The environment the command should run under ('dev' | 'stg' | 'prod').
        `;
  return info;
};

export default Help;
