import fs from "fs";

const WriteResults = (environment, serviceName, invalid_names) => {
  // The structure of the error file
  const result = {
    environment: `${environment}`,
    [serviceName]: invalid_names,
  };

  // Check if the directory exists
  const directoryPath = `./response/${serviceName}`;
  try {
    if (!fs.existsSync(directoryPath))
      fs.mkdirSync(directoryPath, { recursive: true });

    fs.writeFileSync(
      `${directoryPath}/${environment}.json`,
      JSON.stringify(result, null, 2)
    );
    console.log("file written successfully", directoryPath);
  } catch (error) {
    console.log(error);
  }
};

export default WriteResults;
