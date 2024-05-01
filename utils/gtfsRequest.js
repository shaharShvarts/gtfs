import axios from "axios";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const Gtfs = async (endpoint, language, authorization) => {
  const options = {
    method: "GET",
    url: endpoint,
    headers: {
      Accept: "application/json",
      "accept-language": language,
      "Content-Type": "application/txt;charset=UTF-8",
      authorization: `Token ${authorization}`,
    },
    httpsAgent,
  };

  try {
    const { data: gtfs } = await axios.request(options);

    return gtfs;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export default Gtfs;
