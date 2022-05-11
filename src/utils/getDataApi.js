import axios from "axios";
class GetDataApi {
  async getData(url) {
    try {
      const res = await axios.get(url);

      return res.data;
    } catch (error) {
      return false;
    }
  }
}

export const getDataApi = new GetDataApi();
