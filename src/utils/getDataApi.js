import axios from "axios";

class GetDataApi {
  async getData(url) {
    try {
      const res = await axios.get(url);

      return res.data;
    } catch (error) {
      console.log("Could not fetch.", error.message);
      return false;
    }
  }
}

export const getDataApi = new GetDataApi();
