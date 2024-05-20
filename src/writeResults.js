import fs from "fs";
import Colors from "../utils/colors.js";

const WriteResults = (env, name, invalid_names) => {
  const fileType = "json";
  const dirPath = `./response`;

  const fileName = `${env}-${name}.${fileType}`;
  const filePath = `${dirPath}/${fileName}`;

  try {
    // Check if the directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // The structure of the error file
    const structure = {
      environment: `${env}`,
      [name]: invalid_names,
    };

    fs.writeFileSync(filePath, JSON.stringify(structure, null, 2));
    console.log("The file has been successfully written to", filePath);
    return filePath;
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
