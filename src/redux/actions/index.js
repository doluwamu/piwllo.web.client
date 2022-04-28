import axios from "axios";

const userDetails = JSON.parse(localStorage.getItem("userDetails")) || "";
const baseURL = "https://piwllo-server.herokuapp.com";

export const piwlloUserPostAndPutInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userDetails.token}`,
  },
});

export const piwlloUserGetAndDeleteInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${userDetails.token}`,
  },
});

export const piwlloAuthInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
