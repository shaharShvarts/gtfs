import fs from "fs";
import Colors from "../utils/colors.js";

const WriteResults = (dirPath, fullPath, env, name, invalid_names) => {
  // The structure of the error file
  const result = {
    environment: `${env}`,
    [name]: invalid_names,
  };

  try {
    // Check if the directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(fullPath, JSON.stringify(result, null, 2));
    console.log("The file has been successfully written to", fullPath);
  } catch (error) {
    const num = error.message.split(`\n`).length;
    console.error(
      Colors.FgMagenta,
      `${error.stack.split("\n")[num]}
    ${error.message}`,
      Colors.Reset
    );
  }
};

export default WriteResults;
