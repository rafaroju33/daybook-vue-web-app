import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-demoprojects-default-rtdb.firebaseio.com",
});

export default journalApi;
