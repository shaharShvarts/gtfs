import fs from "fs";
const WriteResults = (directoryPath, env, invalid_names) => {
  // Check if the directory exists
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  const result = {
    environment: `${env}`,
    suburbanResidentCities: invalid_names,
  };

  fs.writeFile(
    `${directoryPath}/${env}.json`,
    JSON.stringify(result),
    (err) => {
      if (err) throw err;
      console.log("Data written to file");
    }
  );
  console.log(JSON.stringify(result));
};

export default WriteResults;
