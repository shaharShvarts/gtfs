import axios from "axios";

const Gtfs = async (url, language) => {
  const options = {
    method: "GET",
    url,
    headers: {
      authorization: "Token 85eb848ac702070bdb50a6f27ac518157755898a",
      "accept-language": language,
    },
  };

  try {
    const { data: gtfs } = await axios.request(options);

    return gtfs;
  } catch (error) {
    console.log(error);
  }
};

export default Gtfs;
