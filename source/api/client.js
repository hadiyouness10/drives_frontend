import axios from "axios";

export default axios.create({
  baseURL: "https://student-drives-backend.herokuapp.com",
});

// export default axios.create({
//   baseURL: "http://172.20.10.7:3737",
// });
