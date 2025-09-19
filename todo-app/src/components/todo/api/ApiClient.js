import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "http://todosapis-env.eba-anmesz9j.us-east-1.elasticbeanstalk.com/",
});
