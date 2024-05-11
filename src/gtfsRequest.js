import axios from "axios";
import Colors from "../utils/colors.js";

const Gtfs = async (url, language, authorization) => {
  const options = {
    method: "GET",
    url,
    headers: {
      Accept: "application/json",
      "accept-language": language,
      "Content-Type": "application/txt;charset=UTF-8",
      authorization: `Token ${authorization}`,
    },
  };

  try {
    const { data: gtfs } = await axios.request(options);

    return gtfs;
  } catch (error) {
    console.log(Colors.FgMagenta, error.message, Colors.Reset);
    return false;
  }
};

export default Gtfs;
