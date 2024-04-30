import fs from "fs";
const WriteResults = (directoryPath, env, result) => {
  // Check if the directory exists
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

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
