import fs from "fs";

const WriteResults = (environment, service, invalid_names) => {
  // The structure of the error file
  const result = {
    environment: `${environment}`,
    [service]: invalid_names,
  };

  // Check if the directory exists
  const directoryPath = `./response/${service}`;
  try {
    if (!fs.existsSync(directoryPath))
      fs.mkdirSync(directoryPath, { recursive: true });

    fs.writeFileSync(
      `${directoryPath}/${environment}.json`,
      JSON.stringify(result)
    );
    console.log("file written successfully", directoryPath);
  } catch (err) {
    console.log(err);
  }
};

export default WriteResults;
