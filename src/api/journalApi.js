import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-demoprojects-default-rtdb.firebaseio.com",
});

// console.log(process.env.NODE_ENV); //TEST durante testing,
export default journalApi;
