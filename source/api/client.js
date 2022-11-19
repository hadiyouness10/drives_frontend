import axios from "axios";

export default axios.create({
  baseURL: "https://student-drives-backend.herokuapp.com",
});

// export default axios.create({
//   baseURL: "http://192.168.1.7:3737",
// });
